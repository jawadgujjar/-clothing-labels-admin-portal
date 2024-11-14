import axios from "axios";

const url = process.env.REACT_APP_API_URL; // Ensure this is set correctly in your .env file

// Create axios instances with dynamic URLs

const products = axios.create({
  baseURL: `${url}/products`, // Corrected template literal
});

// Request interceptor for products
products.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { products };
