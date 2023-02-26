<template>
  <li class="cart__order">
    <h3>{{  item.productOffer.title }}</h3>
    <b>{{ (item.quantity * item.productOffer.price) | numberFormat }} ₽</b>
    <span>Артикул: {{ item.productOffer.id }}</span>
  </li>
</template>

<script>
  import numberFormat from "@/helpers/numberFormat";
  import { mapMutations } from 'vuex';

  export default {
    filters: {numberFormat},
    props: ['item'],
    computed: {
      amount: {
        get() {
          return this.item.amount;
        },
        set(value) {
          this.$store.dispatch('updateCartProductAmount', {productId: this.item.productId, amount: value});
        }
      }
    },
    methods: {
      ...mapMutations({deleteProduct: 'deleteCartProduct'})
    }
  }
</script>