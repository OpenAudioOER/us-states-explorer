"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { ExamQuiz } from "../components/ExamQuiz";
import { ShapeDetective } from "../components/ShapeDetective";
import { SpellingBee } from "../components/SpellingBee";
import { BookOpen } from "lucide-react";

export default function Home() {
  const [currentMode, setMode] = useState<"exam" | "shape" | "spelling">("exam");
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

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
          score={score}
          streak={streak}
        />

        <div className="px-4 py-2">
          {currentMode === "exam" && (
            <ExamQuiz onSuccess={handleSuccess} onFailure={handleFailure} />
          )}

          {currentMode === "shape" && (
            <ShapeDetective onSuccess={handleSuccess} onFailure={handleFailure} />
          )}

          {currentMode === "spelling" && (
            <SpellingBee onSuccess={handleSuccess} onFailure={handleFailure} />
          )}
        </div>
      </div>

      {/* Encouraging Footer */}
      <footer className="mt-12 text-center text-xs md:text-sm text-gray-500 max-w-xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <BookOpen className="w-4 h-4 text-brand-purple" />
          <span className="font-bold text-gray-700">Unit 1 Map Geography Exam</span>
        </div>
        <p>
          Mastering 23 East Coast & Southern States. Built for 5th grade learners! 🚀
        </p>
      </footer>
    </main>
  );
}
