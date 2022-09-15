import { Injectable, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { Utils } from "./../../utils/utils";
import { MsgBoxComponent } from "./msg-box.component";

@Injectable({
  providedIn: "root",
})
export class MessageBox implements OnDestroy {
  dialogResultSubject: Subscription;

  constructor(private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.dialogResultSubject.unsubscribe();
  }

  show(message: string, title?: string): MatDialogRef<MsgBoxComponent> {
    return this.dialog.open(
      MsgBoxComponent,
      Utils.myDialogConfig(null, title, message)
    );
  }
}
