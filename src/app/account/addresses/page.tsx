'use client';

import { useState } from 'react';
import { mockAddresses } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, PlusCircle, Edit2, Trash2, Home, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox';


type Address = typeof mockAddresses[0];

export default function AddressesPage() {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for new/edit address
  const [formAddress, setFormAddress] = useState<Partial<Address>>({
    type: 'Home',
    addressLine1: '',
    city: '',
    state: '',
    zip: '',
    isDefault: false,
    addressLine2: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormAddress(prev => ({ ...prev, isDefault: checked}));
  };


  const openAddModal = () => {
    setEditingAddress(null);
    setFormAddress({ type: 'Home', addressLine1: '', city: '', state: '', zip: '', isDefault: false });
    setIsModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setFormAddress({ ...address });
    setIsModalOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.uid !== id));
    toast({ title: 'Address Deleted', description: 'The address has been removed.' });
  };
  
  const handleSetDefault = (id: string) => {
    setAddresses(prevAddresses => 
      prevAddresses.map(addr => ({
        ...addr,
        isDefault: addr.uid === id,
      }))
    );
    toast({ title: 'Default Address Updated', description: 'The default shipping address has been changed.' });
  };

  const handleSaveAddress = () => {
    if (!formAddress.addressLine1 || !formAddress.city || !formAddress.state || !formAddress.zip) {
        toast({ variant: "destructive", title: "Missing Fields", description: "Please fill all required address fields." });
        return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => addr.uid === editingAddress.uid ? { ...editingAddress, ...formAddress } as Address : addr));
      toast({ title: 'Address Updated', description: 'Your address has been successfully updated.' });
    } else {
      // Add new address
      const newAddress: Address = {
        uid: `ADDR${Date.now()}`, // Simple unique ID
        ...formAddress
      } as Address;
      setAddresses(prev => [newAddress, ...prev]);
      toast({ title: 'Address Added', description: 'New address has been saved.' });
    }
    setIsModalOpen(false);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-semibold tracking-tight">Saved Addresses</h2>
            <p className="text-muted-foreground">Manage your shipping and billing addresses.</p>
        </div>
        <Button onClick={openAddModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.uid} className={`hover:shadow-lg transition-shadow ${address.isDefault ? 'border-2 border-primary' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center">
                        {address.type === 'Home' ? <Home className="mr-2 h-5 w-5 text-primary" /> : <Briefcase className="mr-2 h-5 w-5 text-primary" />}
                        {address.type} Address
                        </CardTitle>
                        {address.isDefault && <Badge className="mt-1 bg-primary/20 text-primary border-primary/50">Default</Badge>}
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditModal(address)} className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        {!address.isDefault && (
                             <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.uid)} className="h-8 w-8 hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        )}
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{address.city}, {address.state} {address.zip}</p>
              </CardContent>
              {!address.isDefault && (
                <CardFooter>
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.uid)} className="border-primary/50 text-primary hover:bg-primary/10">
                        Set as Default
                    </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Addresses Saved</h3>
            <p className="text-muted-foreground">Add a new address to get started with faster checkouts.</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            <DialogDescription>
              {editingAddress ? 'Update your address details below.' : 'Enter the details for your new address.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Input id="type" name="type" value={formAddress.type || 'Home'} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addressLine1" className="text-right">Address Line 1</Label>
              <Input id="addressLine1" name="addressLine1" value={formAddress.addressLine1 || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">City</Label>
              <Input id="city" name="city" value={formAddress.city || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">State</Label>
              <Input id="state" name="state" value={formAddress.state || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zip" className="text-right">Zip Code</Label>
              <Input id="zip" name="zip" value={formAddress.zip || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="flex items-center space-x-2 col-start-2 col-span-3">
                <Checkbox id="isDefault" checked={formAddress.isDefault} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="isDefault" className="text-sm font-normal">Set as default address</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveAddress} className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
