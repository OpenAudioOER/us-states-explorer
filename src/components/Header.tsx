"use client";

import React from "react";
import { Star, Trophy, Sparkles, Map, SpellCheck, Compass, Volume2, Award } from "lucide-react";

interface HeaderProps {
  currentMode: "exam" | "shape" | "spelling";
  setMode: (mode: "exam" | "shape" | "spelling") => void;
  activeUnit: "unit1" | "unit2" | "all";
  setActiveUnit: (unit: "unit1" | "unit2" | "all") => void;
  score: number;
  streak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  setMode,
  activeUnit,
  setActiveUnit,
  score,
  streak,
}) => {
  return (
    <header className="w-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink p-3 md:p-4 shadow-lg text-white rounded-b-2xl mb-3">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo / Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-white text-brand-purple p-2 rounded-xl shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
            <Compass className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wide drop-shadow-sm flex items-center gap-1.5">
              US Geography Explorer
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </h1>
            <p className="text-[11px] md:text-xs font-medium text-purple-100">
              5th Grade Geography & Spelling Master
            </p>
          </div>
        </div>

        {/* Score & Streaks */}
        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30 shadow-inner">
          <div className="flex items-center space-x-1.5">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="text-base font-bold">{score} pts</span>
          </div>
          <div className="h-5 w-px bg-white/30" />
          <div className="flex items-center space-x-1.5">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-bounce" />
            <span className="text-base font-bold">{streak} Streak!</span>
          </div>
        </div>
      </div>

      {/* PROMINENT UNIT SELECTOR SEGMENTED CONTROL BAR */}
      <div className="max-w-3xl mx-auto mt-3 flex flex-col items-center">
        <span className="text-[11px] font-black uppercase tracking-widest text-purple-200 mb-1 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-yellow-300" /> Select Active Study Unit:
        </span>
        <div className="w-full grid grid-cols-3 gap-1.5 p-1.5 bg-purple-950/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-inner">
          <button
            onClick={() => setActiveUnit("unit1")}
            className={`py-2.5 px-3 rounded-xl font-black text-xs md:text-sm transition-all duration-200 flex flex-col md:flex-row items-center justify-center gap-1.5 ${
              activeUnit === "unit1"
                ? "bg-yellow-300 text-purple-950 shadow-lg scale-[1.02]"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>Unit 1</span>
            <span className="text-[10px] md:text-xs font-semibold opacity-90">(23 States)</span>
          </button>

          <button
            onClick={() => setActiveUnit("unit2")}
            className={`py-2.5 px-3 rounded-xl font-black text-xs md:text-sm transition-all duration-200 flex flex-col md:flex-row items-center justify-center gap-1.5 ${
              activeUnit === "unit2"
                ? "bg-yellow-300 text-purple-950 shadow-lg scale-[1.02]"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>Unit 2 ⭐</span>
            <span className="text-[10px] md:text-xs font-semibold opacity-90">(27 States)</span>
          </button>

          <button
            onClick={() => setActiveUnit("all")}
            className={`py-2.5 px-3 rounded-xl font-black text-xs md:text-sm transition-all duration-200 flex flex-col md:flex-row items-center justify-center gap-1.5 ${
              activeUnit === "all"
                ? "bg-yellow-300 text-purple-950 shadow-lg scale-[1.02]"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>All States 🏆</span>
            <span className="text-[10px] md:text-xs font-semibold opacity-90">(50 States)</span>
          </button>
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
