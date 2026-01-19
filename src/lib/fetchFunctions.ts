import { getCollections } from "@/services/operations";

const fetchProducts = async () => {
  try {
    const productsList = await getCollections("products");
    return productsList;
  } catch (error) {
    // Error initializing products
  }
};

const fetchPromotions = async () => {
  try {
    const promotionsList = await getCollections("promotions");
    return promotionsList;
  } catch (error) {
    // Error initializing promotions
  }
};

const fetchServices = async () => {
  try {
    const servicesList = await getCollections("services");
    return servicesList;
  } catch (error) {
    // Error initializing services
  }
};

export { fetchProducts, fetchPromotions, fetchServices };