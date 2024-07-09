import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Category, TYPE_EXPENSE, TYPE_INCOME } from 'src/app/models/category';
import { Transaction } from 'src/app/models/transaction';
import { AccountService } from 'src/app/repositories/account/account.service';
import { CategoryService } from 'src/app/repositories/category/category.service';
import { TransactionService } from 'src/app/repositories/transaction/transaction.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {

  SEGMENT = {
    INCOME: 'income',
    EXPENSE: 'expense',
    TRANSFER: 'transfer'
  };
  activeSegment: string = this.SEGMENT.INCOME;
  isCreateOperationModalOpen: boolean = false;
  isCreateOperationDetailModalOpen: boolean = false;
  transactions: Transaction[] = [];
  accounts: Account[][] = [];
  incomeCategories: Category[][] = [];
  expenseCategories: Category[][] = [];

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) { }

  openCreateOperationModal() {
    this.isCreateOperationModalOpen = true;
  }

  closeCreateOperationModal() {
    this.isCreateOperationModalOpen = false;
    this.activeSegment = this.SEGMENT.INCOME;
  }

  openCreateOperationDetailModal() {
    this.closeCreateOperationModal();
    this.isCreateOperationDetailModalOpen = true;
  }

  closeCreateOperationDetailModal() {
    this.isCreateOperationDetailModalOpen = false;
  }

  fetchTransactions() {
    this.transactionService.fetchAll()
      .pipe(
        catchError((error: any) => {
          throw new Error(error);
        })
      )
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }

  fetchAccounts() {
    this.accountService.fetchAll()
      .pipe(
        catchError((error: any) => {
          throw new Error(error);
        })
      )
      .subscribe((accounts: Account[]) => {
        this.accounts = this.chunk(accounts, 2);
      });
  }

  fetchCategories(type: string) {
    this.categoryService.fetchAll({ type })
      .pipe(
        catchError((error: any) => {
          throw new Error(error);
        })
      )
      .subscribe((categories: Category[]) => {
        if (type === TYPE_INCOME) {
          this.incomeCategories = this.chunk(categories, 2);
        } else if (type === TYPE_EXPENSE) {
          this.expenseCategories = this.chunk(categories, 2);
        }
      });
  }

  chunk(items: any[], size: number): any[][] {
    let results: any[][] = [];
    for (let i = 0; i < items.length; i += size) {
      results.push(items.slice(i, i + size));
    }
    return results;
  }

  ngOnInit() {
    this.fetchTransactions();
    this.fetchAccounts();
    this.fetchCategories(TYPE_INCOME);
    this.fetchCategories(TYPE_EXPENSE);
  }

}
