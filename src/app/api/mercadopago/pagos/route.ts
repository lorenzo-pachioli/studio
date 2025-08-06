import {Payment} from "mercadopago";
import {revalidatePath} from "next/cache";
import { addSuccessOperation, mercadopago } from "@/services/mercadoPago";
import { initAdminApp } from "@/services/firebase-admin";

export async function POST(request: Request) {
  // Obtenemos el cuerpo de la petición que incluye información sobre la notificación
  const body: {data: {id: string}} = await request.json();

  // Obtenemos el pago
  const payment = await new Payment(mercadopago).get({id: body.data.id});

  // Si se aprueba, agregamos el mensaje
  if (payment.status === "approved") {
    // Obtenemos los datos
    await initAdminApp();
    await addSuccessOperation({id: payment.id!, order: payment.metadata});

    // Revalidamos la página de inicio para mostrar los datos actualizados
    revalidatePath("/account/dashboard");
  }

  // Respondemos con un estado 200 para indicarle que la notificación fue recibida
  return new Response(null, {status: 200});
}