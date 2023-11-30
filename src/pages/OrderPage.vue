<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Оформление заказа
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"></BaseFormText>
            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес"></BaseFormText>
            <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон" placeholder="Введите ваш телефон"></BaseFormText>
            <BaseFormText v-model="formData.email" :error="formError.email" title="Email" placeholder="Введи ваш Email"></BaseFormText>
            <BaseFormTextarea v-model="formData.comment" :error="formError.comment" title="Комментарий к заказу" placeholder="Ваши пожелания"></BaseFormTextarea>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="delivery in deliveryData" :key="delivery.id">
                <label v-if="delivery.price == 0" class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" v-model="currentDelivery" :value="delivery">
                  <span class="options__value">
                    {{ delivery.title }} <b>бесплатно</b>
                  </span>
                </label>
                <label v-else class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" v-model="currentDelivery" :value="delivery">
                  <span class="options__value">
                    {{ delivery.title }} <b>{{ delivery.price | numberFormat }} ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="response in responsesData" :key="response.id">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" :value="response" v-model="currentResponses">
                  <span class="options__value">{{ response.title }}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="item in $store.state.cartProductsData" :key="item.productId" :item="item"></OrderItem>
          </ul>
          
          <div class="cart__total">
            <p v-if="currentDelivery.price == 0">Доставка: <b>бесплатно</b></p>
            <p v-else>Доставка: <b>{{ currentDelivery.price | numberFormat }} ₽</b></p>
            <p v-if="$store.state.cartProducts.length == 0">Итого: <b>{{ $store.state.cartProducts.length }}</b> нет товаров</p>
            <p v-else-if="$store.state.cartProducts.length == 1">Итого: <b>{{ $store.state.cartProducts.length }}</b> товар на сумму <b>{{totalPrice | numberFormat }} ₽</b></p>
            <p v-else-if="$store.state.cartProducts.length <= 4">Итого: <b>{{ $store.state.cartProducts.length }}</b> товара на сумму <b>{{totalPrice | numberFormat }} ₽</b></p>
            <p v-else>Итого: <b>{{ $store.state.cartProducts.length }}</b> товаров на сумму <b>{{totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import BaseFormText from "@/components/BaseFormText";
  import BaseFormTextarea from "@/components/BaseFormTextarea";
  import axios from "axios";
  import { API_BASE_URL } from "../config";
  import { mapGetters } from 'vuex';
  import numberFormat from "@/helpers/numberFormat";
  import OrderItem from "@/components/OrderItem";

  export default {
    components: {BaseFormText, BaseFormTextarea, OrderItem},
    computed: {
      ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice'})
    },
    data() {
      return {
        formData: {},
        formError: {},
        formErrorMessage: '',
        currentDelivery: 0,
        currentResponses: 0,
        deliveryData: null,
        responsesData: null
      }
    },
    methods: {
      order() {
        this.formError = {};
        this.formErrorMessage = '';

        axios
          .post(API_BASE_URL + '/api/orders', {
            ...this.formData,
            deliveryTypeId: this.currentDelivery.id,
            paymentTypeId: this.currentResponses.id
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey
            }
          })
          .then(response => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({name: 'orderInfo'});
          })
          .catch(error => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
      },
      loadDelivery() {
        axios.get(API_BASE_URL + '/api/deliveries')
          .then(response => this.deliveryData = response.data);
      },
      loadResponses() {
        axios.get(API_BASE_URL + '/api/payments?deliveryTypeId=1')
          .then(response => this.responsesData = response.data);
      }
    },
    created() {
      this.loadDelivery();
      this.loadResponses();
    },
    filters: {
      numberFormat
    }
  }
</script>