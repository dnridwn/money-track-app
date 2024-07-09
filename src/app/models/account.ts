export const TYPE_ACCOUNT = "account";
export const TYPE_DEBT = "debt";

export interface Account {
    id: number|null,
    name: string|null,
    description: string|null,
    type: string|null,
    balance: number,
    balance_formatted: string
}
