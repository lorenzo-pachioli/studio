
import CartListComponent from '@/components/cart/CartListComponent';
import { submitOrder } from '@/services/mercadoPago';
import { redirect } from 'next/navigation';
import { ICartItem, IOrders } from '@/types';

export default async function CartPage() {

  async function handleCheckout(cartList: ICartItem[]) {
    'use server';
    const redirect_url = await submitOrder(cartList);
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


