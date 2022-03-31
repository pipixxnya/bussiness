import _ from 'lodash';
interface MenuItem {
  id: number;
  name: string;
  childMenuList?: MenuItem[];
  icon?: string;
  menuCode: string;
  permission: string;
  level: string;
  url: string;
}
interface tab {
  url: string;
  name: string;
  id: number;
}
interface MenuState {
  menuList: MenuItem[];
  navbarList:MenuItem[];
  //   routeList: MenuItem[];
  openTabs?: tab[];
  activeMenu: MenuItem | null | undefined;
  flattenMenu:Array<MenuItem | null>;
  premission:Array<string>
}

const state: MenuState = {
  menuList: [], // tab列表
  navbarList:[],
  activeMenu: null,
  flattenMenu: [],
  premission:[]
};

let mutations = {
  setNavbarList(state: MenuState, list: MenuItem[]){
    state.navbarList = list
  },
  setPremission(state: MenuState, list: Array<string>){
    state.premission = list
  },
  setFlattenMenu(state: MenuState, list: MenuItem[]){
    state.flattenMenu = list
  },
  removeFlattenMenu(state: MenuState){
    state.flattenMenu = []
  },
  setActivePath(state: MenuState, activeMenu: MenuItem) {
    // debugger
    state.activeMenu = activeMenu;
  },
  setPathList(state: MenuState, activeMenu: MenuItem) {
    let isHas = false;
    if (state.menuList.length) {
      isHas = state.menuList.some((route) => {
        return route && route.name == activeMenu.name;
      });
    }
    
    if (!isHas && activeMenu) {
      state.menuList.push(activeMenu);
    }

    state.activeMenu = activeMenu;
  },

  removePathList(state: MenuState, menu: MenuItem) {
    let newPathList = state.menuList.filter((item) => item.id != menu.id);

    // _.remove(state.menuList, function (item) {
    //   return item.id == menu.id;
    // });
    state.menuList = state.menuList.filter((item => {
      return item.id != menu.id
    }))
    if (newPathList.length) {
      state.activeMenu = _.last(newPathList);
    }
  },
  reLoad(state:MenuState){
    state.activeMenu = null;
    state.menuList = [];
},
};

export const store = {
  state,
  mutations,
};
