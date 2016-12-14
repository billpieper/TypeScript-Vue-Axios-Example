import { FETCH_PRODUCTS, SET_PRODUCTS } from '../../products-types'

export const actions = {
  [FETCH_PRODUCTS] ({ commit }, axios) {
    return axios.get('api/products/')
      .then((response) => 
        commit(SET_PRODUCTS, response.data))
  }
}
