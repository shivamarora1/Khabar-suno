"use client";
import React from "react";
import { AppBarComponent } from "./AppBar/AppBar";
import { Navigation } from "./Navigation/Navigation";
import { useRouter } from "next/navigation";
import { AudioPopupComponent } from "./AudioPopup/AudioPopup";

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
  const [audioDiagVisible, setAudioDiagVisible] = React.useState(false);
  const toggleAudioDialog = () => {
    setAudioDiagVisible(!audioDiagVisible);
  };

  return (
    <>
      <AppBarComponent
        languageChangeCallback={handleLanguageChange}
        menuClickCallback={handleMenuClick}
        toggleAudioDialog={toggleAudioDialog}
      />
      {audioDiagVisible && (
        <AudioPopupComponent language="en" toggleDialog={toggleAudioDialog} />
      )}
      <Navigation
        language={language}
        menuClickCallback={handleMenuClick}
        expanded={expanded}
      >
        {children}
      </Navigation>
    </>
  );
}
