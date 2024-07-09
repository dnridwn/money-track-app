export const TYPE_INCOME = "income";
export const TYPE_EXPENSE = "expense";

export interface Category {
    id: number|null,
    name: string|null,
    description: string|null,
    type: string|null
}
