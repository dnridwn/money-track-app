import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
      },
      {
        path: 'operation',
        loadChildren: () => import('./operation/operation.module').then( m => m.OperationPageModule)
      },
      {
        path: 'statistic',
        loadChildren: () => import('./statistic/statistic.module').then( m => m.StatisticPageModule)
      },
      {
        path: '',
        redirectTo: '/home/account',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
