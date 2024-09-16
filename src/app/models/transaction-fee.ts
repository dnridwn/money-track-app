export const TYPE_COMMISSION = 'Commission';
export const TYPE_TAX = 'Tax';

export const OPERATION_TYPE_INDUCT = 'Induct';
export const OPERATION_TYPE_DEDUCT = 'Deduct';

export const FORMAT_PERCENT = 'Percent';
export const FORMAT_AMOUNT = 'Amount';

export interface TransactionFee {
    id: number|null,
    transaction_id: number|null,
    type: string|null,
    operation: string|null,
    format: string|null,
    amount: number|null
}
