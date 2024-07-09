import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs';
import { Category, TYPE_EXPENSE, TYPE_INCOME } from 'src/app/models/category';
import { CategoryService } from 'src/app/repositories/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  SEGMENT = {
    INCOME: "income",
    EXPENSE: "expense"
  };
  activeSegment: string = this.SEGMENT.INCOME;
  isCreateCategoryModalOpen: boolean = false;
  isEditCategoryModalOpen: boolean = false;
  isCreatingCategory: boolean = false;
  isEditingCategory: boolean = false;
  isDeletingCategory: boolean = false;
  incomeCategories: Category[][] = [];
  expenseCategories: Category[][] = [];
  activeCategory: Category = {} as Category;
  keyword: string = "";

  constructor(
    private categoryService: CategoryService,
    private toastCtrl: ToastController
  ) { }

  openCreateCategoryModal() {
    this.activeCategory = {} as Category;
    this.isCreateCategoryModalOpen = true;
  }

  closeCreateCategoryModal() {
    this.activeCategory = {} as Category;
    this.isCreateCategoryModalOpen = false;
  }

  openEditCategoryModal(category: Category) {
    this.activeCategory = category;
    this.isEditCategoryModalOpen = true;
  }

  closeEditCategoryModal() {
    this.activeCategory = {} as Category;
    this.isEditCategoryModalOpen = false;
  }

  fetchCategories(type: string, keyword: string = "") {
    this.categoryService.fetchAll({ type, keyword })
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe((categories: Category[]) => {
        if (type === TYPE_INCOME) {
          this.incomeCategories = this.chunkCategories(categories, 2);
        } else if (type === TYPE_EXPENSE) {
          this.expenseCategories = this.chunkCategories(categories, 2);
        }
      });
  }

  createCategory(category: Category) {
    this.isCreatingCategory = true;
    this.categoryService.create(category)
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe((_: Category) => {
        this.isCreatingCategory = false;
        this.closeCreateCategoryModal();
        this.fetchCategories(TYPE_INCOME);
        this.fetchCategories(TYPE_EXPENSE);
      });
  }

  editCategory(category: Category) {
    this.isEditingCategory = true;
    this.categoryService.update(category)
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe((_: Category) => {
        this.isEditingCategory = false;
        this.closeEditCategoryModal();
        this.fetchCategories(TYPE_INCOME);
        this.fetchCategories(TYPE_EXPENSE);
      });
  }

  deleteCategory(category: Category) {
    this.isDeletingCategory = true;
    this.categoryService.delete(category)
      .pipe(
        catchError(async (error: any) => {
          (await this.toastCtrl.create({ color: "danger", duration: 3000, message: error?.error?.message || "Something went wrong. Please try again later!" })).present();
          throw new Error(error);
        })
      )
      .subscribe(_ => {
        this.isDeletingCategory = false;
        this.closeEditCategoryModal();
        this.fetchCategories(TYPE_INCOME);
        this.fetchCategories(TYPE_EXPENSE);
      });
  }

  search() {
    this.fetchCategories(TYPE_INCOME, this.keyword);
    this.fetchCategories(TYPE_EXPENSE, this.keyword);
  }

  chunkCategories(categories: Category[], size: number): Category[][] {
    let results: Category[][] = [];
    for (let i = 0; i < categories.length; i += size) {
      results.push(categories.slice(i, i + size));
    }
    return results;
  }

  ngOnInit() {
    this.fetchCategories(TYPE_INCOME);
    this.fetchCategories(TYPE_EXPENSE);
  }

}
