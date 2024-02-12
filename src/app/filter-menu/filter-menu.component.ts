import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FilterEmitType } from '../globals/global';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css',
})
export class FilterMenuComponent {
  @Input() currentColumn!: string;
  @Input() genders!: { value: string; display: string }[];
  appliedFiltersList: any = {};

  openFilterMenu(filterTrigger: MatMenuTrigger): void {
    filterTrigger.openMenu();
  }

  clearFilters(column: string): void {
    this.appliedFiltersList.searchTerm = '';
    this.appliedFiltersList.sort = '';
    this.appliedFiltersList.checks = '';
    this.appliedFilters.emit({
      column: column,
      filter: {
        search: '',
        sort: '',
        checks: [],
      },
    });
  }

  searchFilter() {
    this.applyFilter({
      column: this.currentColumn,
      filter: {
        search: this.appliedFiltersList.searchTerm,
        sort: this.appliedFiltersList.sort,
        checks: this.appliedFiltersList.checks,
      },
    });
  }

  genderSelect($event: any): void {
    let selections = $event.source.selectedOptions.selected.map(
      (o: MatListOption) => o.value.value
    );

    this.applyFilter({
      column: this.currentColumn,
      filter: {
        search: this.appliedFiltersList.searchTerm,
        sort: this.appliedFiltersList.sort,
        checks: selections,
      },
    });
  }

  applyFilter({ column, filter }: FilterEmitType): void {
    this.appliedFilters.emit({
      column: column,
      filter: {
        search: filter.search,
        sort: filter.sort,
        checks: filter.checks,
      },
    });
  }

  @Output()
  appliedFilters: EventEmitter<FilterEmitType> =
    new EventEmitter<FilterEmitType>();
}
