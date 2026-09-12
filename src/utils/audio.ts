// Utility for playing State Name MP3s, Positive Feedback MP3s, and Negative Feedback MP3s

export const POSITIVE_FEEDBACK_TRACKS = [
  "Holy moly, you did it.mp3",
  "Number One Victory Royale!.mp3",
  "You got it.mp3",
  "You're Doing Great.mp3",
  "fantastic.mp3",
  "genius.mp3",
  "incredible.mp3",
  "remarkable.mp3",
  "so sigma.mp3",
  "you are the goat.mp3",
  "you can do it.mp3"
];

export const NEGATIVE_FEEDBACK_TRACKS = [
  "Ay Ya! No Good!.mp3",
  "Ay Ya! No!.mp3",
  "C'mon you can do better!.mp3",
  "Stinky!.mp3",
  "better luck next time.mp3",
  "naughty.mp3",
  "no.mp3",
  "swing and miss.mp3",
  "try again.mp3",
  "wrong.mp3"
];

let activeAudio: HTMLAudioElement | null = null;

const stopCurrentAudio = () => {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
};

/**
 * Plays state pronunciation MP3 from /audio/States/{StateName}.mp3
 * Falls back to Web Speech API if MP3 is missing.
 */
export const playStateAudio = (stateName: string): Promise<void> => {
  return new Promise((resolve) => {
    stopCurrentAudio();

    // Correct URL encoding for state names with spaces (e.g. /audio/States/North Carolina.mp3)
    const audioUrl = `/audio/States/${encodeURIComponent(stateName)}.mp3`;
    const audio = new Audio(audioUrl);
    activeAudio = audio;

    audio.play().then(() => resolve()).catch(() => {
      // Fallback to browser Speech Synthesis if MP3 fails
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(stateName);
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
      resolve();
    });
  });
};

/**
 * Plays a random positive encouragement sound effect after a correct answer.
 */
export const playPositiveFeedbackAudio = () => {
  stopCurrentAudio();
  const randomIndex = Math.floor(Math.random() * POSITIVE_FEEDBACK_TRACKS.length);
  const track = POSITIVE_FEEDBACK_TRACKS[randomIndex];
  const audioUrl = `/audio/Positive/${encodeURIComponent(track)}`;
  const audio = new Audio(audioUrl);
  activeAudio = audio;
  audio.play().catch(() => {});
};

/**
 * Plays a random negative/try-again sound effect after an incorrect answer.
 */
export const playNegativeFeedbackAudio = () => {
  stopCurrentAudio();
  const randomIndex = Math.floor(Math.random() * NEGATIVE_FEEDBACK_TRACKS.length);
  const track = NEGATIVE_FEEDBACK_TRACKS[randomIndex];
  const audioUrl = `/audio/Negative/${encodeURIComponent(track)}`;
  const audio = new Audio(audioUrl);
  activeAudio = audio;
  audio.play().catch(() => {});
};
