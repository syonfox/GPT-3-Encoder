// declare module "gpt-3-encoder"
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

}
// declare module "@syonfox/gpt-3-encoder" GPToken
//this dosent seem to work :(
// export function extendModule<T e declare module "@syonfox/gpt-3-encoder" GPToken
// xtends Record<string, any>>(moduleName: string, moduleToExtend: T): T {
//     return {
//         ...moduleToExtend,
//         __esModule: true,
//         default: moduleToExtend,
//     } as unknown as T & { default: T };
// }
