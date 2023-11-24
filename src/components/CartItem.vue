<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.productOffer.product.preview.file.url" width="120" height="120" alt="item.productOffer.title">
    </div>
    <h3 class="product__title">
      {{ item.productOffer.title }}
    </h3>

    <div class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ background: item.color.color.code }"></i>
        {{ item.color.color.title }}
      </span>

      <p class="" v-for="elem in item.productOffer.propValues" :key="elem.id">
        Объем:
        <span>{{ elem.value }}</span>
      </p>
    </div>

    <span class="product__code">
      Артикул: {{ item.productOffer.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" :disabled="btnProduct" @click="minusProduct">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <input type="text" v-model.number="quantity" name="count">
      <button type="button" aria-label="Добавить один товар" @click="plusProduct">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    
    <b class="product__price">
      {{ (item.quantity * item.productOffer.price ) | numberFormat}} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click="deleteProduct">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
  import numberFormat from "@/helpers/numberFormat";
  import { mapActions } from 'vuex';

  export default {
    ...mapActions(['deleteCartProduct']),
    filters: {numberFormat},
    props: ['item'],
    computed: {
      quantity: {
        get() {
          return this.item.quantity;
        },
        set(value) {
          this.$store.dispatch('updateCartProductAmount', {productItemId: this.item.id, amount: value});
        }
      },
      btnProduct() {
        return this.quantity === 1 ? true : false;
      }
    },
    methods: {
      minusProduct(){
        this.quantity--;
      },
      plusProduct(){
        this.quantity++;
      },
      deleteProduct(){
        this.deleteCartProduct({productItemId: this.item.id});
      }
    }
  }
</script>