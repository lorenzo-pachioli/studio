import { getCollections } from "@/services/operations";

const fetchProducts = async () => {
  try {
    const productsList = await getCollections("products");
    return productsList;
  } catch (error) {
    console.error("Error initializing products:", error);
  }
};

const fetchPromotions = async () => {
  try {
    const promotionsList = await getCollections("promotions");
    return promotionsList;
  } catch (error) {
    console.error("Error initializing promotions:", error);
  }
};

const fetchServices = async () => {
  try {
    const servicesList = await getCollections("services");
    return servicesList;
  } catch (error) {
    console.error("Error initializing services:", error);
  }
};

export {fetchProducts, fetchPromotions, fetchServices};