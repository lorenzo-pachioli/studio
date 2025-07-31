'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { ShopingCartContext } from '@/hooks/shopingCart-state';
import { ProductsContext } from '@/hooks/products-state';
import { ICartItem } from '@/types';

export default function CartListComponent({handleCheckout}: { handleCheckout: (cartList: ICartItem[]) => void }) {
  const { cartList, useAddToCart, useRemoveCartItem } = useContext(ShopingCartContext);
  const { useProductById } = useContext(ProductsContext);

  const changeQuantity = (cartItem: ICartItem, quantity: number, operation: "add"|"remove") => {

    const product = useProductById(cartItem.product_id);
    if(operation === "add" && product) useAddToCart(product, quantity);
    if(operation === "remove") useRemoveCartItem(cartItem.uid, quantity);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Shoping cart</h2>
        <p className="text-muted-foreground">Check the items you added to your cart and finish the purchase</p>
      </div>

      {cartList.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartList.map((order) => (
              <TableRow key={order.uid}>
                <TableCell className="font-medium">{order.product}</TableCell>
                <TableCell className="text-center">
                    <Button variant="outline" onClick={() => changeQuantity(order, 1, "remove")} size="sm" className="hover:bg-primary/10 hover:text-primary border-primary/50">
                    <span>-</span>
                    </Button>
                    {order.quantity}
                    <Button variant="outline" onClick={() => changeQuantity(order, 1, "add")}  size="sm" className="hover:bg-primary/10 hover:text-primary border-primary/50">
                    <span>+</span>
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">${order.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground mb-4">Looks like you haven't placed any orders. Start shopping now!</p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/products">Shop Products</Link>
            </Button>
        </div>
      )}
      <div className="flex justify-between items-center">
        <Link href="/products" className="text-sm text-primary hover:underline">
          Continue Shopping
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-primary">
            ${cartList.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </span>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleCheckout(cartList)}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  </div>
  );
}