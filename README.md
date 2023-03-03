# Разработка интернет-магазина гаджетов "Технозавр" на Vue.js с использованием REST API

![Список товаров](https://user-images.githubusercontent.com/106194295/208992706-30e2aded-bfec-44f1-8125-16579b163c50.jpg)

## Проект состоит из 5 страниц: 
- главная страница,
- страница товара,
- корзина,
- оформление заказа,
- успешное оформление заказа

## Разделы "Header" и "Footer" на всех страницах одинаковые:

### 1. Header:
- заголовок "Каталог",
- логотип,
- телефон (при клике пользователю предлагают позвонить по этому телефону),
- ссылка "В корзину" с индикатором количества товаров - при клике происходит переход на страницу "Корзина"

### 2. Footer:
- меню с ссылками,
- ссылки социальных сетей (без перехода),
- копирайт

## Главная страница состоит из:

### 1. Фильтры:
- фильтр цен:
  - поле ввода минимальной цены,
  - поле ввода максимальной цены
- выбор категорий товаров - выпадающий список с перечнем категорий
- выбор цвета - чекбоксы (множественный выбор),
- выбор объема в Гб - чекбоксы (множественный выбор),
- кнопка "Применить" - при клике выводится список товаров согласно указанным фильтрам,
- кнопка "Сбросить" - при клике присходит сброс параметров фильтра и списка товаров

### 2. Список товаров:
- заголовок "Каталог",
- количество активных товаров в каталоге,
- 12 карточек товара:
  - фото товара, название, цена, радиокнопки выбора цвета и/или объема в Гб,
  - по клику на карточку товара происходит переход на страницу товара

### 3. Пагинация:
- по клику на номер страницы происходит переход на соотвествующую страницу,
- по клику на стрелки происходит переход на предыдущую или следующую страницы

## Страница товара состоит из:

### 1. Хлебные крошки:
- по клику на ссылки происходит переход на соответствующую страницу, последняя ссылка некликабельна

### 2. Данные товара:
- артикул товара,
- название товара,
- фотогалерея

### 3. Блок покупки:
- цена товара,
- цвет товара,
- количество товаров с возможностью изменения,
- кнопка "В корзину" - при нажатии товар добавляется в корзину с указанными характеристиками

### 4. Вкладки:
- описание - при клике выводится описание товара,
- характеристики - при клике выводятся характеристики товара,
- остальные вкладки нерабочие

## Корзина состоит из:

### 1. Хлебные крошки:
- по клику на ссылки происходит переход на соответствующую страницу, последняя ссылка некликабельна

### 2. Информация о товарах в корзине:
- заголовок "Корзина",
- количество товаров в корзине,
- карточки товаров:
- фото товара,
- название товара,
- цвет товара и/или объем в Гб,
- артикул товара,
- количество товаров с возможностью изменения - при изменении общая стоимость будет изменена,
- цена товара,
- кнопка удаления товара - при клике товар будет удален из корзины, общая стоимость будет изменена, меняется индикатор количества товаров в Header

### 3. Блок перехода к следующему этапу:
- блок с текстом,
- общая стоимость всех товаров в корзине,
- кнопка "Оформить заказ" - при клике происходит переход на страницу "Оформление заказа"

## Страница "Оформление заказа" состоит из:

### 1. Хлебные крошки:
- по клику на ссылки происходит переход на соответствующую страницу, последняя ссылка некликабельна

### 2. Оформление заказа:
- заголовок "Оформление заказа",
- поля ввода данных пользователя с валидацией:
  - ФИО,
  - адрес доставки,
  - телефон,
  - e-mail,
  - комментарий к заказу
- выбор способа доставки:
  - самовывоз - бесплатно,
  - курьером - 500 рублей

### 3. Блок перехода к следующему этапу:
- список товаров,
- стоимость доставки,
- количество товаров,
- общая стоимость,
- кнопка "Оформить заказ" - при клике происходит переход на страницу "Успешное оформление"

## Страница "Успешное оформление заказа" состоит из:

### 1. Хлебные крошки:
- по клику на ссылки происходит переход на соответствующую страницу, последняя ссылка некликабельна

### 2. Блок информации о заказе:
- заголовок "Заказ оформлен",
- номер заказа,
- блок с текстом,
- информация о пользователе:
  - ФИО,
  - адрес доставки,
  - телефон,
  - e-mail,
  - способ оплаты

### 3. Итоговый блок:
- список товаров,
- стоимость доставки,
- количество товаров,
- общая стоимость