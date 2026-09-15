"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { ExamQuiz } from "../components/ExamQuiz";
import { ShapeDetective } from "../components/ShapeDetective";
import { SpellingBee } from "../components/SpellingBee";
import { UNIT_1_STATES, UNIT_2_STATES, ALL_50_STATES } from "../data/statesData";
import { BookOpen } from "lucide-react";

export default function Home() {
  const [currentMode, setMode] = useState<"exam" | "shape" | "spelling">("exam");
  const [activeUnit, setActiveUnit] = useState<"unit1" | "unit2" | "all">("unit2");
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const activeDataset = activeUnit === "unit1" ? UNIT_1_STATES : activeUnit === "unit2" ? UNIT_2_STATES : ALL_50_STATES;

  const handleSuccess = () => {
    setScore((prev) => prev + 10);
    setStreak((prev) => prev + 1);
  };

  const handleFailure = () => {
    setStreak(0);
  };

  return (
    <main className="min-h-screen pb-16 flex flex-col items-center justify-between">
      <div className="w-full">
        <Header
          currentMode={currentMode}
          setMode={setMode}
          activeUnit={activeUnit}
          setActiveUnit={setActiveUnit}
          score={score}
          streak={streak}
        />

        <div className="px-4 py-2">
          {currentMode === "exam" && (
            <ExamQuiz dataset={activeDataset} onSuccess={handleSuccess} onFailure={handleFailure} />
          )}

          {currentMode === "shape" && (
            <ShapeDetective dataset={activeDataset} onSuccess={handleSuccess} onFailure={handleFailure} />
          )}

          {currentMode === "spelling" && (
            <SpellingBee dataset={activeDataset} onSuccess={handleSuccess} onFailure={handleFailure} />
          )}
        </div>
      </div>

      {/* Encouraging Footer */}
      <footer className="mt-12 text-center text-xs md:text-sm text-gray-500 max-w-xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <BookOpen className="w-4 h-4 text-brand-purple" />
          <span className="font-bold text-gray-700">
            {activeUnit === "unit1" ? "Unit 1: 23 Eastern & Southern States" : activeUnit === "unit2" ? "Unit 2: 27 Midwest, West & Non-Contiguous States" : "All 50 US States Master Exam"}
          </span>
        </div>
        <p>
          Mastering US geography & spelling for 5th-grade learners! 🚀
        </p>
      </footer>
    </main>
  );
}
