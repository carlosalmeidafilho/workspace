import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: "http://192.168.15.23:3000/",
});

export default api;