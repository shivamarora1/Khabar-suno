"use client";
import React from "react";
import { AppBarComponent } from "./AppBar/AppBar";
import { Navigation } from "./Navigation/Navigation";
import { useRouter } from "next/navigation";

export default function MainContainerComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const handleMenuClick = () => {
    setExpanded(!expanded);
  };
  const [language, setlanguage] = React.useState("en");
  const handleLanguageChange = (lang: string) => {
    setlanguage(lang);
    router.push(`/${lang}/national`);
  };

  return (
    <>
      <AppBarComponent
        languageChangeCallback={handleLanguageChange}
        menuClickCallback={handleMenuClick}
      />
      <Navigation language={language} menuClickCallback={handleMenuClick} expanded={expanded}>
        {children}
      </Navigation>
    </>
  );
}
