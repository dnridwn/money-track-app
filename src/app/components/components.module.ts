import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DateRangeFilterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    DateRangeFilterComponent
  ]
})
export class ComponentsModule { }
