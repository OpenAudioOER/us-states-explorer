"use client";

import React from "react";
import { Star, Trophy, Sparkles, Map, SpellCheck, Compass, Volume2, Award } from "lucide-react";

interface HeaderProps {
  currentMode: "exam" | "shape" | "spelling";
  setMode: (mode: "exam" | "shape" | "spelling") => void;
  score: number;
  streak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  setMode,
  score,
  streak,
}) => {
  return (
    <header className="w-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink p-4 shadow-lg text-white rounded-b-3xl mb-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-white text-brand-purple p-2.5 rounded-2xl shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
            <Compass className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-sm flex items-center gap-2">
              US Geography Explorer
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </h1>
            <p className="text-xs md:text-sm font-medium text-purple-100 flex items-center gap-2">
              <span className="bg-yellow-400 text-purple-950 font-bold px-2 py-0.5 rounded-full text-xs">
                Unit 1
              </span>
              23 Eastern & Southern States
            </p>
          </div>
        </div>

        {/* Score & Streaks */}
        <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 shadow-inner">
          <div className="flex items-center space-x-1.5">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <span className="text-lg font-bold">{score} pts</span>
          </div>
          <div className="h-6 w-px bg-white/30" />
          <div className="flex items-center space-x-1.5">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-bounce" />
            <span className="text-lg font-bold">{streak} Streak!</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-3xl mx-auto mt-4 grid grid-cols-3 gap-2 p-1 bg-black/20 backdrop-blur-md rounded-2xl">
        <button
          onClick={() => setMode("exam")}
          className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl font-bold transition-all text-sm md:text-base ${
            currentMode === "exam"
              ? "bg-white text-brand-purple shadow-md scale-[1.02]"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Map className="w-5 h-5" />
          <span>Map Exam Mode ⭐</span>
        </button>

        <button
          onClick={() => setMode("shape")}
          className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl font-bold transition-all text-sm md:text-base ${
            currentMode === "shape"
              ? "bg-white text-brand-purple shadow-md scale-[1.02]"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Shape Flashcards</span>
        </button>

        <button
          onClick={() => setMode("spelling")}
          className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl font-bold transition-all text-sm md:text-base ${
            currentMode === "spelling"
              ? "bg-white text-brand-purple shadow-md scale-[1.02]"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <SpellCheck className="w-5 h-5" />
          <span>Spelling Practice</span>
        </button>
      </div>
    </header>
  );
};
