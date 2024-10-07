import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperationPageRoutingModule } from './operation-routing.module';

import { OperationPage } from './operation.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OperationPage]
})
export class OperationPageModule {}
