import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError, finalize } from 'rxjs';
import { Account, TYPE_ACCOUNT, TYPE_DEBT } from 'src/app/models/account';
import { AccountService } from 'src/app/repositories/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  SEGMENT = {
    ACCOUNT: "account",
    DEBT: "debt"
  };
  activeSegment: string = this.SEGMENT.ACCOUNT;
  isCreateAccountModalOpen: boolean = false;
  isEditAccountModalOpen: boolean = false;
  isCreatingAccount: boolean = false;
  isEditingAccount: boolean = false;
  isDeletingAccount: boolean = false;
  defaultAccounts: Account[] = [];
  debtAccounts: Account[] = [];
  activeAccount: Account = {} as Account;
  keyword: string = "";

  constructor(
    private accountService: AccountService,
    private toastCtrl: ToastController
  ) { }

  openCreateAccountModal() {
    this.activeAccount = {} as Account;
    this.isCreateAccountModalOpen = true;
  }

  closeCreateAccountModal() {
    this.activeAccount = {} as Account;
    this.isCreateAccountModalOpen = false;
  }

  openEditAccountModal(account: Account) {
    this.activeAccount = account;
    this.isEditAccountModalOpen = true;
  }

  closeEditAccountModal() {
    this.activeAccount = {} as Account;
    this.isEditAccountModalOpen = false;
  }

  fetchAccounts(type: string, keyword: string = "") {
    this.accountService.fetchAll({ type, keyword })
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe((accounts: Account[]) => {
        if (type === TYPE_ACCOUNT) {
          this.defaultAccounts = accounts;
        } else if (type === TYPE_DEBT) {
          this.debtAccounts = accounts;
        }
      });
  }

  createAccount(account: Account) {
    this.isCreatingAccount = true;
    this.accountService.create(account)
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        }),
        finalize(() => {
          this.isCreatingAccount = false;
        })
      )
      .subscribe((_: Account) => {
        this.closeCreateAccountModal();
        this.fetchAccounts(TYPE_ACCOUNT);
        this.fetchAccounts(TYPE_DEBT);
      });
  }

  editAccount(account: Account) {
    this.isEditingAccount = true;
    this.accountService.update(account)
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        }),
        finalize(() => {
          this.isEditingAccount = false;
        })
      )
      .subscribe((_: Account) => {
        this.closeEditAccountModal();
        this.fetchAccounts(TYPE_ACCOUNT);
        this.fetchAccounts(TYPE_DEBT);
      });
  }

  deleteAccount(account: Account) {
    this.isDeletingAccount = true;
    this.accountService.delete(account)
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        }),
        finalize(() => {
          this.isDeletingAccount = false;
        })
      )
      .subscribe(_ => {
        this.closeEditAccountModal();
        this.fetchAccounts(TYPE_ACCOUNT);
        this.fetchAccounts(TYPE_DEBT);
      });
  }

  search() {
    this.fetchAccounts(TYPE_ACCOUNT, this.keyword);
    this.fetchAccounts(TYPE_DEBT, this.keyword);
  }

  ngOnInit() {
    this.fetchAccounts(TYPE_ACCOUNT);
    this.fetchAccounts(TYPE_DEBT);
  }

}
