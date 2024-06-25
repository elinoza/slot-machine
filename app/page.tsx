"use client";
import Slot from "../components/Slot";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  p-24">
      <Slot />
    </main>
  );
}
