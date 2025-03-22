"use client";
import React from "react";
import { AppBarComponent } from "./AppBar/AppBar";
import { Navigation } from "./Navigation/Navigation";

export default function MainContainerComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [expanded, setExpanded] = React.useState(false);
  const handleMenuClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <AppBarComponent menuClickCallback={handleMenuClick} />
      <Navigation expanded={expanded}>{children}</Navigation>
    </>
  );
}
