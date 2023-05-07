import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

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



type EagerBasketDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly basketID: string;
  readonly ProductDetail?: ProductDetail | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketDetailProductDetailId?: string | null;
}

type LazyBasketDetail = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketDetail, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly basketID: string;
  readonly ProductDetail: AsyncItem<ProductDetail | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketDetailProductDetailId?: string | null;
}

export declare type BasketDetail = LazyLoading extends LazyLoadingDisabled ? EagerBasketDetail : LazyBasketDetail

export declare const BasketDetail: (new (init: ModelInit<BasketDetail>) => BasketDetail) & {
  copyOf(source: BasketDetail, mutator: (draft: MutableModel<BasketDetail>) => MutableModel<BasketDetail> | void): BasketDetail;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProductDetail = LazyLoading extends LazyLoadingDisabled ? EagerProductDetail : LazyProductDetail

export declare const ProductDetail: (new (init: ModelInit<ProductDetail>) => ProductDetail) & {
  copyOf(source: ProductDetail, mutator: (draft: MutableModel<ProductDetail>) => MutableModel<ProductDetail> | void): ProductDetail;
}

type EagerBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly shopID: string;
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
  readonly userID: string;
  readonly shopID: string;
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
  readonly Paniers?: (Basket | null)[] | null;
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
  readonly Paniers: AsyncCollection<Basket>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shop = LazyLoading extends LazyLoadingDisabled ? EagerShop : LazyShop

export declare const Shop: (new (init: ModelInit<Shop>) => Shop) & {
  copyOf(source: Shop, mutator: (draft: MutableModel<Shop>) => MutableModel<Shop> | void): Shop;
}