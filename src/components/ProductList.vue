<template>
  <table class="table table-hover">
     <thead>
      <tr>
        <th>Product Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" track-by="id">
        <td>{{product.id}}</td>
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/products-types'

export default {
  computed: mapGetters({
    products: types.GET_PRODUCTS
  }),
  methods: {
    ...mapActions({
      fetchProducts: types.FETCH_PRODUCTS
    })
  },
  created () {
    this.fetchProducts()
  }
}
</script>
