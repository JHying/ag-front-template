export interface SideNavObj {
  pageIcon: string;
  pageName: string;
  pageUrl: string;
  childPages: [
    {
      pageId: string;
      pageIcon: string;
      pageName: string;
      pageUrl: string;
      parent: string;
    }
  ];
}

export interface ResponseObj {
  status: string;
  errors: string[];
  result?: any;
}

export class TokenWhiteList {
  urls: Array<string> = ["/login", "/logout", "/sidenav", "/test", "/register", "/authlist/get"];
}

export class ChoiceItem {
  description?: string;
  value?: string;
}
