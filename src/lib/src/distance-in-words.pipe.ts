import { Pipe, PipeTransform, ChangeDetectorRef } from "@angular/core";
import { distanceInWords } from "date-fns";
import {
  DateFnsConfigurationService,
  calculateLocale
} from "./date-fns-configuration.service";
import { Subscription } from "rxjs/Subscription";

@Pipe({ name: "dfnsDistanceInWords", pure: false })
export class DistanceInWordsPipe implements PipeTransform {
  static readonly NO_ARGS_ERROR = "dfnsDistanceInWords: missing required arguments";

  private localeChanged$: Subscription;

  constructor(public config: DateFnsConfigurationService, public cd: ChangeDetectorRef) {
    this.localeChanged$ = this.config.localeChanged.subscribe(_ => this.cd.markForCheck());
  }

  ngOnDestroy(): void {
    this.localeChanged$.unsubscribe();
  }

  transform(
    dateToCompare: string | number | Date,
    date: string | number | Date,
    options?: {
      includeSeconds?: boolean;
      addSuffix?: boolean;
      locale?: Object;
    }
  ): string {
    if (!dateToCompare || !date) {
      throw new Error(DistanceInWordsPipe.NO_ARGS_ERROR);
    }
    return distanceInWords(
      dateToCompare,
      date,
      calculateLocale(options, this.config)
    );
  }
}
