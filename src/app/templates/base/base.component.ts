import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.css"],
})
export class BaseComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor() {
  }

  protected takeUntilDestroy<T>() {
    if (!this.destroy$) this.destroy$ = new Subject<void>(); // LAZY Subject
    return takeUntil<T>(this.destroy$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
