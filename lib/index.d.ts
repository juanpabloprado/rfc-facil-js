declare module "homoclave" {
    export default function calculate(fullName: string): string;
}
declare module "verification-digit" {
    export default function calculate(rfc12Digits: string): string;
}
declare module "tdc-code" {
    export interface NaturalPerson {
        name: string;
        firstLastName: string;
        secondLastName: string;
        day: number;
        month: number;
        year: number;
    }
    export function calculate(person: NaturalPerson): string;
}
declare module "index" {
}
