import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum StatusOrder {
  NEW = "NEW",
  PREPARATION = "PREPARATION",
  COMMAND_READY = "COMMAND_READY",
  ACCEPT = "ACCEPT",
  RETRIEVE = "RETRIEVE",
  CANCEL = "CANCEL"
}

export enum Size {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  SIZE_39 = "SIZE_39",
  SIZE_40 = "SIZE_40",
  SIZE_41 = "SIZE_41",
  SIZE_42 = "SIZE_42"
}



type EagerOrderDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderID: string;
  readonly quantite?: number | null;
  readonly prix_unite?: number | null;
  readonly productdetailID: string;
  readonly product_name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly orderID: string;
  readonly quantite?: number | null;
  readonly prix_unite?: number | null;
  readonly productdetailID: string;
  readonly product_name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderDetail = LazyLoading extends LazyLoadingDisabled ? EagerOrderDetail : LazyOrderDetail

export declare const OrderDetail: (new (init: ModelInit<OrderDetail>) => OrderDetail) & {
  copyOf(source: OrderDetail, mutator: (draft: MutableModel<OrderDetail>) => MutableModel<OrderDetail> | void): OrderDetail;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly shopID: string;
  readonly status?: StatusOrder | keyof typeof StatusOrder | null;
  readonly total?: number | null;
  readonly shipping_cost?: number | null;
  readonly OrderDetails?: (OrderDetail | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly shopID: string;
  readonly status?: StatusOrder | keyof typeof StatusOrder | null;
  readonly total?: number | null;
  readonly shipping_cost?: number | null;
  readonly OrderDetails: AsyncCollection<OrderDetail>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerBasketDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly basketID: string;
  readonly productdetailID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBasketDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly basketID: string;
  readonly productdetailID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BasketDetail = LazyLoading extends LazyLoadingDisabled ? EagerBasketDetail : LazyBasketDetail

export declare const BasketDetail: (new (init: ModelInit<BasketDetail>) => BasketDetail) & {
  copyOf(source: BasketDetail, mutator: (draft: MutableModel<BasketDetail>) => MutableModel<BasketDetail> | void): BasketDetail;
}

type EagerBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shopID: string;
  readonly userID: string;
  readonly BasketDetails?: (BasketDetail | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly shopID: string;
  readonly userID: string;
  readonly BasketDetails: AsyncCollection<BasketDetail>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Basket = LazyLoading extends LazyLoadingDisabled ? EagerBasket : LazyBasket

export declare const Basket: (new (init: ModelInit<Basket>) => Basket) & {
  copyOf(source: Basket, mutator: (draft: MutableModel<Basket>) => MutableModel<Basket> | void): Basket;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstname?: string | null;
  readonly lastname?: string | null;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly country?: string | null;
  readonly postalCode?: number | null;
  readonly sub?: string | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstname?: string | null;
  readonly lastname?: string | null;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly country?: string | null;
  readonly postalCode?: number | null;
  readonly sub?: string | null;
  readonly Baskets: AsyncCollection<Basket>;
  readonly Orders: AsyncCollection<Order>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerProductDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly size?: Size | keyof typeof Size | null;
  readonly color?: string | null;
  readonly quantity?: number | null;
  readonly price?: number | null;
  readonly productID: string;
  readonly OrderDetails?: (OrderDetail | null)[] | null;
  readonly BasketDetails?: (BasketDetail | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProductDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly size?: Size | keyof typeof Size | null;
  readonly color?: string | null;
  readonly quantity?: number | null;
  readonly price?: number | null;
  readonly productID: string;
  readonly OrderDetails: AsyncCollection<OrderDetail>;
  readonly BasketDetails: AsyncCollection<BasketDetail>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProductDetail = LazyLoading extends LazyLoadingDisabled ? EagerProductDetail : LazyProductDetail

export declare const ProductDetail: (new (init: ModelInit<ProductDetail>) => ProductDetail) & {
  copyOf(source: ProductDetail, mutator: (draft: MutableModel<ProductDetail>) => MutableModel<ProductDetail> | void): ProductDetail;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly description?: string | null;
  readonly shopID: string;
  readonly ProductDetails?: (ProductDetail | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly description?: string | null;
  readonly shopID: string;
  readonly ProductDetails: AsyncCollection<ProductDetail>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address?: string | null;
  readonly image?: string | null;
  readonly lat?: string | null;
  readonly long?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly shopSub?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address?: string | null;
  readonly image?: string | null;
  readonly lat?: string | null;
  readonly long?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly Baskets: AsyncCollection<Basket>;
  readonly Orders: AsyncCollection<Order>;
  readonly shopSub?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shop = LazyLoading extends LazyLoadingDisabled ? EagerShop : LazyShop

export declare const Shop: (new (init: ModelInit<Shop>) => Shop) & {
  copyOf(source: Shop, mutator: (draft: MutableModel<Shop>) => MutableModel<Shop> | void): Shop;
}