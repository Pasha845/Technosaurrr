<template>
  <main class="content container" v-if="productLoading">
    <div class="loading">
      <div class="loading__title">Загрузка товара...</div>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </main>
  <main class="content container" v-else-if="!productData">Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <router-link :to="{name: 'product', params: {id: product.id}}">
            <img :src="product.preview.file.url" :alt="product.title">
          </router-link>
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <router-link class="pics__link" :to="{name: 'product', params: {id: product.id}}">
              <img width="98" height="98" :src="product.preview.file.url" :alt="product.title">
            </router-link>
          </li>
          <li class="pics__item">
            <router-link class="pics__link" :to="{name: 'product', params: {id: product.id}}">
              <img width="98" height="98" :src="product.preview.file.url" :alt="product.title">
            </router-link>
          </li>
          <li class="pics__item">
            <router-link class="pics__link" :to="{name: 'product', params: {id: product.id}}">
              <img width="98" height="98" :src="product.preview.file.url" :alt="product.title">
            </router-link>
          </li>
          <li class="pics__item">
            <router-link class="pics__link" :to="{name: 'product', params: {id: product.id}}">
              <img width="98" height="98" :src="product.preview.file.url" :alt="product.title">
            </router-link>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price" v-if="selectValue == 0">
              {{ product.price * this.productAmount | numberFormat }} ₽
            </b>
            <b class="item__price" v-else>
              {{ selectValue.price * this.productAmount | numberFormat }} ₽
            </b>
            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" v-bind:key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" v-model="selectColor" :value="color.color.id">
                    <span class="colors__value" :style="{ background: color.color.code }"></span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объем, в ГБ:</legend>
              <ul class="sizes sizes--primery">
                <li class="sizes__item" v-for="value in product.offers" v-bind:key="value.id">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" v-model="selectValue" :value="value">
                    <span class="sizes__value" v-for="prop in value.propValues" v-bind:key="prop.id">{{ prop.value }}</span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" :disabled="btnProduct" @click="minusProduct">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount" @click="onInput">

                <button type="button" aria-label="Добавить один товар" @click="plusProduct">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                <div v-show="productBasket">В корзину</div>
                <div class="loading" v-show="productAddSending">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div v-show="productAdded">В корзине</div>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>
  
          <a href="#">
            Все характеристики
          </a>
  
          <h3>Что это?</h3>
  
          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>
  
          <h3>Дизайн</h3>
  
          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import gotoPage from "@/helpers/gotoPage";
  import numberFormat from "@/helpers/numberFormat";
  import axios from 'axios';
  import {API_BASE_URL} from "../config";
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        selectColor: 0,
        selectValue: '',
        productAmount: 1,
        productData: null,
        productLoading: false,
        productLoadingFailed: false,
        productBasket: true,
        productAdded: false,
        productAddSending: false
      };
    },
    filters: {
      numberFormat
    },
    computed: {
      product() {
        return this.productData;
      },
      category() {
        return this.productData.category;
      },
      btnProduct() {
        return this.productAmount <= 1 ? true : false;
      }
    },
    methods: {
      ...mapActions(['addProductToCart']),
      gotoPage,
      addToCart() {
        this.productBasket = false;
        this.productAdded = false;
        this.productAddSending = true;
        this.addProductToCart({productId: this.selectValue.id, colorId: this.selectColor, amount: this.productAmount})
          .then(() => {
            this.productAdded = true;
            this.productAddSending = false;
          });
      },
      minusProduct(){
        this.productAmount--;
      },
      onInput(productAmount) {
        if(productAmount < 1) {
          this.productAmount == 1;
        }
      },
      plusProduct(){
        this.productAmount++;
      },
      loadProduct(){
        this.productLoading = true;
        this.productLoadingFailed = false;
        axios.get(API_BASE_URL + '/api/products/' + this.$route.params.id)
        .then(response => this.productData = response.data)
        .catch(() => this.productLoadingFailed = true)
        .then(() => this.productLoading = false);
      }
    },
    watch: {
      '$route.params.id': {
        handler() {
          this.loadProduct();
        },
        immediate: true
      }
    }
  }
</script>