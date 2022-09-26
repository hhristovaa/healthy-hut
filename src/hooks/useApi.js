import { useState } from "react";
//
//https://stackoverflow.com/questions/73175989/react-async-promises-not-resolving


const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);  
    try {
      // const checkLocalStorage = localStorage.getItem(...args);
      // if (checkLocalStorage) {
      //   let dataInfo = JSON.parse(checkLocalStorage);
      //   setData(dataInfo);
      // } else {
      //   const result = await apiFunc(...args);
      //   console.log(result.data)
      //   const dataString = JSON.stringify(result.data?.results);
      //   localStorage.setItem(...args, dataString);
      //   setData(result.data);
      // }

      const result = await apiFunc(...args);
      setData(result.data);
     
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request
  };
};

export default useApi;