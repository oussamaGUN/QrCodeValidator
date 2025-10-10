import { Poppins } from 'next/font/google';
import { Orbitron } from "next/font/google";

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});
export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"], // choose what you actually use
});