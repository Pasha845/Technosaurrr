import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage';
import NotFoundPage from "@/pages/NotFoundPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import OrderPage from "@/pages/OrderPage";
import OrderInfoPage from "@/pages/OrderInfoPage";

Vue.use(VueRouter);

const routes = [
  {name: 'main', component: MainPage, path: '/'},
  {name: 'product', component: ProductPage, path: '/product/:id'},
  {name: 'notFound', component: NotFoundPage, path: '*'},
  {name: 'cart', component: CartPage, path: '*'},
  {name: 'order', component: OrderPage, path: '/order/:id'},
  {name: 'orderInfo', component: OrderInfoPage, path: '/order/info'}
];

const router = new VueRouter({
  routes
});

export default router;