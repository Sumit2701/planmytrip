import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Trip Plan Wizard",
  description: "Plan your next trip with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased flex flex-col min-h-screen w-full`}>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
