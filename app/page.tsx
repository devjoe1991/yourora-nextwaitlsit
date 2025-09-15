"use client";

import React, { useState } from 'react';
import EmailForm from "@/components/EmailFom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [isSuccessPage, setIsSuccessPage] = useState(false);
  return (
    <>
      <Toaster />

      <section className="w-screen h-dvh grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-6">
        <div className="md:h-full h-80 bg-[#C9F9D1] relative overflow-hidden flex items-center justify-center p-4">
          <div className="w-full h-full max-w-sm md:max-w-none flex items-center justify-center">
            <DotLottieReact
              src={isSuccessPage 
                ? "https://lottie.host/351d0bb0-f160-40c7-84df-cd9b7c1d0340/ugOB1RGfak.lottie"
                : "https://lottie.host/30f8897e-b55b-4ba4-be1a-47330bd0570e/BEgcn5OlnM.lottie"
              }
              loop
              autoplay
              style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px' }}
            />
          </div>
        </div>

        <main className="flex flex-col gap-6 mt-4 justify-center px-6 pb-8">
          {!isSuccessPage && (
            <>
              <h1 className="font-bold tracking-tight text-zinc-900 text-4xl leading-tight md:text-6xl max-w-lg">
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  Your Ora
                </span>
              </h1>
              <p className="text-gray-500">
                Where your daily effort becomes someone else's inspiration. Share your journey, build unbreakable streaks, and watch your small actions create ripples of motivation across a community that believes in progress over perfection.
              </p>
            </>
          )}

          <EmailForm onSuccessPageChange={setIsSuccessPage} />
        </main>
      </section>
    </>
  );
}
