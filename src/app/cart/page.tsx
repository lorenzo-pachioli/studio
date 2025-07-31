
import api from '@/api';
import CartListComponent from '@/components/cart/CartListComponent';
import { submitOrder } from '@/services/mercadoPago';
import { redirect } from 'next/navigation';
import { ICartItem, IOrders } from '@/types';

export default async function CartPage() {

  async function handleCheckout(cartList: ICartItem[]) {
    'use server';
    const redirect_url = await submitOrder(cartList);
    //const redirect_url = await api.message.submit("Producto de prueba");
    console.log("Redirect URL:", redirect_url);
    if (redirect_url) {
      redirect(redirect_url);
    }
  };

  return (
    <div>
      <CartListComponent handleCheckout={handleCheckout} />
    </div>
  );
}


