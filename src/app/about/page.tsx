import Image from 'next/image';
import { PawPrintIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShieldCheck, Users } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <PawPrintIcon className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold mb-4">About PawsomeMart</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Dedicated to the health, happiness, and well-being of pets everywhere. Discover our story and commitment to your furry, scaled, or feathered family members.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://placehold.co/600x450.png"
              alt="Team PawsomeMart with pets"
              width={600}
              height={450}
              className="rounded-xl shadow-2xl"
              data-ai-hint="team pets"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-foreground/90 mb-4">
              At PawsomeMart, our mission is simple: to provide pet owners with a convenient, reliable, and joyful shopping experience. We aim to offer the highest quality products and connect pet parents with trusted local services, all while fostering a community that celebrates the love of pets.
            </p>
            <p className="text-lg text-foreground/90">
              We believe that pets are family, and they deserve the best. That's why we meticulously curate our product selection and partner with service providers who share our passion for animal welfare.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Heart className="h-12 w-12 text-accent mx-auto mb-3" />
              <CardTitle className="text-xl">Passion for Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Our love for animals drives everything we do. We are pet owners and advocates first.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <ShieldCheck className="h-12 w-12 text-accent mx-auto mb-3" />
              <CardTitle className="text-xl">Quality & Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We stand by the quality of our products and the reliability of our service partners.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-accent mx-auto mb-3" />
              <CardTitle className="text-xl">Community Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We strive to build a supportive community for pet lovers and promote responsible pet ownership.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center bg-secondary/20 p-12 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Join Our Pawsome Family!</h2>
        <p className="text-lg text-foreground/90 mb-8 max-w-2xl mx-auto">
          Whether you're looking for the perfect toy, nutritious food, or expert care, PawsomeMart is here for you and your pet. Explore our offerings and experience the PawsomeMart difference!
        </p>
        {/* <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full">
          <Link href="/products">Shop Now</Link>
        </Button> */}
      </section>
    </div>
  );
}
