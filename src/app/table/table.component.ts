import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FilterEmitType, MultiFilterEmitType } from '../globals/global';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() datas!: any;
  @Input() isLoading!: boolean;
  @Input() genders!: { value: string; display: string }[];
  columns = ['Name', 'Email', 'Phone', 'Address', 'DOB', 'Gender'];
  currentColumn!: string;

  filterObject: MultiFilterEmitType = {};

  onFilter($event: FilterEmitType): void {
    this.filterObject[$event.column] = $event;
    this.appliedFilters.emit(this.filterObject);
  }

  @Output()
  appliedFilters: EventEmitter<MultiFilterEmitType> =
    new EventEmitter<MultiFilterEmitType>();
}
