import { useEffect, useState } from "react";

import useData from "./useData";
import { useHeaderContext } from "../contexts/admin/HeaderContext";

const endpoint = "header";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

const usePostData = ({ endpoint }) => {
  // console.log(props);
  // { endpoint, dataForPost }
  const [postData, setPostData] = useState(null);
  const [isPostDataLoading, setIsPostDataLoading] = useState(false);
  const [isPostDataError, setIsPostDataError] = useState(false);
  const [postDataError, setPostDataError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState(null);

  let headerContext = useHeaderContext();

  const { isLoading, isError, error, data } = useData({
    endpoint: endpoint,
    options: {
      method: "GET",
    },
  });

  useEffect(() => {
    setIsPostDataError(isError);
    setPostDataError(error);
    setPostData(data);
    setIsPostDataLoading(isLoading);
  }, [isError, error, data, isLoading]);

  const postDataFunc = async () => {
    options.body = JSON.stringify(headerContext);

    const url = process.env.REACT_APP_API_URL + endpoint;

    try {
      setIsPostDataLoading(true);
      const response = await fetch(url, options);

      if (!response.ok) {
        setIsSuccess(false);
        setIsPostDataError(true);
        setPostDataError("!!!!!!!КАПСАМНАПИСАТЬФСЕПЛОХОБАЛЬШЫМИБУКВАМИ!!!!!!!");
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
