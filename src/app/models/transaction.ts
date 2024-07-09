import { Account } from './account';
import { Category } from './category';
import { TransactionFee } from './transaction-fee';

export interface Transaction {
    id: number|null,
    type: string|null,
    account_id: number|null,
    account: Account|null,
    category_id: number|null,
    category: Category|null,
    transfer_to_account_id: number|null,
    transfer_to_account: Account|null,
    date: string|null,
    date_formatted: string|null,
    amount: number|null,
    total_amount: number|null,
    total_amount_formatted: number|null,
    note: string|null,
    fees: TransactionFee[]|null
}
