import { fetchUsers } from "./../api/usersApi";

const userModule = {
  state: () => ({
    usersList: [],
  }),
  mutations: {
    setUserList(state, users) {
      state.usersList = users;
    },
  },
  actions: {
    async getUsers({ commit }) {
      const { data } = await fetchUsers();
      commit("setUserList", data.data);
    },
  },
  getters: {
    users(state) {
      return state.usersList;
    },
  },
};

export default userModule;
