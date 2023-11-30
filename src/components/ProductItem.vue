<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title" width="270" height="350">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ selectValue | numberFormat }} ₽</span>

    <ul class="colors">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color" v-model="selectColor" :value="color.color.id">
          <span class="colors__value" :style="{ background: color.color.code }"></span>
        </label>
      </li>
    </ul>

    <ul class="sizes">
      <li class="sizes__item" v-for="value in product.offers" :key="value.id">
        <label class="sizes__label">
          <input class="sizes__radio sr-only" type="radio" v-model="selectValue" :value="value.price">
          <span class="sizes__value" v-for="prop in value.propValues" v-bind:key="prop.id" v-if="prop.value != 'Зеленый' && prop.value != 'Оранжевый' && prop.value != 'Черный' && prop.value != 'Красный' && prop.value != 'Серый'">
            {{ prop.value }}
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
  import gotoPage from "@/helpers/gotoPage";
  import numberFormat from "@/helpers/numberFormat";

  export default {
    data() {
      return {
        selectColor: 0,
        selectValue: this.product.price
      };
    },
    filters: {
      numberFormat
    },
    methods: {
      gotoPage
    },
    props: ['product']
  };
</script>