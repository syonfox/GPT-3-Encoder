using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Web;

namespace AI.Dev.OpenAI.GPT
{
    /*
        def p50k_base():
            mergeable_ranks = load_tiktoken_bpe(
                "https://openaipublic.blob.core.windows.net/encodings/p50k_base.tiktoken"
            )
            return {
                "name": "p50k_base",
                "explicit_n_vocab": 50281,
//                 const pat = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu

                "pat_str": r"""'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+""",
                "mergeable_ranks": mergeable_ranks,
                "special_tokens": {"<|endoftext|>": 50256},
            }
    */
    public static class p50kTokenizer
    {
        // cache is just to speed things up - it keeps tokens that have been found previously
        private static ConcurrentDictionary<string, string> BPE_CACHE = new ConcurrentDictionary<string, string>();

        // Hold the dictionary - read from the file
        private static Dictionary<string, int> Encoder = new Dictionary<string, int>();

        //// --------------------------------------------------------------------
        //// Holds a cache of byte to unicode mappings
        //// --------------------------------------------------------------------
        private static Dictionary<int, char> BYTES_TO_UNICODE_CACHE;

        private static int Ord(string x) => char.ConvertToUtf32(x, 0);

        private static Dictionary<int, char> BytesToUnicode()
        {
            // Note: Its been done already - so dont do it again
            if (BYTES_TO_UNICODE_CACHE != null) return BYTES_TO_UNICODE_CACHE;

            List<int> bytes = Enumerable.Range(Ord("!"), Ord("~") + 1 - Ord("!"))
                .Concat(Enumerable.Range(Ord("¡"), Ord("¬") + 1 - Ord("¡")))
                .Concat(Enumerable.Range(Ord("®"), Ord("ÿ") + 1 - Ord("®")))
                .ToList();

            List<char> chars = (from x in bytes select (char)x).ToList();

            int n = 0;
            for (int b = 0; b < 256; b++)
            {
                if (bytes.Contains(b)) continue;
                bytes.Add(b);
                chars.Add((char)(256 + n++));
            }

            BYTES_TO_UNICODE_CACHE = bytes
                .Zip(chars, (k, v) => new { k, v })
                .ToDictionary(x => x.k, x => x.v);

            return BYTES_TO_UNICODE_CACHE;
        }

        // --------------------------------------------------------------------
        // Cache build end
        // --------------------------------------------------------------------

        private static void BuildDictionary()
        {
            // already loaded
            if (Encoder.Count > 0) return;

            // Setup a cache that hold a byte/unicode match list
            Dictionary<int, char> byteEncoder = BytesToUnicode();

            string text = File.ReadAllText(HttpRuntime.AppDomainAppPath + "App_Data\\p50k_base.tiktoken", Encoding.UTF8);
            string[] lines = text.Replace("\r", "").Split('\n');

            foreach (string line in lines)
            {
                string[] bits = line.Split(' ');
                if (bits.Length == 2)
                {
                    byte[] bytelist = Convert.FromBase64String(bits[0]);
                    Encoder.Add(new string(bytelist.Select(x => byteEncoder[x]).ToArray()), int.Parse(bits[1]));
                }
            }

            Encoder.Add("<|endoftext|>", 50256);

            if (Encoder.Count == 0) throw new NullReferenceException("p50kSettings deserialization returned NULL");
        }


        public static List<int> Encode(string text)
        {
            // nothing to do here
            if (string.IsNullOrEmpty(text)) return new List<int>();

            BuildDictionary();

            // Setup a cache that hold a byte/unicode match list
            Dictionary<int, char> byteEncoder = BytesToUnicode();

            // Break text down into words
            string pat = @"'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+";
            MatchCollection matches = Regex.Matches(text, pat);

            List<int> bpeTokens = new List<int>();

            List<string> combined = new List<string>();
            for(int i=0;i<matches.Count;i++)
            {
                string thisvalue = matches[i].Value;
                if (thisvalue == "<|" && i < matches.Count - 2 && matches[i + 2].Value == "|>")
                {
                    combined.Add(matches[i].Value + matches[i + 1].Value + matches[i + 2].Value);
                    i = i + 2;
                }
                else
                {
                    combined.Add(matches[i].Value);
                }
            }

            // work through each word
            foreach (string match in combined)
            {
                // convert utf8 string bytes into unicode string
                string token = new string(Encoding.UTF8.GetBytes(match).Select(x => byteEncoder[x]).ToArray());

                if (token.StartsWith("<|") && token.EndsWith("|>") && Encoder.ContainsKey(token))
                {
                    bpeTokens.Add(Encoder[token]);
                }
                else
                {

                    List<string> newTokensS = BytePairEncoding(token).Split(' ').ToList();
                    List<int> newTokens = newTokensS.Select(x => Encoder[x]).ToList();
                    bpeTokens.AddRange(newTokens);
                }
            }

            return bpeTokens;
        }

        public static List<int> Encode(StringBuilder stringBuilder)
        {
            return stringBuilder == null ? new List<int>() : Encode(stringBuilder.ToString());
        }

        public static List<int> Encode(char[] chars)
        {
            return chars == null ? new List<int>() : Encode(new string(chars));
        }

        public static List<int> Encode(IEnumerable<char> chars)
        {
            return chars == null ? new List<int>() : Encode(chars.ToArray());
        }


        private static string BytePairEncoding(string token)  // bpe
        {
            if (BPE_CACHE.ContainsKey(token)) return BPE_CACHE[token];

            List<string> word = (from x in token.ToList() select x.ToString()).ToList();
            List<Tuple<string, string>> pairs = GetPairs(word);
            if (pairs.Count == 0)
            {
                BPE_CACHE.TryAdd(token, token);
                return token;
            }

            while (true)
            {
                var minPairs = new SortedDictionary<long, Tuple<string, string>>();
                foreach (Tuple<string, string> pair in pairs)
                {
                    if (Encoder.ContainsKey(pair.Item1 + pair.Item2))
                    {
                        int rank = Encoder[pair.Item1 + pair.Item2];
                        minPairs[rank] = pair;
                    }
                    else
                    {
                        minPairs[100000000000] = pair;
                    }
                }

                Tuple<string, string> biGram = minPairs[minPairs.Keys.Min()];
                if (!Encoder.ContainsKey(biGram.Item1 + biGram.Item2)) break;

                string first = biGram.Item1;
                string second = biGram.Item2;

                var newWord = new List<string>();
                int i = 0;

                while (i < word.Count)
                {
                    int j = word.IndexOf(first, i);

                    if (j == -1)
                    {
                        var slice = new ArraySegment<string>((from x in word select x.ToString()).ToArray(), i, word.Count - i);
                        newWord.AddRange(slice);
                        break;
                    }

                    var slice2 = new ArraySegment<string>((from x in word select x.ToString()).ToArray(), i, j - i);
                    newWord.AddRange(slice2);
                    i = j;

                    if (word[i] == first && i < (word.Count - 1) && word[i + 1] == second)
                    {
                        newWord.Add($"{first}{second}");
                        i += 2;
                    }
                    else
                    {
                        newWord.Add(word[i]);
                        i += 1;
                    }
                }

                word = newWord;
                if (word.Count == 1) break;
                pairs = GetPairs(word);
            }

            string result = string.Join(" ", word);
            BPE_CACHE.TryAdd(token, result);
            return result;
        }

        /// <summary>
        /// Return set of symbol pairs in a word.
        /// </summary>
        private static List<Tuple<string, string>> GetPairs(List<string> word)
        {
            var result = new List<Tuple<string, string>>();

            string prevChar = word[0];
            for (int i = 1; i < word.Count; i++)
            {
                string currentChar = word[i];
                result.Add(new Tuple<string, string>(prevChar, currentChar));
                prevChar = currentChar;
            }

            return result;
        }

    }
}