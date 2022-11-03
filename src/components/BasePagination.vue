<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <button class="pagination__link pagination__link--arrow" aria-label="Назад" :disabled="prevBtn" @click="prevPage">
        <svg width="8" height="14" fill="currentColor">
        <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </button>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{'pagination__link--current': pageNumber === page}" @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <button class="pagination__link pagination__link--arrow" aria-label="Вперед" :disabled="nextBtn" @click="nextPage">
        <svg width="8" height="14" fill="currentColor">
        <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
  export default {
    model: {
      prop: 'page',
      event: 'paginate'
    },
    props: ['page', 'count', 'perPage'],
    computed: {
      prevBtn() {
        return this.pageNumber === 1 ? true : false;
      },
      nextBtn() {
        return this.pageNumber === 4 ? true : false;
      },
      pageNumber: {
        get() {
          return this.page
        },
        set(value) {
          this.$emit('paginate', value)
        }
      },
      pages() {
        return Math.ceil(this.count / this.perPage);
      }
    },
    methods: {
      nextPage(){
        this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
      paginate(page) {
        this.$emit('paginate', page);
      }
    }
  }
</script>