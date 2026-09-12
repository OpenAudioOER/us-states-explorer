"use client";

import React, { useState, useEffect, useRef } from "react";
import { StateInfo, UNIT_1_STATES } from "../data/statesData";
import { RefreshCw, CheckCircle2, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface SpellingBeeProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const SpellingBee: React.FC<SpellingBeeProps> = ({ onSuccess, onFailure }) => {
  const [currentState, setCurrentState] = useState<StateInfo>(UNIT_1_STATES[0]);
  const [inputs, setInputs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const loadNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * UNIT_1_STATES.length);
    const target = UNIT_1_STATES[randomIndex];
    setCurrentState(target);
    setInputs(new Array(target.name.length).fill(""));
    setIsCompleted(false);
    setIsCorrect(null);
    setShowHint(false);
    
    // Reset focus to first letter
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
      }
    }, 100);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleInputChange = (index: number, val: string) => {
    if (isCompleted) return;

    // Handle space characters automatically in multi-word states (e.g., New York, North Carolina)
    const upperVal = val.toUpperCase().slice(-1); // Take last typed char
    const newInputs = [...inputs];
    newInputs[index] = upperVal;
    setInputs(newInputs);

    // Auto-advance cursor if letter entered
    if (upperVal !== "" && index < currentState.name.length - 1) {
      // If the next character in target state name is a space, skip it or pre-fill it!
      const nextChar = currentState.name[index + 1];
      if (nextChar === " ") {
        newInputs[index + 1] = " ";
        setInputs(newInputs);
        inputRefs.current[index + 2]?.focus();
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    }

    // Check if user filled all boxes
    const filledCount = newInputs.filter((char, idx) => {
      return currentState.name[idx] === " " || char !== "";
    }).length;

    if (filledCount === currentState.name.length) {
      const userSpelling = newInputs.join("").trim().toLowerCase();
      const targetSpelling = currentState.name.toLowerCase();

      setIsCompleted(true);
      if (userSpelling === targetSpelling) {
        setIsCorrect(true);
        onSuccess();
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      } else {
        setIsCorrect(false);
        onFailure();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputs[index] === "" && index > 0) {
      // Move backwards on backspace
      if (currentState.name[index - 1] === " " && index - 2 >= 0) {
        inputRefs.current[index - 2]?.focus();
      } else {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-brand-purple/20 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-xs md:text-sm font-bold uppercase tracking-wider bg-pink-100 text-brand-pink px-3 py-1 rounded-full">
          Mode 2: State Spelling Bee
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
        Spell the name of this state!
      </h2>

      {/* SVG Shape Preview */}
      <div className="w-48 h-48 my-3 p-3 bg-gradient-to-b from-purple-50 to-pink-50 border-2 border-pink-100 rounded-3xl flex items-center justify-center shadow-inner">
        <svg viewBox={currentState.viewBox} className="w-full h-full filter drop-shadow-md">
          <path
            d={currentState.path}
            fill="#EC4899"
            stroke="#BE185D"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Hint Button */}
      <div className="w-full mb-6 text-center">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-yellow-600 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-full border border-yellow-200 transition"
          >
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span>Need a Hint? ({currentState.name.length} letters)</span>
          </button>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-2xl text-xs md:text-sm font-medium animate-fadeIn">
            💡 <strong>Hint:</strong> Region: <strong>{currentState.region}</strong> | Starts with letter <strong>&quot;{currentState.name[0]}&quot;</strong> | Ends with letter <strong>&quot;{currentState.name[currentState.name.length - 1]}&quot;</strong>.
          </div>
        )}
      </div>

      {/* Interactive Letter Slots Box */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-full my-4">
        {currentState.name.split("").map((targetChar, idx) => {
          if (targetChar === " ") {
            return (
              <div key={idx} className="w-4 md:w-6 h-12 flex items-center justify-center">
                <span className="text-gray-300 font-bold">•</span>
              </div>
            );
          }

          let boxBorder = "border-2 border-brand-purple/40 bg-purple-50 text-purple-900";
          if (isCompleted) {
            const userChar = (inputs[idx] || "").toLowerCase();
            const correctChar = targetChar.toLowerCase();
            if (userChar === correctChar) {
              boxBorder = "border-2 border-green-500 bg-green-100 text-green-900 font-bold scale-105";
            } else {
              boxBorder = "border-2 border-red-500 bg-red-100 text-red-900 font-bold animate-shake";
            }
          }

          return (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              maxLength={1}
              value={inputs[idx] || ""}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={isCompleted}
              className={`w-10 h-12 md:w-12 md:h-14 rounded-2xl text-xl md:text-2xl font-black text-center shadow-md focus:outline-none focus:ring-4 focus:ring-brand-purple/30 uppercase transition-all ${boxBorder}`}
            />
          );
        })}
      </div>

      {/* Verification Feedback */}
      {isCompleted && (
        <div className="w-full flex flex-col items-center bg-gray-50 p-4 rounded-2xl border border-gray-200 mt-4 animate-slideUp">
          {isCorrect ? (
            <div className="text-center mb-3">
              <span className="text-green-600 font-extrabold text-lg flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Perfect Spelling! {currentState.name}!
              </span>
              <p className="text-xs md:text-sm text-gray-600 mt-1 italic">
                &ldquo;{currentState.funFact}&rdquo;
              </p>
            </div>
          ) : (
            <div className="text-center mb-3">
              <span className="text-red-500 font-extrabold text-lg">
                Almost! The correct spelling is: {currentState.name}
              </span>
            </div>
          )}

          <button
            onClick={loadNewQuestion}
            className="w-full max-w-xs bg-brand-pink hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition transform hover:scale-105"
          >
            <span>Try Another State</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
