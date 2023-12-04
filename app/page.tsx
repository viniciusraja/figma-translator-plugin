"use client";
import { figmaAPI } from "@/lib/figmaAPI";
import TranslatorDashboard from "./components/TranslatorDashboard";
import { useEffect } from "react";

export default function Plugin() {
  useEffect(() => {
    figmaAPI.run(async (figma) => {
      figma.notify(
        "Please select a layer with text in it to generate a poem.",
        { error: true }
      );
    });
  }, []);
  figmaAPI.run(async (figma) => {
    figma.notify("Please select a layer with text in it to generate a poem.", {
      error: true,
    });
  });
  return <TranslatorDashboard />;
}
