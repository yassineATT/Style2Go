import React, { createContext, useContext } from "react";
import { Order, OrderDetail, ProductDetail } from "../../models";
import { DataStore } from "aws-amplify";
import { BasketContext } from "../basket/basket.context";
import { set } from "react-hook-form";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { deleteBasket, setTotal } = useContext(BasketContext);

  const createOrder = async (selectedBasket) => {
    try {
      for (let basket of selectedBasket) {
        console.log("basketDetail", basket);
        const newOrder = await DataStore.save(
          new Order({
            userID: basket.userID,
            shopID: basket.shopID,
            status: "NEW",
            total: basket.totalPrice,
          })
        );

        for (let basketDetail of basket.BasketDetails) {
          console.log(
            "basketDetailOrder",
            basketDetail.productDetail.Product.name
          );
          await DataStore.save(
            new OrderDetail({
              orderID: newOrder.id,
              quantite: basketDetail.quantity,
              prix_unite: basketDetail.productDetail.price,
              productdetailID: basketDetail.productdetailID,
              product_name: basketDetail.productDetail.Product.name,
            })
          );
          const productDetail = await DataStore.query(
            ProductDetail,
            basketDetail.productdetailID
          );

          if (productDetail) {
            await DataStore.save(
              ProductDetail.copyOf(productDetail, (updated) => {
                updated.quantity -= basketDetail.quantity;
              })
            );
          }
        }
        await deleteBasket(basket.id);
        await setTotal(0);
      }

      console.log("Payment processed successfully", selectedBasket);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <OrderContext.Provider value={{ createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
