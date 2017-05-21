import {Pipe, PipeTransform} from '@angular/core';
import * as getOverlappingDaysInRanges from 'date-fns/get_overlapping_days_in_ranges';

@Pipe({ name: 'dfnsGetOverlappingDaysInRanges' })
export class GetOverlappingDaysInRangesPipe implements PipeTransform {
  static readonly NO_ARGS_ERROR = 'dfnsGetOverlappingDaysInRanges: missing required arguments';

  transform(
    initialRangeStartDate: string | number | Date,
    initialRangeEndDate: string | number | Date,
    comparedRangeStartDate: string | number | Date,
    comparedRangeEndDate: string | number | Date
  ): string {
    if (!initialRangeStartDate || !initialRangeEndDate || !comparedRangeStartDate || !comparedRangeEndDate) {
        throw new Error(GetOverlappingDaysInRangesPipe.NO_ARGS_ERROR);
    }
    const days = getOverlappingDaysInRanges(
      initialRangeStartDate, initialRangeEndDate, comparedRangeStartDate, comparedRangeEndDate
    );
    return days.toString(10);
  }
}