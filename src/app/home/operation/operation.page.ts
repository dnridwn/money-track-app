import { FORMAT_AMOUNT, FORMAT_PERCENT, OPERATION_TYPE_DEDUCT, OPERATION_TYPE_INDUCT, TYPE_COMMISSION, TYPE_TAX } from './../../models/transaction-fee';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Category, TYPE_EXPENSE, TYPE_INCOME } from 'src/app/models/category';
import { Transaction, TYPE_DEBIT, TYPE_CREDIT, TYPE_TRANSFER } from 'src/app/models/transaction';
import { TransactionFee } from 'src/app/models/transaction-fee';
import { AccountService } from 'src/app/repositories/account/account.service';
import { CategoryService } from 'src/app/repositories/category/category.service';
import { TransactionService } from 'src/app/repositories/transaction/transaction.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {

  TYPE_DEBIT = TYPE_DEBIT;
  TYPE_CREDIT = TYPE_CREDIT;
  TYPE_TRANSFER = TYPE_TRANSFER;

  isCreateOperationModalOpen: boolean = false;
  transactions: Transaction[] = [];
  accounts: Account[] = [];
  incomeCategories: Category[] = [];
  expenseCategories: Category[] = [];

  newTransaction: Transaction = {} as Transaction;
  isCreatingOperation: boolean = false;

  TYPE_COMMISSION = TYPE_COMMISSION;
  TYPE_TAX = TYPE_TAX;
  OPERATION_TYPE_INDUCT = OPERATION_TYPE_INDUCT;
  OPERATION_TYPE_DEDUCT = OPERATION_TYPE_DEDUCT;
  FORMAT_PERCENT = FORMAT_PERCENT;
  FORMAT_AMOUNT = FORMAT_AMOUNT;

  isCreateFeeModalOpen: boolean = false;
  newFee: TransactionFee = {} as TransactionFee;

  constructor(
    private toastCtrl: ToastController,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {
    this.resetToDefaultTransaction();
  }

  openCreateOperationModal() {
    this.isCreateOperationModalOpen = true;
  }

  closeCreateOperationModal() {
    this.isCreateOperationModalOpen = false;
    this.resetToDefaultTransaction();
  }

  openCreateFeeModal() {
    this.isCreateFeeModalOpen = true;
  }

  closeCreateFeeModal() {
    this.isCreateFeeModalOpen = false;
    this.newFee = {} as TransactionFee;
  }

  addFee() {
    this.newTransaction.fees?.push(this.newFee);
    this.closeCreateFeeModal();
  }

  fetchTransactions() {
    this.transactionService.fetchAll()
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
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
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      });
  }

  fetchCategories(type: string) {
    this.categoryService.fetchAll({ type })
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe((categories: Category[]) => {
        if (type === TYPE_INCOME) {
          this.incomeCategories = categories;
        } else if (type === TYPE_EXPENSE) {
          this.expenseCategories = categories;
        }
      });
  }

  createOperation() {
    this.newTransaction.date = moment(this.newTransaction.date).format('YYYY-MM-DD') || null;
    this.transactionService.create(this.newTransaction)
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe((_: Transaction) => {
        this.isCreatingOperation = false;
        this.fetchTransactions();
        this.closeCreateOperationModal();
      });
  }

  resetToDefaultTransaction() {
    this.newTransaction = {} as Transaction;
    this.newTransaction.date = moment().toISOString();
    this.newTransaction.type = TYPE_CREDIT;
    this.newTransaction.fees = [];
  }

  ngOnInit() {
    this.fetchTransactions();
    this.fetchAccounts();
    this.fetchCategories(TYPE_INCOME);
    this.fetchCategories(TYPE_EXPENSE);
  }

}
