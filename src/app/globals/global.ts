import { Injectable } from '@angular/core';

@Injectable()
export class Globals {}

export type FilterEmitType = {
  column: string;
  filter: {
    search: string;
    sort: string;
    checks: string[];
  };
};

export type MultiFilterEmitType = { [x: string]: FilterEmitType };
