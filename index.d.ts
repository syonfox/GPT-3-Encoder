/**
 * Module for encoding and decoding text using byte pair encoding (BPE).
 *
 * @module gptoken
 * @property {Function} encode - Function for encoding text using BPE.
 * @property {Function} decode - Function for decoding text using BPE.
 * @property {Function} countTokens - Function for counting the number of tokens in a BPE encoding.
 * @property {Function} tokenStats - Function for computing statistics on the tokens in a BPE encoding.
 * @property {Object} util - Utility functions used by the main functions.
 * @property {Function} util.ord - Function for getting the Unicode code point of a character.
 * @property {Function} util.chr - Function for getting the character corresponding to a Unicode code point.
 * @property {number} util.bpe - Implements the Byte Pair Encoding (BPE) algorithm for subword tokenization.
 * @property {Function} util.range - Function for generating a range of numbers.
 * @property {RegExp} util.pat - Regular expression for matching token words in text.
 * @property {Function} util.get_pairs - Function for getting all pairs of adjacent characters in a string.
 * @property {function} encodeStr - Encodes a string as an array of UTF-8 byte values.
 * @property {function} decodeStr - Decodes an array of UTF-8 byte values as a string.
 * @property {Object} maps - Objects containing various maps used by the BPE algorithm.
 * @property {Object.<string, number>} maps.encoder - Object mapping characters to their BPE encodings.
 * @property {Object.<number, string>} maps.decoder - Object mapping BPE encodings to their characters.
 * @property {Object.<number, string>} maps.byte_decoder - Object mapping byte values to their Unicode characters.
 * @property {Object.<string, number>} maps.byte_encoder - Object mapping Unicode characters to their byte values.
 * @property {Object.<string, number>} maps.bpe_ranks - Object mapping BPE tokens to their ranks.
 * @property {Map} maps.cache - Map for caching BPE encodings.
 */
declare module "gptoken" {
    export function encode(text: string): number[];

    export function decode(tokens: number[]): string;

    export function countTokens(text: string): number;

    export function tokenStats(input: string | number[]): TokenStats;

    export interface TokenStats {
        count: number;
        unique: number;
        frequency: Record<string, number>;
        positions: Record<string, number[]>;
        tokens: string[];
    }

    export interface BpeOptions {
        isDict?: boolean;
        vocab?: Record<string, number>;
        merges?: Record<string, string>;
        separator?: string;
    }

    export interface Utils {
        ord: (char: string) => number;
        chr: (code: number) => string;
        bpe: (codes: number[], options?: BpeOptions) => number[];
        range: (start: number, end: number, step?: number) => number[];
        pat: RegExp;
        get_pairs: (word: string) => string[];
        encodeStr: (str: string) => number[];
        decodeStr: (arr: number[]) => string;
    }

    export const util: Utils;

    export const maps: {
        encoder: Record<string, number>;
        decoder: Record<number, string>;
        byte_decoder: Record<number, string>;
        byte_encoder: Record<string, number>;
        bpe_ranks: Record<string, number>;
        cache: Map<string, number[]>;
    };
    //
    // export interface extras {
    //     streamOne: "function"
    // }

    // export const extras: require("./extras/index.js")
    // export const extras:
}