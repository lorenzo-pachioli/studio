'use client';

import { mockOrderHistory } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Order History</h2>
        <p className="text-muted-foreground">View your past orders and their status.</p>
      </div>

      {mockOrderHistory.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrderHistory.map((order) => (
              <TableRow key={order.uid}>
                <TableCell className="font-medium">{order.uid}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge 
                    variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                    className={
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-300' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                      'bg-yellow-100 text-yellow-700 border-yellow-300'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary border-primary/50">
                    {/* In a real app, this would link to an order details page */}
                    <Link href={`/account/orders/${order.uid}`}> 
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Link>
                  </Button>
                </TableCell>
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
    </div>
  );
}
