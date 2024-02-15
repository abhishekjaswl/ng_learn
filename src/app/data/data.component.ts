import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data } from '../interfaces/data';
import { Globals, MultiFilterEmitType } from '../globals/global';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit {
  public datas: Data[] = [];
  protected displayData: Data[] = [];
  public isLoading: boolean = true;
  public genders: { value: string; display: string }[] = [];

  constructor(private dataService: DataService, private global: Globals) {}

  // get data for table components
  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (value) => {
        this.datas = value;
        this.displayData = value;
        const uniqueGendersSet = new Set(value.map((x) => x.gender));
        this.genders = Array.from(uniqueGendersSet).map((gender) => ({
          value: gender,
          display: gender,
        }));
        this.isLoading = false;
      },
      error: () => {
        this.global.error = 'Data not found!';
        this.isLoading = false;
      },
    });
  }

  onFilterChange($event: MultiFilterEmitType) {
    if (!$event) {
      this.displayData = this.datas;
    } else {
      let filteredData = this.datas;
      const keys = Object.keys($event);

      // search filter
      filteredData = filteredData.filter((data) => {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const filterValue = $event[key];

          if (
            filterValue &&
            filterValue.filter.search &&
            filterValue.filter.search.length > 0
          ) {
            if (
              !filterValue.filter.search
                .toLowerCase()
                .includes(
                  String(data[key.toLowerCase() as keyof Data]).toLowerCase()
                )
            ) {
              return false;
            }
          }
        }
        return true;
      });

      // checkbox filter
      filteredData = filteredData.filter((data) => {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const filterValue = $event[key];

          if (
            filterValue &&
            filterValue.filter!.checks &&
            filterValue.filter!.checks.length > 0
          ) {
            if (
              !filterValue.filter!.checks.includes(
                String(data[key.toLowerCase() as keyof Data])
              )
            ) {
              return false;
            }
          }
        }
        return true;
      });

      // sorting
      filteredData = filteredData.sort((a, b) => {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const filterValue = $event[key];

          if (filterValue.filter!.sort) {
            const sortOrder = filterValue.filter!.sort === 'ascending' ? 1 : -1;

            if (
              a[key.toLowerCase() as keyof Data] <
              b[key.toLowerCase() as keyof Data]
            ) {
              return -1 * sortOrder;
            }

            if (
              a[key.toLowerCase() as keyof Data] >
              b[key.toLowerCase() as keyof Data]
            ) {
              return 1 * sortOrder;
            }
          }
        }
        return 0;
      });

      this.displayData = filteredData;
    }
  }
}
