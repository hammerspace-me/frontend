import axios, { AxiosInstance } from 'axios';
import { useStore } from '../store';

export class Api {
  private api: AxiosInstance;
  private errorHandler: (message: string) => void;
  private unauthorizedHandler: (url: string) => void;

  public constructor(
    baseUrl: string,
    onError: (message: string) => void,
    onUnauthorized: (url: string) => void,
    accessToken?: string
  ) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: accessToken ? 'Bearer ' + accessToken : ''
    };

    this.api = axios.create({
      baseURL: baseUrl,
      headers: headers
    });

    this.errorHandler = onError;
    this.unauthorizedHandler = onUnauthorized;
  }

  private processError = (url: string, error: any) => {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('err-data', error.response.data);
      console.log('err-status', error.response.status);
      console.log('err-headers', error.response.headers);

      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 407
      ) {
        this.unauthorizedHandler(url);
      } else {
        this.errorHandler(
          error.response.data && error.response.data.message
            ? `${JSON.stringify(error.response.data.message)} (${error.response.status})`
            : 'An unexpected error occurred'
        );
      }
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log('Request error', error.request);

      this.errorHandler('API call failed');
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error);

      this.errorHandler('An unexpected error occurred');
    }
  };

  public get = async (url: string) => {
    try {
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      this.processError(url, error);
      throw error;
    }
  };

  public post = async (url: string, data: any, callBack?: Function) => {
    try {
      const response = await this.api.post(url, data);
      if (callBack) {
        callBack();
      }
      return response.data;
    } catch (error) {
      this.processError(url, error);
      throw error;
    }
  };

  public postForm = async (url: string, form: any, callBack?: Function) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(form);
      keys.forEach((key) => {
        formData.append(key, form[key]);
      });

      const headers = { 'Content-Type': 'multipart/form-data' };

      await this.api.post(url, formData, { headers });

      if (callBack) {
        callBack();
      }
    } catch (error) {
      this.processError(url, error);
      throw error;
    }
  };

  public put = async (url: string, data: any, callBack?: Function) => {
    try {
      const response = await this.api.put(url, data);
      if (callBack) {
        callBack();
      }
      return response;
    } catch (error) {
      this.processError(url, error);
      throw error;
    }
  };

  public remove = async (url: string, callBack?: Function) => {
    try {
      const response = await this.api.delete(url);
      if (callBack) {
        callBack();
      }
      return response;
    } catch (error) {
      this.processError(url, error);
      throw error;
    }
  };
}
