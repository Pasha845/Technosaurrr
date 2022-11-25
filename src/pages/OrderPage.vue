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
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" checked="">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="item in products" :key="item.productId" :item="item"></OrderItem>
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ $store.state.cartProducts.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat}} ₽</b></p>
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
    data(){
      return {
        formData: {},
        formError: {},
        formErrorMessage: ''
      }
    },
    methods: {
      order(){
        this.formError = {};
        this.formErrorMessage = '';

        axios
          .get(API_BASE_URL + '/api/deliveries', {
              params: {
                id: this.id,
                title: this.title,
                price: this.price,
              }
            })
          .post(API_BASE_URL + '/api/orders', {
            ...this.formData
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
      }
    },
    filters: {
      numberFormat
    }
  }
</script>