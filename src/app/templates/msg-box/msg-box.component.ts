import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/utils/utils";

@Component({
  selector: "app-msg-box",
  templateUrl: "./msg-box.component.html",
  styleUrls: ["./msg-box.component.css"],
})
export class MsgBoxComponent {
  title: string;
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<MsgBoxComponent>
  ) {
    this.title = data.title;
    this.message = data.contents;
  }

  closeDialog(boolean: Boolean) {
    this.dialogRef.close(boolean);
  }
}
