# Бургерная

## Что реализовано
- Страницы переключаются с помощью vue-routing
- Вместо бэкенда и запросов к апи создан имитационный файл store.js
- Изменение данных реализовано через реактивный объект, т.е. при перезагрузке все изменения сбросятся
- Есть страница бургеров, на ней можно:
    - добавить новый бургер
    - если список бургеров пуст, то предлагается добавить новый бургер
- Есть страница конкретного бургера, на ней можно:
    - удалить бургер
- Есть страница ресторанов, на ней можно:
    - добавить новый ресторан
    - если список ресторанов пуст, то предлагается добавить новый ресторан
- Модалка, с помощью которой происходит добавление бургера/ресторана
    - Для бургера вводятся название, ссылка на изображение (например с unsplash), выбор ингредиентов через чекбоксы, выбор ресторана через селект
    - Для ресторана вводятся название, адрес, строка поиска бургера по названию

## Баги
 - открытая строка поиска при клике вне ее не закрывается
