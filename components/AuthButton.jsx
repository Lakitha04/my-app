"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import AuthModal from "./AuthModel";
import { signOut } from "@/app/actions";


const AuthButton = ({user}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if(user){
    return (
      <form action={signOut} >
        <Button variant="ghost" size="sm" type="submit" className="gap-2">
          <LogOut className="w-4 h-4"/>
          SignOut
        </Button>
      </form>
    )
  }

  return (
    <div>
      <Button
        onClick={() => setShowAuthModal(true)}   
        variant="default"
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 gap-2"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}  
      />
    </div>
  );
};

export default AuthButton;
