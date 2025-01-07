import axios from "axios";

const url = process.env.REACT_APP_API_URL; // Ensure this is set correctly in your .env file

const login = axios.create({
  baseURL: `${url}/auth/login`, // Corrected template literal
});
const register = axios.create({
  baseURL: `${url}/auth/register`, // Corrected template literal
});
const users = axios.create({
  baseURL: `${url}/users`, // Corrected template literal
});
const products = axios.create({
  baseURL: `${url}/products`, // Corrected template literal
});
const hangtag = axios.create({
  baseURL: `${url}/hangtag`, // Corrected template literal
});
const quote = axios.create({
  baseURL: `${url}/getquote`, // Corrected template literal
});
const requestquote = axios.create({
  baseURL: `${url}/requestquote`, // Corrected template literal
});
const designquote = axios.create({
  baseURL: `${url}/designQuote`, // Corrected template literal
});
const blog = axios.create({
  baseURL: `${url}/blogs`, // Corrected template literal
});
const pendingcheckout = axios.create({
  baseURL: `${url}/pendingcheckout`, // Corrected template literal
});
const orders = axios.create({
  baseURL: `${url}/checkout`, // Corrected template literal
});
const newsletteremail = axios.create({
  baseURL: `${url}/newsletter`, // Corrected template literal
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
quote.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
requestquote.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
blog.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
login.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
register.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
users.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
hangtag.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
pendingcheckout.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
designquote.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
orders.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
newsletteremail.interceptors.request.use(
  (req) => {
    // Add any custom headers or logic here if needed
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export {
  products,
  quote,
  requestquote,
  blog,
  login,
  register,
  users,
  hangtag,
  pendingcheckout,
  designquote,
  orders,
  newsletteremail,
};
