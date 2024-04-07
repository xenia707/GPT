import { useEffect, useState } from "react";

import useData from "./useData";

const controller = new AbortController();
const signal = controller.signal;

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

const usePostData = ({ endpoint }) => {
  const { isLoading, isError, error, data } = useData({
    endpoint: endpoint,
    options: {
      method: "GET",
    },
  });

  const [postData, setPostData] = useState(data);
  // используем статусную модель для индикации состояния получения данных:
  // 'idle', 'success', 'error', 'loading'
  const [status, setStatus] = useState("idle");
  // для статусной модели при ошибке, указываем в statusDescription детали ошибки
  // для успешного запроса указываем ответ сервера
  // в человекопонятной форме
  const [statusDescription, setStatusDescription] = useState("");

  // добавляем сайд эффекты для связи загрузки данных с бэкенда
  // через хук useData
  useEffect(() => {
    setStatus("success");
    setStatusDescription(null);
    setPostData(data);
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setStatus("loading");
      setStatusDescription("Идет загрузка");
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setStatus("error");
      setStatusDescription(error);
    }
  }, [isError, error]);

  const url = process.env.REACT_APP_API_URL + endpoint;

  const postDataFunc = async ({ payload }) => {
    options.body = JSON.stringify(payload);

    try {
      setStatus("loading");
      setPostData(payload);

      const response = await fetch(url, options, { signal });

      if (!response.ok) {
        setStatus("error");
        setStatusDescription("Что-то пошло не так");
      }

      const jsonData = await response.json();

      console.log("jsonData");
      console.log(jsonData);
      setStatus("success");
      setStatusDescription(jsonData.message || "Данные сохранены");
    } catch (error) {
      console.log(error);
      setStatus("error");
      setStatusDescription(error);

      if (error.message === "Failed to fetch") {
        setStatusDescription("Сервер не отвечает");
      } else {
        setStatusDescription(error.message);
      }
    }
  };

  return {
    postData,
    status,
    statusDescription,
    postDataFunc,
  };
};

export default usePostData;
