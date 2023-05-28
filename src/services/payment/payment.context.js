import React, { createContext, useContext } from "react";
import { Order, OrderDetail, ProductDetail } from "../../models";
import { DataStore } from "aws-amplify";
import { BasketContext } from "../basket/basket.context";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { deleteBasket } = useContext(BasketContext);
  const handlePayment = async (selectedBasket) => {
    try {
      // Parcourir chaque panier sélectionné
      for (let basket of selectedBasket) {
        // Créer une nouvelle commande
        const newOrder = await DataStore.save(
          new Order({
            userID: basket.userID,
            shopID: basket.shopID,
            status: "NEW",
            total: basket.totalPrice,
          })
        );

        // Parcourir chaque détail du panier et créer un détail de commande correspondant
        for (let basketDetail of basket.BasketDetails) {
          await DataStore.save(
            new OrderDetail({
              orderID: newOrder.id,
              quantite: basketDetail.quantity,
              prix_unite: basketDetail.productDetail.price,
              productdetailID: basketDetail.productdetailID,
            })
          );
          // Obtenir les détails du produit
          const productDetail = await DataStore.query(
            ProductDetail,
            basketDetail.productdetailID
          );

          // Mettre à jour la quantité
          if (productDetail) {
            await DataStore.save(
              ProductDetail.copyOf(productDetail, (updated) => {
                updated.quantity -= basketDetail.quantity;
              })
            );
          }
        }
        await deleteBasket(basket.id);
      }

      console.log("Payment processed successfully", selectedBasket);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <PaymentContext.Provider value={{ handlePayment }}>
      {children}
    </PaymentContext.Provider>
  );
};
