<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info" v-if="countProducts == 0">Нет товаров</span>
      <span class="content__info" v-else-if="countProducts == 1">{{ countProducts }} товар</span>
      <span class="content__info" v-else-if="countProducts <= 4">{{ countProducts }} товара</span>
      <span class="content__info" v-else>{{ countProducts }} товаров</span>
    </div>

    <div class="content__catalog">
      
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"></ProductFilter>

      <section class="catalog">

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
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров<button @click.prevent="loadProducts">Повторить запрос</button></div>

        <ProductList :products="products"></ProductList>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"></BasePagination>
        
      </section>
    </div>
  </main>
</template>

<script>
  import axios from 'axios';
  import {API_BASE_URL} from '../config';
  import ProductList from '@/components/ProductList';
  import BasePagination from "@/components/BasePagination";
  import ProductFilter from "@/components/ProductFilter";

  export default {
    components: { ProductList, BasePagination, ProductFilter },
    data() {
      return {
        page: 1,
        productsPerPage: 12,
        filterPriceFrom: null,
        filterPriceTo: null,
        filterCategoryId: 0,
        filterColorId: 0,
        productsData: null,
        productsLoading: false,
        productsLoadingFailed: false
      }
    },
    computed: {
      products() {
        return this.productsData
          ? this.productsData.items.map(product => {
            return {
              ...product,
              image: product.preview.file.url
            }
          })
          : [];
      },
      countProducts() {
        return this.productsData ? this.productsData.pagination.total : 0;
      }
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
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            categoryId: this.filterCategoryId,
            colorId: this.filterColorId
          }
        })
        .then(response => this.productsData = response.data)
        .catch(() => this.productsLoadingFailed = true)
        .then(() => this.productsLoading = false);
      }
    },
    watch: {
      page() {
        this.loadProducts();
      },
      filterPriceFrom() {
        this.loadProducts();
      },
      filterPriceTo() {
        this.loadProducts();
      },
      filterCategoryId() {
        this.loadProducts();
      },
      filterColorId() {
        this.loadProducts();
      }
    },
    created() {
      this.loadProducts();
    }
  };
</script>