
import { api } from 'boot/axios'

export const state = {
  matches: [],
  pagination: {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 1,
    rowsNumber: 0
  }
}

export const mutations = {
  SET_MATCHES(state, matches) {
    state.matches = matches
    state.pagination.rowsNumber = matches.count
  }
}

export const actions = {
  getMatches({ commit }) {
    api
      .get(`/api/v1/matches/?page=${state.pagination.page}`)
      // returns object like this:
      // {
      //    count: 6,
      //    next: "http://localhost:8000/api/v1/matches/?page=3",
      //    previous: null,
      //    results: [...]
      // }
      .then(response => {
        commit('SET_MATCHES', response.data)
      })
  }
}