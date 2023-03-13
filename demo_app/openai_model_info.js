let openai_pricing_map = {
    "text": {
        "models": [
            {
                "name": "gpt-3.5-turbo",
                "description": "Optimized for dialogue",
                "price": 0.002
            },
            {
                "name": "Ada",
                "description": "Optimized to follow single-turn instructions, fastest",
                "price": 0.0004,
                "fine_tuning_prices": {
                    "usage": 0.0016,
                    "training": 0.0004
                }
            },
            {
                "name": "Babbage",
                "description": "Optimized to follow single-turn instructions",
                "price": 0.0005,
                "fine_tuning_prices": {
                    "usage": 0.0024,
                    "training": 0.0006
                }
            },
            {
                "name": "Curie",
                "description": "Optimized to follow single-turn instructions",
                "price": 0.002,
                "fine_tuning_prices": {
                    "usage": 0.012,
                    "training": 0.003
                }
            },
            {
                "name": "Davinci",
                "description": "Optimized to follow single-turn instructions, most powerful",
                "price": 0.02,
                "fine_tuning_prices": {
                    "usage": 0.12,
                    "training": 0.03
                }
            }
        ]
    },
    "image": {
        "models": [
            {
                "name": "DALL-E",
                "description": "Generates and edits novel images and art",
                "prices": {
                    "1024x1024": 0.02,
                    "512x512": 0.018,
                    "256x256": 0.016
                }
            }
        ]
    },
    "audio": {
        "models": [
            {
                "name": "Whisper",
                "description": "Transcribes speech into text and translates many languages into English",
                "price": 0.006
            }
        ]
    }
}

let model_endpoint_compatibility = {
    "gpt-3.5-turbo": {
        "endpoints": ["/v1/chat/completions", "/v1/chat/completions"]
    },
    "gpt-3.5-turbo-0301": {
        "endpoints": ["/v1/chat/completions"]
    },
    "text-davinci-003": {
        "endpoints": ["/v1/completions"]
    },
    "text-davinci-002": {
        "endpoints": ["/v1/completions"]
    },
    "text-davinci-edit-001": {
        "endpoints": ["/v1/edits"]
    },
    "code-davinci-edit-001": {
        "endpoints": ["/v1/edits"]
    },
    "whisper-1": {
        "endpoints": ["/v1/audio/transcriptions", "/v1/audio/translations"]
    },
    "text-curie-001": {
        "endpoints": ["/v1/completions"]
    },
    "text-babbage-001": {
        "endpoints": ["/v1/completions"]
    },
    "text-ada-001": {
        "endpoints": ["/v1/completions"]
    },
    "davinci": {
        "endpoints": ["/v1/completions", "/v1/fine-tunes"]
    },
    "curie": {
        "endpoints": ["/v1/completions", "/v1/fine-tunes"]
    },
    "babbage": {
        "endpoints": ["/v1/completions", "/v1/fine-tunes"]
    },
    "ada": {
        "endpoints": ["/v1/completions", "/v1/fine-tunes"]
    },
    "text-embedding-ada-002": {
        "endpoints": ["/v1/embeddings"]
    },
    "text-search-ada-doc-001": {
        "endpoints": ["/v1/embeddings"]
    },
    "text-moderation-stable": {
        "endpoints": ["/v1/moderations"]
    },
    "text-moderation-latest": {
        "endpoints": ["/v1/moderations"]
    }
}

let model_info = [
    {
        name: "gpt-3.5-turbo",
        endpoints: ["/v1/chat/completions", "/v1/chat/completions"],
        price: 0.002,
        description: "Optimized for dialogue"
    },
    {
        name: "Ada",
        endpoints: ["/v1/completions", "/v1/fine-tunes"],
        price: 0.0004,
        fineTuningPrices: {
            usage: 0.0016,
            training: 0.0004
        },
        description: "Optimized to follow single-turn instructions, fastest"
    },
    {
        name: "Babbage",
        endpoints: ["/v1/completions", "/v1/fine-tunes"],
        price: 0.0005,
        fineTuningPrices: {
            usage: 0.0024,
            training: 0.0006
        },
        description: "Optimized to follow single-turn instructions"
    },
    {
        name: "Curie",
        endpoints: ["/v1/completions", "/v1/fine-tunes"],
        price: 0.002,
        fineTuningPrices: {
            usage: 0.012,
            training: 0.003
        },
        description: "Optimized to follow single-turn instructions"
    },
    {
        name: "Davinci",
        endpoints: ["/v1/completions", "/v1/fine-tunes"],
        price: 0.02,
        fineTuningPrices: {
            usage: 0.12,
            training: 0.03
        },
        description: "Optimized to follow single-turn instructions, most powerful"
    },
    {
        name: "DALL-E",
        endpoints: ["/v1/images/generations"],
        prices: {
            "1024x1024": 0.02,
            "512x512": 0.018,
            "256x256": 0.016
        },
        description: "Generates and edits novel images and art"
    },
    {
        name: "Whisper",
        endpoints: ["/v1/audio/transcriptions", "/v1/audio/translations"],
        price: 0.006,
        description: "Transcribes speech into text and translates many languages into English"
    },
    {
        name: "text-embedding-ada-002",
        endpoints: ["/v1/embeddings"],
        price: null,
        description: null
    },
    {
        name: "text-search-ada-doc-001",
        endpoints: ["/v1/embeddings"],
        price: null,
        description: null
    },
    {
        name: "text-moderation-stable",
        endpoints: ["/v1/moderations"],
        price: null,
        description: null
    },
    {
        name: "text-moderation-latest",
        endpoints: ["/v1/moderations"],
        price: null,
        description: null
    }
];

let models = [
    {
        "id": "babbage",
        "object": "model",
        "created": 1649358449,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-49FUp5v084tBB49tC4z8LPH5",
                "object": "model_permission",
                "created": 1669085501,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "babbage",
        "parent": null
    },
    {
        "id": "davinci",
        "object": "model",
        "created": 1649359874,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-U6ZwlyAd0LyMk4rcMdz33Yc3",
                "object": "model_permission",
                "created": 1669066355,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci",
        "parent": null
    },
    {
        "id": "babbage-code-search-code",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-4qRnA3Hj8HIJbgo0cGbcmErn",
                "object": "model_permission",
                "created": 1669085863,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "babbage-code-search-code",
        "parent": null
    },
    {
        "id": "text-similarity-babbage-001",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-48kcCHhfzvnfY84OtJf5m8Cz",
                "object": "model_permission",
                "created": 1669081947,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-similarity-babbage-001",
        "parent": null
    },
    {
        "id": "text-davinci-001",
        "object": "model",
        "created": 1649364042,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-MVM5NfoRjXkDve3uQW3YZDDt",
                "object": "model_permission",
                "created": 1669066355,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-davinci-001",
        "parent": null
    },
    {
        "id": "ada",
        "object": "model",
        "created": 1649357491,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-u0nKN4ub7EVQudgMuvCuvDjc",
                "object": "model_permission",
                "created": 1675997661,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "ada",
        "parent": null
    },
    {
        "id": "curie-instruct-beta",
        "object": "model",
        "created": 1649364042,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-JlSyMbxXeFm42SDjN0wTD26Y",
                "object": "model_permission",
                "created": 1669070162,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "curie-instruct-beta",
        "parent": null
    },
    {
        "id": "babbage-code-search-text",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-Lftf8H4ZPDxNxVs0hHPJBUoe",
                "object": "model_permission",
                "created": 1669085863,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "babbage-code-search-text",
        "parent": null
    },
    {
        "id": "babbage-similarity",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-mS20lnPqhebTaFPrcCufyg7m",
                "object": "model_permission",
                "created": 1669081947,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "babbage-similarity",
        "parent": null
    },
    {
        "id": "code-search-babbage-text-001",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-EC5ASz4NLChtEV1Cwkmrwm57",
                "object": "model_permission",
                "created": 1669085863,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "code-search-babbage-text-001",
        "parent": null
    },
    {
        "id": "text-embedding-ada-002",
        "object": "model",
        "created": 1671217299,
        "owned_by": "openai-internal",
        "permission": [
            {
                "id": "modelperm-ThMneEHcUgdBaIucwREqRj2a",
                "object": "model_permission",
                "created": 1677075687,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-embedding-ada-002",
        "parent": null
    },
    {
        "id": "code-cushman-001",
        "object": "model",
        "created": 1656081837,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-M6pwNXr8UmY3mqdUEe4VFXdY",
                "object": "model_permission",
                "created": 1669066355,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "code-cushman-001",
        "parent": null
    },
    {
        "id": "whisper-1",
        "object": "model",
        "created": 1677532384,
        "owned_by": "openai-internal",
        "permission": [
            {
                "id": "modelperm-MX888R5RhewPTR12HguE4hM2",
                "object": "model_permission",
                "created": 1677691932,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "whisper-1",
        "parent": null
    },
    {
        "id": "code-search-babbage-code-001",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-64LWHdlANgak2rHzc3K5Stt0",
                "object": "model_permission",
                "created": 1669085864,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "code-search-babbage-code-001",
        "parent": null
    },
    {
        "id": "gpt-3.5-turbo",
        "object": "model",
        "created": 1677610602,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-Dr5YlcVrmPHV6ljpZhGHIVs7",
                "object": "model_permission",
                "created": 1678492572,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "gpt-3.5-turbo",
        "parent": null
    },
    {
        "id": "text-ada-001",
        "object": "model",
        "created": 1649364042,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-KN5dRBCEW4az6gwcGXkRkMwK",
                "object": "model_permission",
                "created": 1669088497,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-ada-001",
        "parent": null
    },
    {
        "id": "text-similarity-ada-001",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-DdCqkqmORpqxqdg4TkFRAgmw",
                "object": "model_permission",
                "created": 1669092759,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-similarity-ada-001",
        "parent": null
    },
    {
        "id": "text-davinci-insert-002",
        "object": "model",
        "created": 1649880484,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-V5YQoSyiapAf4km5wisXkNXh",
                "object": "model_permission",
                "created": 1669066354,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-davinci-insert-002",
        "parent": null
    },
    {
        "id": "gpt-3.5-turbo-0301",
        "object": "model",
        "created": 1677649963,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-laQi8qVWWowJwTtnwEIKQEiS",
                "object": "model_permission",
                "created": 1678492573,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "gpt-3.5-turbo-0301",
        "parent": null
    },
    {
        "id": "ada-code-search-code",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-wa8tg4Pi9QQNaWdjMTM8dkkx",
                "object": "model_permission",
                "created": 1669087421,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "ada-code-search-code",
        "parent": null
    },
    {
        "id": "ada-similarity",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-LtSIwCEReeDcvGTmM13gv6Fg",
                "object": "model_permission",
                "created": 1669092759,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "ada-similarity",
        "parent": null
    },
    {
        "id": "text-davinci-003",
        "object": "model",
        "created": 1669599635,
        "owned_by": "openai-internal",
        "permission": [
            {
                "id": "modelperm-11XYRd8qhdjcS0OA4fkco19K",
                "object": "model_permission",
                "created": 1678585020,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-davinci-003",
        "parent": null
    },
    {
        "id": "code-search-ada-text-001",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-JBssaJSmbgvJfTkX71y71k2J",
                "object": "model_permission",
                "created": 1669087421,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "code-search-ada-text-001",
        "parent": null
    },
    {
        "id": "text-search-ada-query-001",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-1YiiBMYC8it0mpQCBK7t8uSP",
                "object": "model_permission",
                "created": 1669092640,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-ada-query-001",
        "parent": null
    },
    {
        "id": "text-curie-001",
        "object": "model",
        "created": 1649364043,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-fGAoEKBH01KNZ3zz81Sro34Q",
                "object": "model_permission",
                "created": 1669066352,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-curie-001",
        "parent": null
    },
    {
        "id": "text-davinci-edit-001",
        "object": "model",
        "created": 1649809179,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-VzNMGrIRm3HxhEl64gkjZdEh",
                "object": "model_permission",
                "created": 1669066354,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-davinci-edit-001",
        "parent": null
    },
    {
        "id": "davinci-search-document",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-M43LVJQRGxz6ode34ctLrCaG",
                "object": "model_permission",
                "created": 1669066355,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci-search-document",
        "parent": null
    },
    {
        "id": "ada-code-search-text",
        "object": "model",
        "created": 1651172510,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-kFc17wOI4d1FjZEaCqnk4Frg",
                "object": "model_permission",
                "created": 1669087421,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "ada-code-search-text",
        "parent": null
    },
    {
        "id": "text-search-ada-doc-001",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-kbHvYouDlkD78ehcmMOGdKpK",
                "object": "model_permission",
                "created": 1669092640,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-ada-doc-001",
        "parent": null
    },
    {
        "id": "code-davinci-edit-001",
        "object": "model",
        "created": 1649880484,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-WwansDxcKNvZtKugNqJnsvfv",
                "object": "model_permission",
                "created": 1669066354,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "code-davinci-edit-001",
        "parent": null
    },
    {
        "id": "davinci-instruct-beta",
        "object": "model",
        "created": 1649364042,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-k9kuMYlfd9nvFiJV2ug0NWws",
                "object": "model_permission",
                "created": 1669066356,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci-instruct-beta",
        "parent": null
    },
    {
        "id": "text-similarity-curie-001",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-6dgTTyXrZE7d53Licw4hYkvd",
                "object": "model_permission",
                "created": 1669079883,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-similarity-curie-001",
        "parent": null
    },
    {
        "id": "code-search-ada-code-001",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-8soch45iiGvux5Fg1ORjdC4s",
                "object": "model_permission",
                "created": 1669087421,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "code-search-ada-code-001",
        "parent": null
    },
    {
        "id": "ada-search-query",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-b753xmIzAUkluQ1L20eDZLtQ",
                "object": "model_permission",
                "created": 1669092640,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "ada-search-query",
        "parent": null
    },
    {
        "id": "text-search-davinci-query-001",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-9McKbsEYSaDshU9M3bp6ejUb",
                "object": "model_permission",
                "created": 1669066353,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-davinci-query-001",
        "parent": null
    },
    {
        "id": "curie-search-query",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-sIbfSwzVpVBtymQgOQSLBpxe",
                "object": "model_permission",
                "created": 1677273417,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "curie-search-query",
        "parent": null
    },
    {
        "id": "davinci-search-query",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-lYkiTZMmJMWm8jvkPx2duyHE",
                "object": "model_permission",
                "created": 1669066353,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci-search-query",
        "parent": null
    },
    {
        "id": "text-davinci-insert-001",
        "object": "model",
        "created": 1649880484,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-3gRQMBOMoccZIURE3ZxboZWA",
                "object": "model_permission",
                "created": 1669066354,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-davinci-insert-001",
        "parent": null
    },
    {
        "id": "babbage-search-document",
        "object": "model",
        "created": 1651172510,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-5qFV9kxCRGKIXpBEP75chmp7",
                "object": "model_permission",
                "created": 1669084981,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "babbage-search-document",
        "parent": null
    },
    {
        "id": "ada-search-document",
        "object": "model",
        "created": 1651172507,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-8qUMuMAbo4EwedbGamV7e9hq",
                "object": "model_permission",
                "created": 1669092640,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "ada-search-document",
        "parent": null
    },
    {
        "id": "text-search-curie-query-001",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-Iion0NCpsXPNtIkQ0owQLi7V",
                "object": "model_permission",
                "created": 1677273417,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-curie-query-001",
        "parent": null
    },
    {
        "id": "text-search-babbage-doc-001",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-ao2r26P2Th7nhRFleHwy2gn5",
                "object": "model_permission",
                "created": 1669084981,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-babbage-doc-001",
        "parent": null
    },
    {
        "id": "text-davinci-002",
        "object": "model",
        "created": 1649880484,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-kOLsgLs7IgI9PTPI245IRWZH",
                "object": "model_permission",
                "created": 1676585871,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-davinci-002",
        "parent": null
    },
    {
        "id": "curie-search-document",
        "object": "model",
        "created": 1651172508,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-LDsN5wW8eKVuh1OsyciHntE9",
                "object": "model_permission",
                "created": 1677273417,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "curie-search-document",
        "parent": null
    },
    {
        "id": "text-search-curie-doc-001",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-taUGRSku7bQLa24SNIwYPEsi",
                "object": "model_permission",
                "created": 1677273417,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-curie-doc-001",
        "parent": null
    },
    {
        "id": "babbage-search-query",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-wSs1hMXDKsrcErlbN8HmzlLE",
                "object": "model_permission",
                "created": 1669084981,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "babbage-search-query",
        "parent": null
    },
    {
        "id": "text-babbage-001",
        "object": "model",
        "created": 1649364043,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-a3Ph5FIBbJxsoA4wvx7VYC7R",
                "object": "model_permission",
                "created": 1675105935,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-babbage-001",
        "parent": null
    },
    {
        "id": "text-search-davinci-doc-001",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-qhSf1j2MJMujcu3t7cHnF1DN",
                "object": "model_permission",
                "created": 1669066353,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-davinci-doc-001",
        "parent": null
    },
    {
        "id": "code-davinci-002",
        "object": "model",
        "created": 1649880485,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-ogYakNKyxbnYCbKVLlCQce8J",
                "object": "model_permission",
                "created": 1678262649,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "code-davinci-002",
        "parent": null
    },
    {
        "id": "text-search-babbage-query-001",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-Kg70kkFxD93QQqsVe4Zw8vjc",
                "object": "model_permission",
                "created": 1669084981,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-search-babbage-query-001",
        "parent": null
    },
    {
        "id": "curie-similarity",
        "object": "model",
        "created": 1651172510,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-zhWKExSloaQiJgzjVHFmh2wR",
                "object": "model_permission",
                "created": 1675106290,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "curie-similarity",
        "parent": null
    },
    {
        "id": "curie",
        "object": "model",
        "created": 1649359874,
        "owned_by": "openai",
        "permission": [
            {
                "id": "modelperm-oPaljeveTjEIDbhDjzFiyf4V",
                "object": "model_permission",
                "created": 1675106503,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "curie",
        "parent": null
    },
    {
        "id": "text-similarity-davinci-001",
        "object": "model",
        "created": 1651172505,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-OvmcfYoq5V9SF9xTYw1Oz6Ue",
                "object": "model_permission",
                "created": 1669066356,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-similarity-davinci-001",
        "parent": null
    },
    {
        "id": "davinci-similarity",
        "object": "model",
        "created": 1651172509,
        "owned_by": "openai-dev",
        "permission": [
            {
                "id": "modelperm-lYYgng3LM0Y97HvB5CDc8no2",
                "object": "model_permission",
                "created": 1669066353,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": true,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci-similarity",
        "parent": null
    },
    {
        "id": "cushman:2020-05-03",
        "object": "model",
        "created": 1590625110,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-FAup8P1KqclNlTsunLDRiesT",
                "object": "model_permission",
                "created": 1590625111,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": true,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "cushman:2020-05-03",
        "parent": null
    },
    {
        "id": "ada:2020-05-03",
        "object": "model",
        "created": 1607631625,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-9TYofAqUs54vytKYL0IX91rX",
                "object": "model_permission",
                "created": 1607631626,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "ada:2020-05-03",
        "parent": null
    },
    {
        "id": "babbage:2020-05-03",
        "object": "model",
        "created": 1607632611,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-jaLAcmyyNuaVmalCE1BGTGwf",
                "object": "model_permission",
                "created": 1607632613,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "babbage:2020-05-03",
        "parent": null
    },
    {
        "id": "curie:2020-05-03",
        "object": "model",
        "created": 1607632725,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-bt6R8PWbB2SwK5evFo0ZxSs4",
                "object": "model_permission",
                "created": 1607632727,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "curie:2020-05-03",
        "parent": null
    },
    {
        "id": "davinci:2020-05-03",
        "object": "model",
        "created": 1607640163,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-99cbfQTYDVeLkTYndX3UMpSr",
                "object": "model_permission",
                "created": 1607640164,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci:2020-05-03",
        "parent": null
    },
    {
        "id": "if-davinci-v2",
        "object": "model",
        "created": 1610745990,
        "owned_by": "openai",
        "permission": [
            {
                "id": "snapperm-58q0TdK2K4kMgL3MoHvGWMlH",
                "object": "model_permission",
                "created": 1610746036,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "if-davinci-v2",
        "parent": null
    },
    {
        "id": "if-curie-v2",
        "object": "model",
        "created": 1610745968,
        "owned_by": "openai",
        "permission": [
            {
                "id": "snapperm-fwAseHVq6NGe6Ple6tKfzRSK",
                "object": "model_permission",
                "created": 1610746043,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "if-curie-v2",
        "parent": null
    },
    {
        "id": "if-davinci:3.0.0",
        "object": "model",
        "created": 1629420755,
        "owned_by": "openai",
        "permission": [
            {
                "id": "snapperm-T53lssiyMWwiuJwhyO9ic53z",
                "object": "model_permission",
                "created": 1629421809,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": true,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "if-davinci:3.0.0",
        "parent": null
    },
    {
        "id": "davinci-if:3.0.0",
        "object": "model",
        "created": 1629498070,
        "owned_by": "openai",
        "permission": [
            {
                "id": "snapperm-s6ZIAVMwlZwrLGGClTXqSK3Q",
                "object": "model_permission",
                "created": 1629498084,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": true,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci-if:3.0.0",
        "parent": null
    },
    {
        "id": "davinci-instruct-beta:2.0.0",
        "object": "model",
        "created": 1629501914,
        "owned_by": "openai",
        "permission": [
            {
                "id": "snapperm-c70U4TBfiOD839xptP5pJzyc",
                "object": "model_permission",
                "created": 1629501939,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": true,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "davinci-instruct-beta:2.0.0",
        "parent": null
    },
    {
        "id": "text-ada:001",
        "object": "model",
        "created": 1641949608,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-d2PSnwFG1Yn9of6PvrrhkBcU",
                "object": "model_permission",
                "created": 1641949610,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-ada:001",
        "parent": null
    },
    {
        "id": "text-davinci:001",
        "object": "model",
        "created": 1641943966,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-Fj1O3zkKXOQy6AkcfQXRKcWA",
                "object": "model_permission",
                "created": 1641944340,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-davinci:001",
        "parent": null
    },
    {
        "id": "text-curie:001",
        "object": "model",
        "created": 1641955047,
        "owned_by": "system",
        "permission": [
            {
                "id": "snapperm-BI9TAT6SCj43JRsUb9CYadsz",
                "object": "model_permission",
                "created": 1641955123,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-curie:001",
        "parent": null
    },
    {
        "id": "text-babbage:001",
        "object": "model",
        "created": 1642018370,
        "owned_by": "openai",
        "permission": [
            {
                "id": "snapperm-7oP3WFr9x7qf5xb3eZrVABAH",
                "object": "model_permission",
                "created": 1642018480,
                "allow_create_engine": false,
                "allow_sampling": true,
                "allow_logprobs": true,
                "allow_search_indices": false,
                "allow_view": true,
                "allow_fine_tuning": false,
                "organization": "*",
                "group": null,
                "is_blocking": false
            }
        ],
        "root": "text-babbage:001",
        "parent": null
    }
]

class Model {

    /**
     * This interface abstracts the common model configuration between requests
     * This allows us to define a model and use it for chats, completions, or edits
     * by simply passing the model profile in with the additional parameters needed for the
     * request to be constructed and executed.
     *
     * type AiiaTextModelProfile = {
     * @param {string} params.model - The AI model to use for the API request.
     * @param {number} [params.temperature=1] - Controls the "creativity" of the API response by setting the sampling temperature. Defaults to 1.
     * @param {number} [params.top_p=1] - Controls the "diversity" of the API response by setting the probability mass to consider for each token. Defaults to 1.
     * @param {Record<string, number>} [params.logit_bias] - Modifies the relative probability of different outputs.
     * @param {number} [params.n=1] - The number of responses to generate. Defaults to 1.
     * @param {string} [params.user] - Identifies the user making the API request.
     * @param {number} [params.frequency_penalty=0] - Controls the penalty for generating words that appear frequently in the prompt. Defaults to 0.
     * @param {number} [params.presence_penalty=0] - Controls the penalty for generating words that do not appear in the prompt. Defaults to 0.
     * @param {number} [params.max_tokens=Infinity] - Limits the maximum number of tokens in the API response. Defaults to Infinity.
     * @param {boolean} [params.stream=false] - Generates the API response in chunks as they become available. Defaults to false.
     * @param {string[] | string | null} [params.stop=null] - Stops generating the API response when certain conditions are met. Defaults to null.
     *
     */
    constructor(params) {
        if (!params) {
            throw new Error("AIIA:MODEL: You must specify model params.");
        }

        if (typeof params === "string") {
            params = { // if params is a single string assume its the models name/id
                model: params
            }
        }


        if (!params.name && !params.model && !params.id) {
            throw new Error("AIIA:MODEL: You must specify a model name.");
        } else {
            if (params.model.name) {
                params.model = params.name;
            } else if (params.id) {
                params.model = params.id
            }
        }


        if (typeof params.temperature !== "undefined" && (params.temperature < 0 || params.temperature > 1)) {
            throw new Error("AIIA:MODEL: Temperature must be between 0 and 1.");
        }

        if (typeof params.top_p !== "undefined" && (params.top_p < 0 || params.top_p > 1)) {
            throw new Error("AIIA:MODEL: Top p must be between 0 and 1.");
        }

        if (typeof params.n !== "undefined" && params.n < 1) {
            throw new Error("AIIA:MODEL: N must be at least 1.");
        }

        if (typeof params.max_tokens !== "undefined" && params.max_tokens < 1) {
            throw new Error("AIIA:MODEL: Max tokens must be at least 1.");
        }

        if (typeof params.logit_bias !== "undefined") {
            for (const key in params.logit_bias) {
                if (params.logit_bias[key] < -100 || params.logit_bias[key] > 100) {
                    throw new Error("AIIA:MODEL: Logit bias must be between -100 and 100.");
                }
            }
        }

        this.model = params.model || "davinchi"
        this.name = this.getNiceName();
        this.temperature = params.temperature || 1;
        this.top_p = params.top_p || 1;
        this.n = params.n || 1;
        this.user = params.user || null;
        this.logit_bias = params.logit_bias || null;
        this.frequency_penalty = params.frequency_penalty || 0;
        this.presence_penalty = params.presence_penalty || 0;
        this.max_tokens = params.max_tokens || Infinity;
        this.stream = params.stream || false;
        this.stop = params.stop || null;
    }

    /**
     * Returns the model's name.
     */
    getName() {
        return this.model;
    }

    getNiceName() {
        return this.model
            .split('-') // split the model name by hyphens
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize the first letter of each word
            .join(' '); // join the words back together with spaces
    }

    /**
     * Returns the model's configuration as an object.
     */
    getConfig(forAction) {
        return {
            model: this.model,
            temperature: this.temperature,
            top_p: this.top_p,
            n: this.n,
            user: this.user,
            logit_bias: this.logit_bias,
            frequency_penalty: this.frequency_penalty,
            presence_penalty: this.presence_penalty,
            max_tokens: this.max_tokens,
            stream: this.stream,
            stop: this.stop,
        };
    }

    /**
     * Sets the model's name.
     */
    setName(name) {
        this.model = name;
    }

}


module.exports = {Model, openai_pricing_map,model_endpoint_compatibility,model_info, models}