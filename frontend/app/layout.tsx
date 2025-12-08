import type React from "react";
import type{Metadata} from "next";
import {Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk=Space_Grotesk({subsets:["latin"]})

export const metadata:Metadata={
  title:"Digital Life Commander | AI Agents for Your Digital Life",
  description:
  "Command your digital life with AI agents that automate emails, tasks, calender, and developer workflows.",

};

export default function RootLayout({
  children,

}:{
  children:React.ReactNode;
}){
  return(
    <html lang="en" className="scroll-smooth">\
    <body className={`${spaceGrotesk.className} antialiased`}>
      {children}
    </body>
    </html>
  );
}