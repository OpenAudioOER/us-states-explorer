// Utility for playing State Name MP3s, Positive Feedback MP3s, and Negative Feedback MP3s

export const POSITIVE_FEEDBACK_TRACKS = [
  "BOOMSHAKALAKA.mp3",
  "Big brain.mp3",
  "Certified smarty-pants.mp3",
  "Correct-a-mundo.mp3",
  "High-five your brain.mp3",
  "Holy moly, you did it.mp3",
  "Look at you go.mp3",
  "Nailed it.mp3",
  "Number One Victory Royale!.mp3",
  "Oh yeah.mp3",
  "Points for you.mp3",
  "Somebody stop this genius.mp3",
  "Somebody’s been studying.mp3",
  "That’s the stuff.mp3",
  "The brain has spoken.mp3",
  "Whoa, fancy.mp3",
  "You crushed it.mp3",
  "You got it.mp3",
  "You have defeated the question.mp3",
  "You're Doing Great.mp3",
  "You’re on fire.mp3",
  "a plus.mp3",
  "absolute cinema.mp3",
  "chefs kiss.mp3",
  "fantastic.mp3",
  "galaxy brain.mp3",
  "genius.mp3",
  "incredible.mp3",
  "let bro cook.mp3",
  "lowkey goated.mp3",
  "massive aura.mp3",
  "remarkable.mp3",
  "slay.mp3",
  "so sigma.mp3",
  "that was bussin.mp3",
  "that was peak.mp3",
  "wowza.mp3",
  "you are locked in.mp3",
  "you are so goated.mp3",
  "you are the goat.mp3",
  "you got it dude.mp3",
  "you love to see it.mp3",
  "you made that look easy.mp3"
];

export const NEGATIVE_FEEDBACK_TRACKS = [
  "Ay Ya! No Good!.mp3",
  "Ay Ya! No!.mp3",
  "C'mon you can do better!.mp3",
  "Stinky!.mp3",
  "are you sure about that.mp3",
  "ay yo that's sus.mp3",
  "aye chihuaha.mp3",
  "better luck next time.mp3",
  "bold guess wrong though.mp3",
  "bro got cooked.mp3",
  "buddy no.mp3",
  "c'mon man.mp3",
  "confidence 10 accuracy zero.mp3",
  "jeez louise.mp3",
  "naughty.mp3",
  "no.mp3",
  "oh buddy.mp3",
  "oh for crying out loud.mp3",
  "swing and miss.mp3",
  "that aint it chief.mp3",
  "that answer was wild.mp3",
  "that was a choice.mp3",
  "that wasn't even close.mp3",
  "that's not correct.mp3",
  "try again.mp3",
  "well you tried.mp3",
  "why so bad.mp3",
  "wrong.mp3",
  "yikes.mp3",
  "you took a wrong turn.mp3",
  "you're going to have to try harder than that.mp3"
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
 * Plays state pronunciation MP3 from /audio/States/{StateName}.mp3 ONLY.
 * Robotic Speech Synthesis is permanently disabled.
 */
export const playStateAudio = (stateName: string): Promise<void> => {
  return new Promise((resolve) => {
    stopCurrentAudio();

    const audioUrl = `/audio/States/${encodeURIComponent(stateName)}.mp3`;
    const audio = new Audio(audioUrl);
    activeAudio = audio;

    audio.onended = () => resolve();

    audio.play().then(() => {
      // Audio playing
    }).catch(() => {
      // Do nothing (speech synthesis disabled)
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
