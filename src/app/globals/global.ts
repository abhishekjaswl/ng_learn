import { Injectable } from '@angular/core';

@Injectable()
export class Globals {}

export type FilterEmitType = {
  column: string;
  filter: {
    sort: string;
    checks: string[];
  };
};

export type MultiFilterEmitType = { [x: string]: FilterEmitType };
