import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Ora - Join the Waitlist",
  description: "We're on a mission to build the social layer of everyday effort. Your Ora in YOUR pocket! Join the waitlist and turn every small win into a celebration.",
  keywords: "fitness, social media, habits, streaks, community, motivation, daily posts, accountability, progress, your ora",
  authors: [{ name: "Your Ora" }],
  openGraph: {
    title: "Your Ora - Join the Waitlist",
    description: "We're on a mission to build the social layer of everyday effort. Your Ora in YOUR pocket! Join the waitlist and turn every small win into a celebration.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Ora - Join the Waitlist",
    description: "We're on a mission to build the social layer of everyday effort. Your Ora in YOUR pocket! Join the waitlist and turn every small win into a celebration.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
