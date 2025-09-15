"use client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface EmailFormProps {
  onSuccessPageChange?: (isSuccessPage: boolean) => void;
}

export default function EmailForm({ onSuccessPageChange }: EmailFormProps = {}) {
  const [email, setEmail] = useState<string>();
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [otherGoalText, setOtherGoalText] = useState<string>("");

  const fitnessGoals = [
    "Body Positivity",
    "Confidence Building", 
    "Weight Loss",
    "Muscle Gain",
    "Strength Training",
    "Cardio Fitness",
    "Flexibility & Mobility",
    "Sports Performance",
    "General Health",
    "Body Recomposition",
    "Endurance Training",
    "Mental Wellness",
    "Community Support",
    "Habit Building",
    "Rehabilitation",
    "Maintenance",
    "Other"
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
    
    // Clear other goal text if "Other" is deselected
    if (goal === "Other" && selectedGoals.includes("Other")) {
      setOtherGoalText("");
    }
  };

  const handleSuccessSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/submit-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          firstName, 
          lastName, 
          goals: selectedGoals,
          otherGoalText: selectedGoals.includes("Other") ? otherGoalText : ""
        }),
      });

      if (response.ok) {
        toast.success("Thanks for the details! We'll be in touch soon! 🎉");
      } else {
        toast.error("Oops! Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong!");
    }
  };

  const handleJoinAnother = () => {
    setShowSuccessPage(false);
    setEmail("");
    setFirstName("");
    setLastName("");
    setSelectedGoals([]);
    setOtherGoalText("");
    onSuccessPageChange?.(false);
  };

  const shootConfetti = () => {
    var scalar = 2;
    var hundred = confetti.shapeFromText({ text: '💯', scalar });

    var defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [hundred],
      scalar
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 30
      });

      confetti({
        ...defaults,
        particleCount: 5,
        flat: true
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ['circle']
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        toast.success("Thank you for joining our waitlist! 🚀");
        shootConfetti();
        setShowSuccessPage(true);
        onSuccessPageChange?.(true);
      } else {
        setEmail("");
        toast.error("Oops! Something went wrong!");
      }
    } catch (err) {
      setEmail("");
      console.error(err);
    }
  };
  if (showSuccessPage) {
    return (
      <div className="mt-2 max-w-lg">
        <div className="mb-6">
          <h1 className="font-bold tracking-tight text-zinc-900 text-4xl leading-tight md:text-6xl max-w-lg mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              You're in.
            </span>
          </h1>
          <p className="text-gray-600 mb-4">
            Get ready for less perfection, more progress. Leave the shamers and bad vibes behind - you're joining a community that rewards showing up, not perfection.
          </p>
        </div>


        <form onSubmit={handleSuccessSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Hi, what's your name?</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-10 rounded-lg border-2 border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-10 rounded-lg border-2 border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">What would you like to gain from the platform?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Help us learn why our users are here and what they want out of our platform
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {fitnessGoals.map((goal) => (
                <label key={goal} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGoals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
            
            {selectedGoals.includes("Other") && (
              <div className="mt-3">
                <input
                  type="text"
                  value={otherGoalText}
                  onChange={(e) => setOtherGoalText(e.target.value)}
                  className="w-full h-10 rounded-lg border-2 border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please specify"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 h-10 rounded-lg bg-[#000F2D] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-700"
            >
              Complete Setup
            </button>
            <button
              type="button"
              onClick={handleJoinAnother}
              className="flex-1 h-10 rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              Join with Another Email
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="POST" className="mt-2 max-w-sm">
        <div className="flex flex-col gap-2 lg:flex-row">
          <label className="sr-only" htmlFor="email-address">
            Email address
          </label>
          <input
            autoComplete="email"
            className="text-accent-500 block h-10 w-full focus:invalid:border-red-400 focus:invalid:text-red-500 focus:invalid:ring-red-500 appearance-none rounded-lg border-2 border-slate-300 px-4 py-2 placeholder-zinc-400 duration-200 focus:outline-none focus:ring-zinc-300 sm:text-sm"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            id="email-address"
            name="email"
            placeholder="johndoe@example.com"
            required
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className="flex h-10 shrink-0 items-center justify-center gap-1 rounded-lg bg-[#000F2D] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-700"
            type="submit"
          >
            <span>Join the waitlist</span>
          </button>
        </div>
      </form>

      <div className="flex items-start gap-2 text-gray-500">
        <InfoCircledIcon />
        <p className="text-xs -mt-[0.5] max-w-sm">
          Your journey's yours — your data stays safe. We'll just use it to share updates as Ora grows with you.
        </p>
      </div>
    </>
  );
}
