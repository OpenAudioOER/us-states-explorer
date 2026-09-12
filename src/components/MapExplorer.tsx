"use client";

import React, { useState, useEffect } from "react";
import { StateInfo, UNIT_1_STATES, US_MAP_VIEWBOX } from "../data/statesData";
import { RefreshCw, CheckCircle2, XCircle, ArrowRight, MapPin, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface MapExplorerProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onSuccess, onFailure }) => {
  const [currentState, setCurrentState] = useState<StateInfo>(UNIT_1_STATES[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const loadNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * UNIT_1_STATES.length);
    const target = UNIT_1_STATES[randomIndex];
    setCurrentState(target);
    setSelectedAnswer(null);
    setIsCorrect(null);

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
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);

    if (option === currentState.name) {
      setIsCorrect(true);
      onSuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      setIsCorrect(false);
      onFailure();
    }
  };

  const handleStateClickOnMap = (state: StateInfo) => {
    if (selectedAnswer !== null) return;
    handleSelectOption(state.name);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-brand-blue/20 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-xs md:text-sm font-bold uppercase tracking-wider bg-blue-100 text-brand-blue px-3 py-1 rounded-full flex items-center gap-1">
          <MapPin className="w-4 h-4" /> Mode 3: Map Explorer
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
        Which state is highlighted in yellow on the US map?
      </h2>
      <p className="text-xs md:text-sm text-gray-500 mb-4 text-center">
        Look at the highlighted state on the map and select its name below!
      </p>

      {/* Authentic Geographic Vector US Map Container */}
      <div className="w-full h-[450px] md:h-[550px] lg:h-[600px] my-2 p-3 bg-slate-900 border-4 border-slate-700 rounded-3xl relative shadow-2xl flex items-center justify-center overflow-hidden">
        <svg
          viewBox={US_MAP_VIEWBOX}
          className="w-full h-full filter drop-shadow-lg object-contain"
          style={{ maxHeight: "100%" }}
        >
          <g>
            {UNIT_1_STATES.map((state) => {
              const isTarget = state.id === currentState.id;
              const isSelected = selectedAnswer !== null && state.name === selectedAnswer;

              let fillColor = "#38BDF8"; // Vibrant sky blue default for states
              let strokeColor = "#0284C7";
              let strokeWidth = "1.5";

              if (isTarget) {
                fillColor = "#FACC15"; // Bright gold yellow for target state!
                strokeColor = "#CA8A04";
                strokeWidth = "3";
              } else if (isSelected) {
                fillColor = "#EF4444"; // Red if wrong selection
                strokeColor = "#B91C1C";
              }

              return (
                <path
                  key={state.id}
                  d={state.path}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={`transition-all duration-200 ${
                    isTarget ? "animate-pulse" : ""
                  }`}
                >
                  <title>{isTarget ? "Highlighted State" : state.id}</title>
                </path>
              );
            })}
          </g>
        </svg>

        <div className="absolute bottom-3 left-4 text-xs font-bold text-sky-200 bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-600">
          📍 Real US Census Bureau Albers Projection
        </div>
      </div>

      {/* Multiple Choice Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full my-6">
        {options.map((option, idx) => {
          let btnStyle = "bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-brand-blue hover:bg-sky-50";

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

      {/* Feedback & Next Button */}
      {selectedAnswer !== null && (
        <div className="w-full flex flex-col items-center bg-gray-50 p-4 rounded-2xl border border-gray-200 animate-slideUp">
          {isCorrect ? (
            <div className="text-center mb-3">
              <span className="text-green-600 font-extrabold text-lg flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Spot On! That state is {currentState.name}!
              </span>
              <p className="text-xs md:text-sm text-gray-600 mt-1 italic">
                &ldquo;{currentState.funFact}&rdquo;
              </p>
            </div>
          ) : (
            <div className="text-center mb-3">
              <span className="text-red-500 font-extrabold text-lg">
                Nice attempt! The highlighted state was {currentState.name}.
              </span>
            </div>
          )}

          <button
            onClick={loadNewQuestion}
            className="w-full max-w-xs bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition transform hover:scale-105"
          >
            <span>Next State on Map</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
