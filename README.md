This follows the [Github TypeScript-Vue-Example](https://github.com/YingLiu4203/TypeScript-Vue-Example) to demostrate REST API usage of [Axios](https://github.com/mzabriskie/axios). 

After clone the [TypeScript-Vue-Example](https://github.com/YingLiu4203/TypeScript-Vue-Example) repository, follow the below instructions to setup and run a REST API demo. 
 
## 1. Create REST Server API
First, create `/server/src/product-data.js` with the following code -- this is the server side code that still use JavaScript

```js
module.exports = [
  {
    id: '001',
    name: 'COBOL 101 vintage',
    description: 'Learn COBOL with this vintage programming book',
    price: 399,
  },
  {
    id: '007',
    name: 'Sharp C2719 curved TV',
    description: 'Watch TV like with new screen technology',
    price: 1995,
  },
  {
    id: '719',
    name: 'Remmington X mechanical keyboard',
    description: 'Excellent for gaming and typing',
    price: 595,
  }
]
```

Then, create `/server/src/get-products.js` with the following code:

```js
const products = require('./products-data')

exports.getProducts = (req, res) => {
  res.status(200); // 200 OK
  res.json(products)
}
```

Finally, add the server API by inserting the following two lines to `build/dev-server.js`, right after creating var app = express():

```js
var productsApi = require('../server/src/get-products')
app.get('/api/products', productsApi.getProducts)
```

## 2. Install Axios

Install Axios by running `npm i -S axios` 

## 3. Use Mutations and Actions

### 3.1. Add Type Constants

Edit the `src/store/products-types.ts` file as the following:

```ts
export const FETCH_PRODUCTS = 'products/FETCH_PRODUCTS'
export const SET_PRODUCTS = 'products/SET_PRODUCTS'
export const GET_PRODUCTS = 'products/GET_PRODUCTS'
```

### 3.2. Create the `SET_PRODUCTS` Mutation

Create `src/store/modules/products/mutations.ts` as the following:

```ts
import { SET_PRODUCTS } from '../../products-types'

export const mutations = {
  [SET_PRODUCTS] (state, products) {
    state.products = products
  }
}
```

### 3.3. Create the FETCH_PRODUCTS Action

Create the src/store/modules/products/actions.ts as the following:

```ts
import axios from 'axios'
import { FETCH_PRODUCTS, SET_PRODUCTS } from '../../products-types'

export const actions = {
  [FETCH_PRODUCTS] ({ commit }) {
    return axios.get('api/products/')
      .then((response) =>
        commit(SET_PRODUCTS, response.data))
  }
}
```

### 3.4. Update the Products Store Module

Edit src/store/modules/products/index.ts to have the following content:

```ts
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

const initialState = {
  products: []
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
```

### 3.5. Fetch Data When ProductList is Created

Edit the `<script>` in src/components/ProductList.vue to have the following content:

```ts
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
```

In the above code, we map the `types.FETCH_PRODUCTS` as a local method fetchProducts and call it when the component is created.

## 4. Use TSLint
Perform the following steps to use TSLint. 

### 4.1. Install TSLint and TSLint Loader
Run `npm i -D tslint tslint-loader` 

### 4.2. Initialize `tslint.json`
Run `tslint -i` to initialize `tslint.json` file. 
Edit the file for your needs. There are two changes in this project. 

```json
"semicolon": [
  false
],
"quotemark": [
    true,
    "single"
],
```

### 4.3. Config WebPack Build
Make TSLint part of the build process. 

```js
preLoaders: [
  {
    test: /\.ts$/,
    loader: 'tslint'
  }
],
tslint: {
  emitErrors: true,
  failOnHint: true
}
```

