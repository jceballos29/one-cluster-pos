/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { AxiosCall } from '../models/axios-call.model';

const useCallAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<unknown>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<unknown>;
    try {
      result = await axiosCall.call;
    } catch (error: unknown) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    if (controller) controller.abort();
  };

  useEffect(() => {
    return () => cancelEndpoint();
  }, []);

  return { loading, callEndpoint };
};

export default useCallAndLoad;
