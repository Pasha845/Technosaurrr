<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" placeholder="0" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" placeholder="0" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>
      
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model="currentCategoryId">
            <option value="0">Все категории</option>
            <option v-bind:value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" v-model="currentColorId" :value="color.id">
              <span class="colors__value" :style="{ background: color.code }"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend"></legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                <span>()</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
  import axios from 'axios';
  import {API_BASE_URL} from '../config';

  export default {
    data() {
      return {
        currentPriceFrom: 0,
        currentPriceTo: 0,
        currentCategoryId: 0,
        currentColorId: 1,
        currentParamsId: 0,
        categoriesData: null,
        colorsData: null,
        paramsData: null
      }
    },
    props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'paramsId'],
    computed: {
      categories() {
        return this.categoriesData ? this.categoriesData.items : [];
      },
      colors() {
        return this.colorsData ? this.colorsData.items : [];
      },
      params() {
        return this.paramsData ? this.paramsData.items : [];
      }
    },
    watch: {
      priceFrom(value) {
        this.currentPriceFrom = value;
      },
      priceTo(value) {
        this.currentPriceTo = value;
      },
      categoryId(value) {
        this.currentCategoryId = value;
      },
      colorId(value) {
        this.currentColorId = value;
      },
      paramsId(value) {
        this.currentParamsId = value;
      }
    },
    methods: {
      submit() {
        this.$emit('update:priceFrom', this.currentPriceFrom);
        this.$emit('update:priceTo', this.currentPriceTo);
        this.$emit('update:categoryId', this.currentCategoryId);
        this.$emit('update:colorId', this.currentColorId);
        this.$emit('update:paramsId', this.currentParamsId);
      },
      reset() {
        this.$emit('update:priceFrom', null);
        this.$emit('update:priceTo', null);
        this.$emit('update:categoryId', 0);
        this.$emit('update:colorId', 1);
        this.$emit('update:paramsId', 0);
      },
      loadCategories() {
        axios.get(API_BASE_URL + '/api/productCategories')
          .then(response => this.categoriesData = response.data);
      },
      loadColors() {
        axios.get(API_BASE_URL + '/api/colors')
          .then(response => this.colorsData = response.data);
      },
      loadParams() {
        axios.get(API_BASE_URL + '/api/productCategories/skutery-i-skeyty')
          .then(response => this.paramsData = response.data);
      },
    },
    created() {
      this.loadCategories();
      this.loadColors();
      this.loadParams();
    }
  }
</script>