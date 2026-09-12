"use client";

import React, { useState, useEffect } from "react";
import { StateInfo, UNIT_1_STATES } from "../data/statesData";
import { Lightbulb, CheckCircle2, XCircle, ArrowRight, RefreshCw, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface ShapeDetectiveProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const ShapeDetective: React.FC<ShapeDetectiveProps> = ({ onSuccess, onFailure }) => {
  const [currentState, setCurrentState] = useState<StateInfo>(UNIT_1_STATES[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const loadNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * UNIT_1_STATES.length);
    const target = UNIT_1_STATES[randomIndex];
    setCurrentState(target);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);

    // Pick 3 wrong options from the dataset
    const wrongOptions = UNIT_1_STATES.filter((s) => s.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((s) => s.name);

    const allOptions = [...wrongOptions, target.name].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleSelectOption = (option: string) => {
    if (selectedAnswer !== null) return; // Prevent double clicking
    setSelectedAnswer(option);

    if (option === currentState.name) {
      setIsCorrect(true);
      onSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setIsCorrect(false);
      onFailure();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-brand-purple/20 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-xs md:text-sm font-bold uppercase tracking-wider bg-purple-100 text-brand-purple px-3 py-1 rounded-full">
          Mode 1: Shape Detective
        </span>
        <button
          onClick={loadNewQuestion}
          className="flex items-center space-x-1 text-sm font-bold text-gray-500 hover:text-brand-purple transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Skip / Next</span>
        </button>
      </div>

      <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 text-center mb-2">
        Which US state has this shape?
      </h2>

      {/* SVG Silhouette Display Box */}
      <div className="w-64 h-64 my-4 p-4 bg-gradient-to-b from-sky-50 to-indigo-50 border-2 border-indigo-100 rounded-3xl flex items-center justify-center shadow-inner relative group">
        <svg
          viewBox={currentState.viewBox}
          className="w-full h-full filter drop-shadow-md transition-all duration-300 transform group-hover:scale-105"
        >
          <path
            d={currentState.path}
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Hint Section */}
      <div className="w-full mb-6 text-center">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-yellow-600 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-full border border-yellow-200 transition"
          >
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span>Need a Hint?</span>
          </button>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-2xl text-xs md:text-sm font-medium animate-fadeIn">
            💡 <strong>Hint:</strong> Located in the <strong>{currentState.region}</strong> region! Starts with letter &quot;{currentState.name[0]}&quot;.
          </div>
        )}
      </div>

      {/* Multiple Choice Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mb-6">
        {options.map((option, idx) => {
          let btnStyle = "bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-brand-purple hover:bg-purple-50";

          if (selectedAnswer !== null) {
            if (option === currentState.name) {
              btnStyle = "bg-green-500 border-2 border-green-600 text-white font-bold scale-[1.02]";
            } else if (option === selectedAnswer) {
              btnStyle = "bg-red-500 border-2 border-red-600 text-white font-bold";
            } else {
              btnStyle = "bg-gray-100 border-2 border-gray-200 text-gray-400 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedAnswer !== null}
              onClick={() => handleSelectOption(option)}
              className={`p-4 rounded-2xl text-base md:text-lg font-bold transition-all duration-200 flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {selectedAnswer !== null && option === currentState.name && (
                <CheckCircle2 className="w-6 h-6 text-white" />
              )}
              {selectedAnswer !== null && option === selectedAnswer && option !== currentState.name && (
                <XCircle className="w-6 h-6 text-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Result Card & Next Button */}
      {selectedAnswer !== null && (
        <div className="w-full flex flex-col items-center bg-gray-50 p-4 rounded-2xl border border-gray-200 animate-slideUp">
          {isCorrect ? (
            <div className="text-center mb-3">
              <span className="text-green-600 font-extrabold text-lg flex items-center justify-center gap-1">
                🎉 Awesome Job! That is {currentState.name}!
              </span>
              <p className="text-xs md:text-sm text-gray-600 mt-1 italic">
                &ldquo;{currentState.funFact}&rdquo;
              </p>
            </div>
          ) : (
            <div className="text-center mb-3">
              <span className="text-red-500 font-extrabold text-lg flex items-center justify-center gap-1">
                Nice try! The correct answer is {currentState.name}.
              </span>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Keep going, you&apos;ll get it next time!
              </p>
            </div>
          )}

          <button
            onClick={loadNewQuestion}
            className="w-full max-w-xs bg-brand-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition transform hover:scale-105"
          >
            <span>Next State</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
