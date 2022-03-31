interface UserState {
  id: number;
  token: string;
  selectOrgCode: string,
  organizationName:string;
  tenantId:string;
  userName: string;
  loginName: string;
  logoName:string;
  primaryOrg: boolean,
  loginCms:number | string,
  accountId: string,
}

const userState: UserState = {
  token: "",
  organizationName:"",
  selectOrgCode:"",
  tenantId:"",
  userName: "",
  loginName: "",
  logoName:"",
  id: 0,
  primaryOrg: false,
  loginCms:1,
  accountId: '',
};

let mutations = {
  setToken(state: UserState, token: string) {
    state.token = token;
  },
  setUserName(state: UserState, name: string) {
    state.userName = name;
  },

  removeToken(state: UserState) {
    state.token = "";
  },
  setPrimaryOrg(state:UserState,data:boolean){
    state.primaryOrg = data
  },
  setOrganizationName(state: UserState, organizationName: string) {
    state.organizationName = organizationName;
  },
  setSelectOrgCode(state: UserState, selectOrgCode: string) {
    state.selectOrgCode = selectOrgCode;
  },
  setTenantId(state: UserState, tenantId: string) {
    state.tenantId = tenantId;
  },
  setLoginCms(state: UserState, loginCms: string) {
    state.loginCms = loginCms
  },
  setAccountId(state: UserState, id: string) {
    state.accountId = id
  },
  setLogoName(state: UserState, logoName: string) {
    state.logoName = logoName
  },
};

export const store = {
  userState,
  mutations,
};
