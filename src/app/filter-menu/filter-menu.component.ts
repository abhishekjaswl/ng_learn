import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FilterEmitType } from '../globals/global';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css',
})
export class FilterMenuComponent implements OnInit {
  @Input() column!: string;
  @Input() genders!: { value: string; display: string }[];
  selectedGenders: string[] = [];
  sortType!: string;
  protected form!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Your existing code to set up the form and subscribe to value changes
    const controls = this.genders.map((x) => ({
      control: new FormControl(false),
      name: x.value,
    }));

    let group: any = {};
    controls.forEach((x) => {
      group[x.name] = x.control;
    });

    this.form = this._formBuilder.group(group);

    this.form.valueChanges.subscribe({
      next: (formValues) => {
        this.selectedGenders = Object.keys(formValues).filter(
          (key) => formValues[key]
        );
        this.applyFilter({
          column: this.column,
          filter: { sort: this.sortType, checks: this.selectedGenders },
        });
      },
    });
  }

  openFilterMenu(filterTrigger: MatMenuTrigger): void {
    filterTrigger.openMenu();
  }

  applyFilter({ column, filter }: FilterEmitType): void {
    this.sortType = filter?.sort;
    this.appliedFilters.emit({
      column: column,
      filter: {
        sort: filter.sort,
        checks: filter.checks,
      },
    });
  }

  @Output()
  appliedFilters: EventEmitter<FilterEmitType> =
    new EventEmitter<FilterEmitType>();
}
