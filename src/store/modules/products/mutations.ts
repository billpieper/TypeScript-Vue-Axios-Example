import { SET_PRODUCTS } from '../../products-types'

export const mutations = {
  [SET_PRODUCTS] (state, products) {
    state.products = products
  }
}