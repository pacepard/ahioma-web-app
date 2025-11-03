import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahiaoma - shop locally made goof=d and services",
  description: "made for your household",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
