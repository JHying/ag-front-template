import { MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AgCartesianSeriesTooltipRendererParams } from "ag-charts-community";
import JSEncrypt from "jsencrypt";
import { key } from "./../app.config";

export interface DialogData {
  id: any;
  title: string;
  contents: any;
}

export class Utils {
  constructor() {}

  public static webScrollTo(elementId: string, route: ActivatedRoute) {
    route.fragment.subscribe((f) => {
      setTimeout(() => {
        // 需一段時間搜尋才找得到??????沒加會找不到div
        const element = document.getElementById(elementId);
        // console.log(location);
        // console.log(element);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    });
  }

  public static myDialogConfig(
    id: any,
    title: string,
    dialogContents: any
  ): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "70%";
    dialogConfig.closeOnNavigation = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      id: id,
      title: title,
      contents: dialogContents,
    };
    return dialogConfig;
  }

  public static rsaEncrypt(plainText: string) {
    var crypto = new JSEncrypt();
    crypto.setPublicKey(key.publicKey);
    return crypto.encrypt(plainText) as string;
  }

  public static myChartsRenderer = function (
    params: AgCartesianSeriesTooltipRendererParams
  ) {
    return {
      // title = x 軸, content = y 軸數據
      title: new Date(params.xValue).toLocaleString("en-GB"),
      content: params.yValue.toFixed(0),
    };
  };

}
