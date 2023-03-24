export interface ResponseObj {
  status: string;
  errors: string[];
  result?: any;
}

export class TokenWhiteList {
  urls: Array<string> = ["/login", "/test", "/register"];
}

export class SelectItem {
  description?: string;
  value?: any;
  type?: string;
}

export class RoundCardItem {
  description?: string;
  value?: any;
  iconHtml?: string;
}
