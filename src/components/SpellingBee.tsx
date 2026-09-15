"use client";

import React, { useState, useEffect, useRef } from "react";
import { StateInfo } from "../data/statesData";
import { playStateAudio, playPositiveFeedbackAudio, playNegativeFeedbackAudio } from "../utils/audio";
import { RefreshCw, ArrowRight, Lightbulb, Sparkles, PenTool, Grid } from "lucide-react";
import confetti from "canvas-confetti";

interface SpellingBeeProps {
  dataset: StateInfo[];
  onSuccess: () => void;
  onFailure: () => void;
}

export const SpellingBee: React.FC<SpellingBeeProps> = ({ dataset, onSuccess, onFailure }) => {
  const [currentState, setCurrentState] = useState<StateInfo>(dataset[0]);
  const [inputs, setInputs] = useState<string[]>([]);
  const [blankInputVal, setBlankInputVal] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  
  // Format mode: "guided" (per-letter boxes) vs "master" (blank single box with NO length clues)
  const [formatMode, setFormatMode] = useState<"guided" | "master">("guided");
  const [autoRandomFormat, setAutoRandomFormat] = useState(true);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const masterInputRef = useRef<HTMLInputElement | null>(null);

  const loadNewQuestion = () => {
    if (!dataset || dataset.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dataset.length);
    const target = dataset[randomIndex];
    setCurrentState(target);
    setInputs(new Array(target.name.length).fill(""));
    setBlankInputVal("");
    setIsCompleted(false);
    setIsCorrect(null);
    setShowHint(false);

    // If auto random, pick 50/50 guided or master format
    let nextFormat = formatMode;
    if (autoRandomFormat) {
      nextFormat = Math.random() > 0.4 ? "master" : "guided";
      setFormatMode(nextFormat);
    }

    setTimeout(() => {
      if (nextFormat === "guided") {
        inputRefs.current[0]?.focus();
      } else {
        masterInputRef.current?.focus();
      }
    }, 150);
  };

  useEffect(() => {
    loadNewQuestion();
  }, [dataset]);

  const handleInputChange = (index: number, val: string) => {
    if (isCompleted) return;

    const upperVal = val.toUpperCase().slice(-1);
    const newInputs = [...inputs];
    newInputs[index] = upperVal;
    setInputs(newInputs);

    if (upperVal !== "" && index < currentState.name.length - 1) {
      const nextChar = currentState.name[index + 1];
      if (nextChar === " ") {
        newInputs[index + 1] = " ";
        setInputs(newInputs);
        inputRefs.current[index + 2]?.focus();
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    }

    const filledCount = newInputs.filter((char, idx) => {
      return currentState.name[idx] === " " || char !== "";
    }).length;

    if (filledCount === currentState.name.length) {
      evaluateSpelling(newInputs.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputs[index] === "" && index > 0) {
      if (currentState.name[index - 1] === " " && index - 2 >= 0) {
        inputRefs.current[index - 2]?.focus();
      } else {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const evaluateSpelling = (userText: string) => {
    const userSpelling = userText.trim().toLowerCase();
    const targetSpelling = currentState.name.toLowerCase();

    setIsCompleted(true);
    if (userSpelling === targetSpelling) {
      setIsCorrect(true);
      playPositiveFeedbackAudio();
      onSuccess();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      setIsCorrect(false);
      playNegativeFeedbackAudio();
      onFailure();
    }
  };

  const handleMasterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted || !blankInputVal.trim()) return;
    evaluateSpelling(blankInputVal);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-brand-purple/20 flex flex-col items-center">
      {/* Mode Bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider bg-pink-100 text-brand-pink px-3 py-1 rounded-full">
            Spelling Practice ({dataset.length} States)
          </span>

          {/* Style Toggle */}
          <button
            onClick={() => {
              setAutoRandomFormat(false);
              setFormatMode((prev) => (prev === "guided" ? "master" : "guided"));
            }}
            className="flex items-center space-x-1 text-xs font-bold text-purple-900 bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-full border border-purple-200 transition"
          >
            {formatMode === "guided" ? (
              <>
                <Grid className="w-3.5 h-3.5 text-purple-600" />
                <span>Mode: Guided Slots</span>
              </>
            ) : (
              <>
                <PenTool className="w-3.5 h-3.5 text-pink-600" />
                <span>Mode: Master Speller (Blank Box)</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={loadNewQuestion}
          className="flex items-center space-x-1 text-sm font-bold text-gray-500 hover:text-brand-purple transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Skip / Next</span>
        </button>
      </div>

      <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 text-center mb-1">
        {formatMode === "guided" ? "Spell the name of this state!" : "✍️ Master Speller Challenge!"}
      </h2>
      <p className="text-xs md:text-sm text-gray-500 font-medium mb-3">
        {formatMode === "guided"
          ? "Fill each letter box below."
          : "Type the full name into the blank box (No letter length clues!)."}
      </p>

      {/* SVG Shape Preview */}
      <div className="w-48 h-48 my-2 p-3 bg-gradient-to-b from-purple-50 to-pink-50 border-2 border-pink-100 rounded-3xl flex items-center justify-center shadow-inner relative">
        <svg viewBox={currentState.viewBox} className="w-full h-full filter drop-shadow-md">
          <path
            d={currentState.path}
            fill="#EC4899"
            stroke="#BE185D"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <button
          onClick={() => playStateAudio(currentState.name)}
          className="absolute bottom-2 right-2 bg-white/90 text-brand-purple p-2 rounded-full shadow hover:bg-white transition"
          title="Listen to state name"
        >
          <RefreshCw className="w-4 h-4 hidden" />
          🔊
        </button>
      </div>

      {/* Hint Button */}
      <div className="w-full mb-4 text-center">
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
            💡 <strong>Hint:</strong> Region: <strong>{currentState.region}</strong> | Capital: <strong>{currentState.capital}</strong> | Starts with letter <strong>&quot;{currentState.name[0]}&quot;</strong>.
          </div>
        )}
      </div>

      {/* Mode 1: Interactive Guided Letter Slots */}
      {formatMode === "guided" ? (
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
      ) : (
        /* Mode 2: Master Speller Blank Input Box (No Length Clues) */
        <form onSubmit={handleMasterSubmit} className="w-full max-w-md my-4 flex flex-col items-center gap-3">
          <input
            ref={masterInputRef}
            type="text"
            value={blankInputVal}
            onChange={(e) => setBlankInputVal(e.target.value)}
            disabled={isCompleted}
            placeholder="Type state name here..."
            className={`w-full px-5 py-3.5 rounded-2xl border-4 text-xl font-black text-center shadow-inner uppercase placeholder:normal-case placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-4 ${
              isCompleted
                ? isCorrect
                  ? "border-green-500 bg-green-50 text-green-900"
                  : "border-red-500 bg-red-50 text-red-900 animate-shake"
                : "border-purple-300 bg-purple-50 text-purple-950 focus:ring-purple-300"
            }`}
            autoFocus
          />
          {!isCompleted && (
            <button
              type="submit"
              disabled={!blankInputVal.trim()}
              className="w-full bg-gradient-to-r from-brand-pink to-brand-purple hover:opacity-90 disabled:opacity-50 text-white font-black py-3 px-6 rounded-2xl shadow-lg transition transform active:scale-95 text-base md:text-lg"
            >
              Submit Spelling ✓
            </button>
          )}
        </form>
      )}

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
                Nice try! The correct spelling is: {currentState.name}
              </span>
            </div>
          )}

          <button
            onClick={loadNewQuestion}
            className="w-full max-w-xs bg-brand-pink hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition transform hover:scale-105"
          >
            <span>Next State</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
