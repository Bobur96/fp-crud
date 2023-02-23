import { api } from 'boot/axios'

export function someAction (/* context */) {
  getMatches({ commit })
    api.get(`/api/v1/matches/?page=${state.pagination.page}`)
      .then(response => { commit('SET_MATCHES', response.data) })
}
