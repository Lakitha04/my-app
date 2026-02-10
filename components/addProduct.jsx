"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";
import AuthModal from "./AuthModel";
import { addProduct } from "@/app/actions";
import { toast } from "sonner";

const AddProduct = ({ user }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const[showAuthModal,setShowAuthModal]=useState(false)

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!user){
      setShowAuthModal(true)
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("url",url);

    const result = await addProduct(formData);
    if(result.error){
      toast.error(result.error);
      
    }else{
      toast.success(result.message || "Produact tracked successfully!");
      setUrl("");
    }
  };

  return (
    <>
    <form onSubmit={handlesubmit} className="w-full max-2-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter product URL to track"
          className="h-12 text-base"
          required
          disabled={loading}
        />
        <Button className="bg-blue-500 h-10 sm:h-12 px-8" >
          {loading ? (
          <>
          <Loader2 className="w-5 h-5 animate-spin mr-2"/>
           Adding
          </>
          ): (
          "Track Price"   
          
)}
        </Button>
      </div>
    </form>
    

  
   
     <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}  
          />
          </>
    
  );
};

export default AddProduct;
