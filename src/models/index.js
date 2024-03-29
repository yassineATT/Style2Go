// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const StatusOrder = {
  "NEW": "NEW",
  "PREPARATION": "PREPARATION",
  "COMMAND_READY": "COMMAND_READY",
  "ACCEPT": "ACCEPT",
  "RETRIEVE": "RETRIEVE",
  "CANCEL": "CANCEL"
};

const Size = {
  "XS": "XS",
  "S": "S",
  "M": "M",
  "L": "L",
  "XL": "XL",
  "XXL": "XXL",
  "SIZE_39": "SIZE_39",
  "SIZE_40": "SIZE_40",
  "SIZE_41": "SIZE_41",
  "SIZE_42": "SIZE_42"
};

const { OrderDetail, Order, BasketDetail, Basket, User, ProductDetail, Product, Shop } = initSchema(schema);

export {
  OrderDetail,
  Order,
  BasketDetail,
  Basket,
  User,
  ProductDetail,
  Product,
  Shop,
  StatusOrder,
  Size
};