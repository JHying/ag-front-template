import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //讓 css 設定應用於所有組件 (component)
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {

  // @Input() 就是告訴 Child (呼叫頁) 他的 Parent (本頁) 可以綁定的參數
  // @Output() 就是 Child (呼叫頁) 先執行後將值傳回 Parent (本頁)
  // @Input() title: string;
  // @Input() subtitle: string;

  constructor() {
  }

}
