"use client";

import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Slider() {
  const images = [
    { img: "/slider.jpg", link: "/#link" },
    { img: "/logo2.png", link: "/#logo" },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      next();
    }, 4000); // 4 segundos

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      className="relative w-full h-80 overflow-hidden "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <a href={images[index].link} className="block w-full h-full">
        <img
          src={images[index].img}
          alt=""
          className="w-full h-full object-cover"
        />
      </a>

      <div className="pointer-events-none absolute inset-0  flex items-center justify-between px-4">
        <button
          onClick={prev}
          className="pointer-events-auto bg-black/40 p-2 rounded-full hover:bg-black/60 transition  "
        >
          <CircleArrowLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={next}
          className="pointer-events-auto bg-black/40 p-2 rounded-full hover:bg-black/60 transition  "
        >
          <CircleArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
