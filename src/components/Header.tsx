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
    <header className="w-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink p-3 md:p-4 shadow-xl text-white rounded-b-3xl mb-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Logo / Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-white text-brand-purple p-2 rounded-2xl shadow-md">
            <Compass className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wide drop-shadow-sm flex items-center gap-1.5">
              US Geography Explorer
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </h1>
          </div>
        </div>

        {/* PROMINENT SEGMENTED UNIT SELECTOR */}
        <div className="flex items-center gap-1 p-1 bg-purple-950/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
          <button
            onClick={() => setActiveUnit("unit1")}
            className={`py-1.5 px-3 rounded-xl font-black text-xs md:text-sm transition ${
              activeUnit === "unit1"
                ? "bg-yellow-300 text-purple-950 shadow-md scale-105"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Unit 1 (23)
          </button>

          <button
            onClick={() => setActiveUnit("unit2")}
            className={`py-1.5 px-3 rounded-xl font-black text-xs md:text-sm transition ${
              activeUnit === "unit2"
                ? "bg-yellow-300 text-purple-950 shadow-md scale-105"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Unit 2 (27) ⭐
          </button>

          <button
            onClick={() => setActiveUnit("all")}
            className={`py-1.5 px-3 rounded-xl font-black text-xs md:text-sm transition ${
              activeUnit === "all"
                ? "bg-yellow-300 text-purple-950 shadow-md scale-105"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            All 50 🏆
          </button>
        </div>

        {/* Score & Streaks */}
        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/30 shadow-inner">
          <div className="flex items-center space-x-1">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="text-base font-bold">{score} pts</span>
          </div>
          <div className="h-5 w-px bg-white/30" />
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-bounce" />
            <span className="text-base font-bold">{streak} Streak!</span>
          </div>
        </div>
      </div>

      {/* Navigation Mode Tabs */}
      <div className="max-w-2xl mx-auto mt-3 grid grid-cols-3 gap-1.5 p-1 bg-black/20 backdrop-blur-md rounded-2xl">
        <button
          onClick={() => setMode("exam")}
          className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl font-bold transition-all text-xs md:text-sm ${
            currentMode === "exam"
              ? "bg-white text-brand-purple shadow-md scale-[1.02]"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Map Exam ⭐</span>
        </button>

        <button
          onClick={() => setMode("shape")}
          className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl font-bold transition-all text-xs md:text-sm ${
            currentMode === "shape"
              ? "bg-white text-brand-purple shadow-md scale-[1.02]"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Shape Flashcards</span>
        </button>

        <button
          onClick={() => setMode("spelling")}
          className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl font-bold transition-all text-xs md:text-sm ${
            currentMode === "spelling"
              ? "bg-white text-brand-purple shadow-md scale-[1.02]"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <SpellCheck className="w-4 h-4" />
          <span>Spelling Practice</span>
        </button>
      </div>
    </header>
  );
};
