import AddProduct from "@/components/addProduct.jsx";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/public/utils/supabase/server"; 
import { Bell, LogIn, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient(); // Added await

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts(): [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  // console.log("User:", user); // Add this to debug
  // console.log("Products length:", products.length); // Add this to debug

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src={"/PriceTracker.png"}
              alt="Price Tracker Logo"
              width={600}
              height={400}
              className="h-10 w-auto"
            />
          </div>
          <AuthButton user={user} />
        </div>
      </header>

      <section className="py-20 px-4 text-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-blue-50 px-6 py-2 rounded-full">
            Made with Lakiii
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Never Miss a price Drop
          </h2>
          <p className="text-xl font-bold text-gray-600 mb-12 max-w-2xl mx-auto">
            Track prices across all major e-commerce sites and get notified when
            items drop below your target price.
          </p>

          <AddProduct user={user} />

          
          { ! user && products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-lg shadow-md p-6 text-left"
                >
                  <Icon className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}

          { user &&products.length>0 && <section className="max-w-7xl-mx-auto px-4 pb-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-blod text-gray-900">Your track products</h3>
              
                <span className="text-sm text-gray-500">

                  {products.length} {products.length == 1 ? "product" : "products"}
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 items-start">
                  {products.map((product)=>(
                    <ProductCard key={product.id} product={product}></ProductCard>
                  ))

                  }
              </div>
            </section>}

         
          {user && products.length === 0 && (
            <div className="max-w-2xl mx-auto px-4 pb-20 text-center mt-16">
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
                <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products yet
                </h3>
                <p className="text-gray-600">
                  Add your first product above to start tracking prices!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}