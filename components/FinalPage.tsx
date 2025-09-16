"use client";

import { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface FinalPageProps {
  onJoinAnother: () => void;
}

export default function FinalPage({ onJoinAnother }: FinalPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "When will Your Ora be available?",
      answer: "We're working hard to bring you the best experience possible. We'll be launching in Q2 2024 with early access for our waitlist members. You'll be the first to know!"
    },
    {
      question: "What makes Your Ora different?",
      answer: "Unlike other fitness apps that focus on perfection, Your Ora celebrates progress. We believe in showing up consistently rather than being perfect. Our community supports each other through real journeys, not just highlight reels."
    },
    {
      question: "Is there a cost to join?",
      answer: "Joining the waitlist is completely free! We'll announce pricing details closer to launch, but we're committed to making Your Ora accessible to everyone who wants to start their fitness journey."
    },
    {
      question: "What if I'm a complete beginner?",
      answer: "Perfect! Your Ora is designed for everyone, especially beginners. We provide gentle guidance, celebrate small wins, and connect you with a supportive community that understands that everyone starts somewhere."
    },
    {
      question: "How do I get early access?",
      answer: "You're already on the list! We'll send you an exclusive early access link as soon as we're ready. Make sure to check your email regularly and add us to your contacts so you don't miss out."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="mt-2 max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <h1 className="font-bold tracking-tight text-zinc-900 text-4xl leading-tight md:text-6xl max-w-lg mx-auto mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            You're All Set! 🎉
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Welcome to the Your Ora community! You're now part of a movement that celebrates progress over perfection. 
          Get ready to transform your fitness journey with a supportive community that believes in showing up, not being perfect.
        </p>
      </div>

      {/* Engaging Content Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Why Your Ora is Different
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">Progress Over Perfection</h3>
                  <p className="text-gray-600 text-sm">Celebrate every small win and consistent effort, not just perfect results.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">Real Community</h3>
                  <p className="text-gray-600 text-sm">Connect with people on similar journeys who understand the real struggles.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">Gentle Guidance</h3>
                  <p className="text-gray-600 text-sm">No shame, no judgment - just supportive guidance for your unique journey.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <DotLottieReact
                src="https://lottie.host/351d0bb0-f160-40c7-84df-cd9b7c1d0340/ugOB1RGfak.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-zinc-900">{faq.question}</span>
                <span className={`text-gray-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-zinc-900 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Follow us on social media for daily motivation, community updates, and sneak peeks of what's coming. 
          We're building something special, and we want you to be part of the journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onJoinAnother}
            className="px-6 py-3 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Join with Another Email
          </button>
          <a
            href="https://twitter.com/yourora"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-zinc-900 transition-colors"
          >
            Follow Us on Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
