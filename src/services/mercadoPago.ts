import { MercadoPagoConfig, Preference } from "mercadopago";
import { ICartItem, IOrders, Product } from "@/types";
import { getCartItemById, getOrderById, setData } from "@/services/operations";
import { decrypt, verifySession } from "./statelessSession";

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
    console.log("Adding message", message);
    const exist = await getOrderById(message.id.toString());
    // Si ya existe un mensaje con ese id, lanzamos un error
    if (exist === null) {
      throw new Error("Message already added");
    }
    const newOrder: IOrders = {
      ...message.order,
      uid: message.id.toString()
    };

    // Agregamos el nuevo mensaje
    const response = await setData("Orders", message.id.toString(), newOrder);
    return response;

  } catch (error) {
    console.error("Error adding message:", error);
  }
}

export const submitOrder = async (order: ICartItem[]) => {
  try {
    const session = await verifySession();
    if (!session.isAuth) {
      throw new Error("User is not authenticated");
    }
    const user_id = await decrypt(session.cookie)
    
    const newOrder = {
      uid: String(crypto.randomUUID()),
      user_id: user_id?.uid,
      items: order.map(item => item.uid),
      quantity: order.reduce((total, item) => total + item.quantity, 0),
      createdAt: new Date(),
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