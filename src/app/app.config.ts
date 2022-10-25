
const authUrl = '//.../auth/';
const baseUrl = '//.../.../';

export const config: any = {

  //認證伺服器
  roleUrl: authUrl + "authlist/get", // 取得角色權限
  loginUrl: authUrl + "login", // 使用者登入
  logoutUrl: authUrl + "logout", // 使用者登出
  addUserUrl: authUrl + "user/add",
  jwtRegistUrl: authUrl + "register",
  sideNavUrl: authUrl + "sidenav",

  //其他api
  testUrl: baseUrl + "test",
  downloadCourseUrl: baseUrl + "report/course/summary",
}

export const key: any = {

  publicKey: `-----BEGIN PUBLIC KEY-----
  ...
  -----END PUBLIC KEY-----`

}
