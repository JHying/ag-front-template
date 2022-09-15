export interface LoginReq {
  userId: string;
  userPW: string;
}

export interface UserInfo {
  userId: string; // "UserId": "Administrator"
  userName: string;
  roles?: Array<string>; // "Role": "Admin"
}

export class JwtUser {
  jwtUser: string = "test";
  jwtPW: string = "testpass";
  userId: string;
}
