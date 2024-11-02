import axios from "axios";

const url = process.env.REACT_APP_API_URL; // Ensure this is set correctly in your .env file

const products = axios.create({
  baseURL: `${url}/products` // Use backticks for template literals
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

// Ensure `login` is defined before exporting
export { products };
