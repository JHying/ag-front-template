export interface LoginReq {
  userId: string;
  userPW: string;
  sourceId: number;
}

export interface UserInfo {
  userId: string;
  userName: string;
  roles?: Array<string>;
  urls?: Array<string>;
  sideNavObjs?: Array<SideNavObj>;
}

export class JwtUser {
  authUser: string = "test";
  authPass: string = "test";
  userId: string;
}

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
