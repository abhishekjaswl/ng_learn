import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data } from '../interfaces/data';
import { MultiFilterEmitType } from '../globals/global';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit {
  public datas: Data[] = [];
  protected displayData: Data[] = [];
  public isLoading: boolean = true;
  public genders: { value: string; display: string }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (value) => {
        this.isLoading = false;
        this.datas = value;
        this.displayData = value;
        this.genders.push(
          ...value.map((x) => ({
            value: x.gender,
            display: x.gender,
          }))
        );
        console.log(this.genders);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onFilterChange($event: MultiFilterEmitType) {
    if (!$event) {
      this.displayData = this.datas;
    } else {
      let filteredData = [...this.datas];

      const keys = Object.keys($event);

      filteredData = filteredData.filter((data) => {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const filterValue = $event[key];

          if (
            filterValue &&
            filterValue.filter!.checks &&
            filterValue.filter!.checks.length > 0
          ) {
            // Check if the data matches any of the keywords in the checks array
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
