import axios from "axios";

const state = {
  list: [],
};

const mutations = {
  SET_PRODUCTS(state, payload) {
    state.list = payload.map((el) => {
      return {
        ...el,
        created_date: new Date(el.created_date).toISOString().slice(0, 10),
      };
    });
  },
};

const actions = {
  async getProducts({ commit }) {
    try {
      let res = await axios.get("http://94.158.54.194:9092/api/product");
      commit("SET_PRODUCTS", res.data);
    } catch {}
  },
};

const getters = {};

export const products = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
