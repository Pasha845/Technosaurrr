<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>
      <h1 class="content__title">Корзина</h1>
      <div v-if="productsLoading">
        <div class="loading">
          <div class="loading__title">Загрузка товаров...</div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div v-else>
        <span class="content__info" v-if="$store.state.cartProducts.length == 0">Нет товаров</span>
        <span class="content__info" v-else-if="$store.state.cartProducts.length == 1">{{ $store.state.cartProducts.length }} товар</span>
        <span class="content__info" v-else-if="$store.state.cartProducts.length <= 4">{{ $store.state.cartProducts.length }} товара</span>
        <span class="content__info" v-else>{{ $store.state.cartProducts.length }} товаров</span>
      </div>
      <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров</div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in $store.state.cartProductsData" :key="item.productId" :item="item"></CartItem>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price" v-if="totalPrice == 0">Нет товаров</p>
          <p class="cart__price" v-else>Итого: <span>{{ totalPrice | numberFormat}} ₽</span></p>
          <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import numberFormat from "@/helpers/numberFormat";
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import {API_BASE_URL} from '../config';
  import CartItem from "@/components/CartItem";

  export default {
    data() {
      return {
        productsData: null,
        productsLoading: false,
        productsLoadingFailed: false
      }
    },
    filters: {numberFormat},
    components: {CartItem},
    computed: {
      ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'})
    },
    methods: {
      loadProducts() {
        this.productsLoading = true;
        this.productsLoadingFailed = false;
        axios
          .get(API_BASE_URL + '/api/products', {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorCheck
            }
          })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false);
      }
    },
    created() {
      this.loadProducts();
    }
  }
</script>