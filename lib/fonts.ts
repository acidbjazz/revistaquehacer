import { Open_Sans, Baskervville } from "next/font/google";

export const sans = Open_Sans({
  weight: ["300", "400", "500"] /* 400 , 500, 300*/,
  subsets: ["latin"],
  style: ["normal", "italic"] /* normal */,
  variable: "--sans",
});

export const serif = Baskervville({
  weight: ["400"] /* 400 */,
  subsets: ["latin"],
  style: ["italic"],
  variable: "--serif",
});
