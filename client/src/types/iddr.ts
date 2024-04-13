//components.ts
declare global {
    export interface Window {
        daum: any;
    }
}
export interface IAddr {
    address: string;
    zonecode: string;
}
//