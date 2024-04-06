// это импорт приложения из пакета
// аналогичен import X from 'ROUTE' из es6
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const verifyJwt = require("./middlewares/verifyJwt");

// импортируем роутер
const authRouter = require("./routers/authRouter");
const router = require("./routers/router");
const errorRouter = require("./routers/errorRouter");
const cookieParser = require("cookie-parser");

// вызываем экспресс для получения приложения
const app = express();

// вызываем cors для использования cors
app.use(cors());

// middleware для использования json
app.use(express.json());

// middleware для парсинга cookies
app.use(cookieParser());

// открытая часть
app.use("/api/", authRouter);

// middleware JWT проверка
app.use(verifyJwt);
// добавляем роутер в приложение
app.use("/api/cms", router);

// если маршрут неверный среди всех API
app.use("*", errorRouter);

// читаем порт приложения или берем по умолчанию 5к
const APP_PORT = process.env.APP_PORT || 5000;

// запускаем приложение
app.listen(APP_PORT, () => {
  console.log(`Server started on PORT: ${APP_PORT}`);
});
