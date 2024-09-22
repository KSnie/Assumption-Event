"use client";
import React, { useState, useEffect } from 'react';

const slides = [
  "/Banner.png",
  "/Banner.png",
  "/Banner.png",
  "/Banner.png",
  "/Banner.png"
];

export default function Announcement() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 3000 milliseconds = 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-auto mr-8 mt-5">
      <div className="relative h-44 overflow-hidden rounded-lg md:h-64">
        <div
          className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides?.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
            >
              <img
                src={slide}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute z-30 flex justify-center bottom-5 left-1/2 transform -translate-x-1/2 space-x-3">
        {slides?.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-slate-600' : 'bg-gray-300'}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-slate-50">
          <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50/30 group-hover:bg-slate-50/50 group-focus:ring-4 group-focus:ring-slate-50">
          <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
