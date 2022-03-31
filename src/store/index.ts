import { createStore } from 'vuex';

import { store as user } from './user';
import { store as menu } from './menu';
const Store = createStore({
  state: { ...user.userState, ...menu.state},
  mutations: { ...user.mutations, ...menu.mutations},
});

export default Store;
