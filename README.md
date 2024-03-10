# Fullstack приложение облачного хранилища. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Основной функционал
Роутинг с закрытыми и публичными путями
JWT авторизация и регистрация.
Создание папок через контекстное меню на странице хранилища.
Навигация во вложенности папок.
Logout.
Валидация форм регистрации, авторизации и создания папки.
Обработка ошибок регистрации и авторизации от сервера через alert компонент.

## Стек фронтенд технологий
React
React-Router-Dom
Redux Toolkit
RTK Query
ReactHookForms
React MUI
TypeScript

### Структура папок
- api - RTK Query для запросов на сервер
- Components и Interface - компоненты UI, в том числе переиспользуемые, но не только. Например в дальнейшем можно было бы сделать переиспользуемые формы, просто возникли сложности с регистрацией в ReactHookForms.
- hooks - Кастомные хуки
- models - Некоторые кастомные типы, используемые в приложении
- Pages - Страницы приложения
- Router - типизация публичных и приватных путей приложения
- store - работа с ReduxToolkit
- utils - утилиты, в частности валидаторы форм.

# Пример работы сайта
![Alt Text](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)
