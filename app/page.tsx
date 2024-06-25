"use client";
import Slot from "../components/Slot";
import { IoLogoGithub } from "react-icons/io";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  p-24">
      <span className="absolute top-5 right-10 text-2xl">
        <a href="https://github.com/elinoza/slot-machine" target="_blank">
          <IoLogoGithub />
        </a>
      </span>
      <Slot />
    </main>
  );
}
