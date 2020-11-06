import axios from 'axios';

export const googleMapsAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

// TODO add a middleware to check for an error and throw an error if there is one. Otherwise, extract only the data
export const backendAPI = axios.create({
  baseURL: 'http://3.134.77.241:3001/',
});

export const backendAPIFake = axios.create({
  baseURL: 'http://3.134.77.241:3001/',
});
