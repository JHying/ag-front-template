import { Injectable } from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomNgbTimeAdapter {
  fromModel(value: string): NgbTimeStruct {
    if (!value) return null;
    let parts = value.split(":");
    return {
      hour: +parts[0],
      minute: +parts[1],
      second: +parts[2],
    } as NgbTimeStruct;
  }

  toModel(time: NgbTimeStruct): string {
    // from internal model -> your mode
    return time
      ? ("0" + time.hour).slice(-2) +
          ":" +
          ("0" + time.minute).slice(-2) +
          ":" +
          ("0" + time.second).slice(-2)
      : null;
  }
}
