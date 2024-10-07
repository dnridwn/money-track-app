import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.scss'],
})
export class DateRangeFilterComponent  implements OnInit {

  DATE_RANGE_FILTER: string = 'DateRangeFilter'
  ALL_TIME_FILTER: string = 'AllTime'
  DATE_FILTER: string = 'Date'
  WEEK_FILTER: string = 'Week'
  TODAY_FILTER: string = 'Today'
  MONTH_FILTER: string = 'Month'
  YEAR_FILTER: string = 'Year'

  filterText: string = 'Sepanjang Waktu'
  activeFilter: string = this.ALL_TIME_FILTER
  dates: moment.Moment[] = []
  dateRangeDates: string[] = [
    moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    moment().format('YYYY-MM-DDTHH:mm:ssZ')
  ]
  isModalOpen: boolean = false
  isDatePickerModalOpen: boolean = false
  isDateRangePickerModalOpen: boolean = false

  @Output() filterChanged = new EventEmitter<string[]>()

  constructor() { }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
  }

  openDatePickerModal() {
    this.isDatePickerModalOpen = true
  }

  closeDatePickerModal() {
    this.isDatePickerModalOpen = false
  }

  openDateRangePickerModal() {
    this.isDateRangePickerModalOpen = true
  }

  closeDateRangePickerModal() {
    this.isDateRangePickerModalOpen = false
  }

  confirmDatePicker(value: any) {
    this.closeDatePickerModal()
    setTimeout(() => {
      this.chooseFilter(this.DATE_FILTER, moment(value))
    }, 200)
  }

  confirmDateRangePicker() {
    this.closeDateRangePickerModal()
    setTimeout(() => {
      this.chooseFilter(this.DATE_RANGE_FILTER, moment(this.dateRangeDates[0]), moment(this.dateRangeDates[1]))
    }, 200)
  }

  previousPeriod() {
    switch (this.activeFilter) {
      case this.DATE_RANGE_FILTER:
        const diff = this.dates[1].diff(this.dates[0], 'days') + 1
        this.dates[0] = this.dates[0].subtract(diff, 'days')
        this.dates[1] = this.dates[1].subtract(diff, 'days')
        this.filterText = this.dates[0].format('DD MMMM YYYY') + ' - ' + this.dates[1].format('DD MMMM YYYY')
        break
      case this.ALL_TIME_FILTER:
        break
      case this.DATE_FILTER:
        this.dates[0] = this.dates[0].subtract(1, 'days')
        this.filterText = this.dates[0].format('DD MMMM YYYY')
        break
      case this.WEEK_FILTER:
        this.dates[0] = this.dates[0].subtract(1, 'week')
        this.dates[1] = this.dates[1].subtract(1, 'week')
        this.filterText = this.dates[0].format('DD MMMM YYYY') + ' - ' + this.dates[1].format('DD MMMM YYYY')
        break
      case this.TODAY_FILTER:
        this.dates[0] = this.dates[0].subtract(1, 'days')
        this.filterText = this.dates[0].format('DD MMMM YYYY')
        break
      case this.MONTH_FILTER:
        this.dates[0] = this.dates[0].subtract(1, 'month')
        this.dates[1] = this.dates[1].subtract(1, 'month')
        this.filterText = this.dates[0].format('MMMM YYYY')
        break
      case this.YEAR_FILTER:
        this.dates[0] = this.dates[0].subtract(1, 'year')
        this.dates[1] = this.dates[1].subtract(1, 'year')
        this.filterText = this.dates[0].format('YYYY')
        break
    }

    this.filterChanged.emit([
      this.dates?.[0]?.format('YYYY-MM-DD') || '',
      this.dates?.[1]?.format('YYYY-MM-DD') || ''
    ])
  }

  nextPeriod() {
    switch (this.activeFilter) {
      case this.DATE_RANGE_FILTER:
        const diff = this.dates[1].diff(this.dates[0], 'days') + 1
        this.dates[0] = this.dates[0].add(diff, 'days')
        this.dates[1] = this.dates[1].add(diff, 'days')
        this.filterText = this.dates[0].format('DD MMMM YYYY') + ' - ' + this.dates[1].format('DD MMMM YYYY')
        break
      case this.ALL_TIME_FILTER:
        break
      case this.DATE_FILTER:
        this.dates[0] = this.dates[0].add(1, 'days')
        this.filterText = this.dates[0].format('DD MMMM YYYY')
        break
      case this.WEEK_FILTER:
        this.dates[0] = this.dates[0].add(1, 'week')
        this.dates[1] = this.dates[1].add(1, 'week')
        this.filterText = this.dates[0].format('DD MMMM YYYY') + ' - ' + this.dates[1].format('DD MMMM YYYY')
        break
      case this.TODAY_FILTER:
        this.dates[0] = this.dates[0].add(1, 'days')
        this.filterText = this.dates[0].format('DD MMMM YYYY')
        break
      case this.MONTH_FILTER:
        this.dates[0] = this.dates[0].add(1, 'month')
        this.dates[1] = this.dates[1].add(1, 'month')
        this.filterText = this.dates[0].format('MMMM YYYY')
        break
      case this.YEAR_FILTER:
        this.dates[0] = this.dates[0].add(1, 'year')
        this.dates[1] = this.dates[1].add(1, 'year')
        this.filterText = this.dates[0].format('YYYY')
        break
    }

    this.filterChanged.emit([
      this.dates?.[0]?.format('YYYY-MM-DD') || '',
      this.dates?.[1]?.format('YYYY-MM-DD') || ''
    ])
  }

  chooseFilter(filter: string, ...dates: moment.Moment[]) {
    switch (filter) {
      case this.DATE_RANGE_FILTER:
        this.dates = [dates[0], dates[1]]
        this.filterText = dates[0].format('DD MMMM YYYY') + ' - ' + dates[1].format('DD MMMM YYYY')
        break
      case this.ALL_TIME_FILTER:
        this.filterText = 'Sepanjang Waktu'
        this.dates = []
        break
      case this.DATE_FILTER:
        this.dates = [dates[0]]
        this.filterText = dates[0].format('DD MMMM YYYY')
        break
      case this.WEEK_FILTER:
        const startWeek = moment().startOf('week')
        const endWeek = moment().endOf('week')
        this.dates = [startWeek, endWeek]
        this.filterText = startWeek.format('DD MMMM YYYY') + ' - ' + endWeek.format('DD MMMM YYYY')
        break
      case this.TODAY_FILTER:
        const today = moment()
        this.filterText = today.format('DD MMMM YYYY')
        this.dates = [today, today]
        break
      case this.MONTH_FILTER:
        const startMonth = moment().startOf('month')
        const endMonth = moment().endOf('month')
        this.dates = [startMonth, endMonth]
        this.filterText = startMonth.format('MMMM YYYY')
        break
      case this.YEAR_FILTER:
        const startYear = moment().startOf('year')
        const endYear = moment().endOf('year')
        this.dates = [startYear, endYear]
        this.filterText = startYear.format('YYYY')
        break
    }
    
    this.activeFilter = filter
    this.filterChanged.emit([
      this.dates?.[0]?.format('YYYY-MM-DD') || '',
      this.dates?.[1]?.format('YYYY-MM-DD') || ''
    ])
    this.closeModal()
  }

  ngOnInit() {
    this.filterChanged.emit([
      this.dates?.[0]?.format('YYYY-MM-DD') || '',
      this.dates?.[1]?.format('YYYY-MM-DD') || ''
    ])
  }

}
