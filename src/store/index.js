import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import { products } from './products'
Vue.use(Vuex)


export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      products
    },


    strict: process.env.DEBUGGING
  })

  return Store
}
