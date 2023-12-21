import { useEffect, useState } from "react";

import useData from "./useData";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

const usePostData = ({ endpoint }) => {
  console.log("usePostData hook triggered");
  const [postData, setPostData] = useState(null);
  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState(null);

  const { isLoading, isError, error, data } = useData({
    endpoint: endpoint,
    options: {
      method: "GET",
    },
  });

  useEffect(() => {
    setIsPostDataError(isError);
    setPostDataError(error);
    setIsPostDataLoading(isLoading);
    setPostData(data);
    console.log("data set");
    console.log(data);
  }, [isError, error, isLoading, data]);

  // useEffect(() => {
  //   setPostData(data);
  // }, [data]);

  // useEffect(() => {
  //   setIsPostDataLoading(isLoading);
  // }, [isLoading]);

  const postDataFunc = async ({ payload }) => {
    options.body = JSON.stringify(payload);

    const url = process.env.REACT_APP_API_URL + endpoint;

    try {
      setIsPostDataLoading(true);
      const response = await fetch(url, options);

      if (!response.ok) {
        setIsSuccess(false);
        setIsPostDataError(true);
        setPostDataError("Response is not ok");
      }

      const jsonData = await response.json();
      console.log("jsonData");
      console.log(jsonData);
      setIsSuccess(true);
      setSuccess(jsonData.message);

      // setIsPostDataError(isPostDataError);
      // setPostDataError(postDataError);
    } catch (error) {
      console.log(error);
      setIsPostDataError(true);
      setPostDataError(error.message);
    }
    setPostData(payload);
    setIsPostDataLoading(false);
  };

  return {
    postData,
    isPostDataLoading,
    isPostDataError,
    postDataError,
    isSuccess,
    success,
    postDataFunc,
  };
};

export default usePostData;
