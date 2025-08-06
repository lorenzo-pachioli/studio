import "server-only";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { ICartItem, IOrders, Product } from "@/types";
import { getCartItemById, getOrderById, setData } from "@/services/operations";
import { decrypt, verifySession } from "./statelessSession";
import { getFirestore } from "firebase-admin/firestore";

interface Message {
  id: number;
  order: IOrders;
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    timeout: 30000,
    idempotencyKey: 'abc'
  }
});
console.log("Mercado Pago Config initialized:", !!process.env.MP_ACCESS_TOKEN);

export const addSuccessOperation = async (message: Message): Promise<void> => {

  try {
    const firestore = getFirestore();
    const exist = await firestore.collection("Orders").doc(message.id.toString()).get();
    console.log("Order data:", message);
    // Si ya existe un mensaje con ese id, lanzamos un error
    if (exist.exists) {
      throw new Error("Order already added");
    }

    const newOrder: IOrders = {
      uid: message.order.uid,
      user_id: message.order.user_id,
      items: message.order.items,
      quantity: message.order.quantity,
      created_at: new Date(message.order.created_at || new Date().toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"})),
      total: message.order.total,
      status: "completed", 
      meli_id: message.id
    };

    // Agregamos el nuevo mensaje
    const response = await firestore.collection("Orders").doc(String(newOrder.uid)).set(newOrder);
    console.log("Order added successfully:", response);
  } catch (error) {
    console.error("Error adding order:", error);
  }
}

export const submitOrder = async (order: ICartItem[]) => {
  try {
    const session = await verifySession();
    if (!session.isAuth) {
      throw new Error("User is not authenticated");
    }
    const user_id = await decrypt(session.cookie)
    console.log("Order details:", order);
    console.log("User ID from session:", user_id);


    
    const newOrder = {
      uid: String(crypto.randomUUID()),
      user_id: user_id?.uid,
      items: order.map(item => item.product_id),
      quantity: order.reduce((total, item) => total + item.quantity, 0),
      created_at: new Date(new Date().toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"})),
      status: "pending",
      total: order.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    const preference = await new Preference(mercadopago).create({
      body: {
        items: order.map((item) => ({
          id: String(item.product_id),
          title: String(item.product),
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
        })),
        metadata: newOrder
      }
    });

    // Devolvemos el init point (url de pago) para que el usuario pueda pagar
    return preference.init_point!;
  } catch (error) {
    console.error("Error details:", {
      name: (error as any)?.name,
      message: (error as any)?.message,
      stack: (error as any)?.stack,
      cause: (error as any)?.cause,
      response: (error as any)?.response?.data || (error as any)?.response
    });
    throw error;
  }
}