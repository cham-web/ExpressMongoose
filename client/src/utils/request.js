import storage from 'store';
import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,
});

// 错误处理
const errorHandler = (err) => {
  Toast(err.response.data.message);
  return Promise.reject(err);
};

// 请求处理
request.interceptors.request.use((config) => {
  const token = storage.get('token');
  const con = { ...config };
  if (token) {
    con.headers.Authorization = `Bearer ${token}`;
  }
  return con;
}, errorHandler);

// 数据返回处理
request.interceptors.response.use((response) => {
  switch (response.data.resultCode) {
    case 1:
      return Promise.resolve(response.data.data);
    default:
      Toast(response.data.message);
      return Promise.reject(response.data.message);
  }
}, errorHandler);

export default request;
