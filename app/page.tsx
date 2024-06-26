"use client";
import Slot from "../components/Slot";
import { IoLogoGithub } from "react-icons/io";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 md:px-24">
      <span className="absolute top-10 right-16 text-2xl">
        <a href="https://github.com/elinoza/slot-machine" target="_blank">
          <IoLogoGithub />
        </a>
      </span>
      <Slot />
    </main>
  );
}
