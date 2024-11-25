const BASE_URL = "http://127.0.0.1:8000";

// main
const MAIN_URL = `${BASE_URL}/main`
const PRODUCTS_URL = `${MAIN_URL}/products`;
const TYPES_URL = `${MAIN_URL}/types`;
const BRANDS_URL = `${MAIN_URL}/brands`;
const PRODUCT_IDS_URL = `${MAIN_URL}/product_slugs`;
const MIN_MAX_URL = `${MAIN_URL}/min_max`;

// accounts
const ACCOUNTS_URL = `${BASE_URL}/accounts`;
const CART_URL = `${ACCOUNTS_URL}/cart`;
const WISH_LIST_URL = `${ACCOUNTS_URL}/wish_list`;
const REGISTRATION_URL = `${ACCOUNTS_URL}/api/v1/auth/users/`;
const AUTH_URL = `${ACCOUNTS_URL}/accounts/auth/token/login/`;
const USER_URL = `${ACCOUNTS_URL}/api/v1/auth/users/me`

// payment
const PAYMENT_URL = `${BASE_URL}/payment`
const CREATE_PAYMENT_URL = `${PAYMENT_URL}/create_payment`
const DELIVERY_TYPES_URL = `${PAYMENT_URL}/delivery_types`;
const ORDERS_URL = `${PAYMENT_URL}/orders`;

// variables
const TOKEN = localStorage.getItem("token");
const SORT_TYPES = [
  { name: "price", id: 0 },
  { name: "-price", id: 1 },
  { name: "name", id: 2 },
  { name: "-name", id: 3 },
];

// export
const SETTINGS = {
  BASE_URL: BASE_URL,
  MIN_MAX_URL: MIN_MAX_URL,
  PRODUCTS_URL: PRODUCTS_URL,
  TYPES_URL: TYPES_URL,
  BRANDS_URL: BRANDS_URL,
  PRODUCT_IDS_URL: PRODUCT_IDS_URL,
  ACCOUNTS_URL: ACCOUNTS_URL,
  DELIVERY_TYPES_URL: DELIVERY_TYPES_URL,
  ORDERS_URL: ORDERS_URL,
  CART_URL: CART_URL,
  WISH_LIST_URL: WISH_LIST_URL,
  REGISTRATION_URL: REGISTRATION_URL,
  AUTH_URL: AUTH_URL,
  TOKEN: TOKEN,
  SORT_TYPES: SORT_TYPES,
  PAYMENT_URL: PAYMENT_URL,
  CREATE_PAYMENT_URL: CREATE_PAYMENT_URL,
  MAIN_URL: MAIN_URL,
  USER_URL: USER_URL
};

export default SETTINGS;
