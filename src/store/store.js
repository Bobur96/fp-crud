import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    products: [],
  },
  getters: {},
  mutations: {
    getProduct() {
      axios
        .get("http://94.158.54.194:9092/api/product")
        .then((res) => {
          res.data.forEach((el) => {
            el.created_date = new Date(el.created_date).toISOString().slice(0, 10);
          });
          state.products = res.data;
        })
    },
  },
});
