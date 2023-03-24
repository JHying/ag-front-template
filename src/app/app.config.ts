import { environment } from 'src/environments/environment';

const authUrl = `${environment.authUrl}`;

export const config: any = {

  //auth server
  loginUrl: authUrl + "login", // 使用者登入
  logoutUrl: authUrl + "logout", // 使用者登出
  addUserUrl: authUrl + "user/add",
  jwtRegistUrl: authUrl + "register",

}

export const key: any = {

  publicKey: `-----BEGIN PUBLIC KEY-----
  ...
  -----END PUBLIC KEY-----`

}
