export interface OpenAIConfig {
  apiKey: string;
  endpoint?: string;
}

export interface OpenAIRequestConfig extends RequestInit {
  apiKey: string;
  endpoint: string;
}

async function sendRequest(
    path: string,
    method: string,
    body?: Record<string, unknown>,
    config?: Partial<OpenAIRequestConfig>
) {
  config = config || {};
  const apiKey = config.apiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("API key not provided");
  }

  const endpoint = config.endpoint || "https://api.openai.com";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // const url = /^https?:\/\//i.test(path) ? path : `${endpoint}/${path.replace(/^\/*/, "")}`;

  // const endpoint = config.endpoint || "https://api.openai.com";
  const baseUrl = endpoint.replace(/\/$/, "");

  let url: string;
  if (/^https?:\/\//i.test(path)) {
    url = path;
  } else {
    const basePath = path.replace(/^\/*/, "");
    const versionPath = basePath.startsWith("v1") ? "" : "v1/";
    url = `${baseUrl}/${versionPath}${basePath}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...config,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}: ${await response.text()}`);
  }

  return response;
}

export async function openaiRequest(
    path: string,
    method: string,
    body?: Record<string, unknown>,
    config: Partial<OpenAIRequestConfig> = {}
) {
  const response = await sendRequest(path, method, body, config);

  return response.json();
}

export async function openaiStream(
    path: string,
    method: string,
    body?: Record<string, unknown>,
    config: Partial<OpenAIRequestConfig> = {}
) {
  const response = await sendRequest(path, method, body, config);

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let parser: EventSource | null = null;
  let controller: ReadableStreamDefaultController | null = null;
  let counter = 0;

  const stream = new ReadableStream({
    async start(c) {
      parser = new EventSource(response.url);
      controller = c;

      parser.onmessage = (event: MessageEvent) => {
        const data = event.data;

        if (data === "[DONE]") {
          controller?.close();
          parser?.close();
          return;
        }

        const json = JSON.parse(data);
        const content = json.choices[0].text;
        const queue = encoder.encode(content);

        controller?.enqueue(queue);
        counter++;
      };

      parser.onerror = (event: Event) => {
        controller?.error(event);
        parser?.close();
      };
    },
    cancel() {
      parser?.close();
    },
  });

  return { stream, count: counter };
}