// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

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

const { User, ProductDetail, Product, Shop } = initSchema(schema);

export {
  User,
  ProductDetail,
  Product,
  Shop,
  Size
};