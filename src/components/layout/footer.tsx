import Link from 'next/link';
import { PawPrintIcon } from '@/components/icons';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/30 text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <PawPrintIcon className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">PawsomeMart</span>
            </Link>
            <p className="text-sm text-foreground/80">
              Your one-stop shop for all pet needs. Quality products and trusted services.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li> {/* Added contact link */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li> {/* Added FAQ link */}
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li> {/* Added S&R link */}
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li> {/* Added Privacy link */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-foreground/80 hover:text-primary transition-colors"><Facebook size={24} /></Link>
              <Link href="#" aria-label="Instagram" className="text-foreground/80 hover:text-primary transition-colors"><Instagram size={24} /></Link>
              <Link href="#" aria-label="Twitter" className="text-foreground/80 hover:text-primary transition-colors"><Twitter size={24} /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-foreground/70">
          <p>&copy; {new Date().getFullYear()} PawsomeMart. All rights reserved. Happy Paws, Happy Hearts!</p>
        </div>
      </div>
    </footer>
  );
}
