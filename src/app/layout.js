import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "BRO UNIVERSITY | Race Up Your Brain | Next-Gen Deep-Tech University",
  description: "India's next-generation deep-tech university focused on Neuroscience, Artificial Intelligence, Semiconductors, and Future Innovation. Race up your brain.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Custom Font: FSP DEMO - PODIUM Sharp 4.11 */}
        <link href="https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11" rel="stylesheet" type="text/css"/>
      </head>
      <body className="light-theme" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
