import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import {API_BASE_URL} from "../config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null
  },
  mutations: {
    updateOrderInfo(state, orderInfo){
      state.orderInfo = orderInfo;
    },
    resetCart(state){
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {productId, amount}){
      const item = state.cartProducts.find(item => item.productId === productId);

      if(item){
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey){
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items){
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productOfferId: item.product.id,
          amount: item.quantity,
          colorId: item.color.id
        }
      });
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product === item.productId).product;
        return {
          ...item,
          product: {
            ...product
          }
        }
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    }
  },
  actions: {
    loadOrderInfo(context, orderId){
      return axios
      .get(API_BASE_URL + '/api/orders' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateOrderInfo', response.data);
      });
    },
    loadCart(context){
      return axios
        .get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          if(!context.state.userAccessKey){
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accesskey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
    },
    addProductToCart(context, {productId, amount, colorId}){
      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => {
          return axios
            .post(API_BASE_URL + '/api/baskets/products' , {
              productOfferId: productId,
              colorId: colorId,
              quantity: amount
            }, {
              params: {
                userAccessKey: context.state.userAccessKey
              }
            })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            })
        })
    },
    updateCartProductAmount(context, {productId, amount, colorId}){
      context.commit('updateCartProductAmount', {productId, amount, colorId});

      if(amount < 1) {
        return;
      }

      return axios
        .put(API_BASE_URL + '/api/baskets/products' , {
          productOfferId: productId,
          colorId: colorId,
          quantity: amount
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        })
    }
  }
});