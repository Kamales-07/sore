/*
 * Every word in the sorry game lives here. Keep lines SHORT. This is a game, not a letter.
 * Rules: never "di", never "bestie", no romance. Friendship only.
 */

/*
 * Background music. Put your own copy of the song at:  public/music/kadhaippoma.mp3
 * It starts when Gayu taps the start button (and can be muted any time).
 * If the file is missing, a soft built-in tone plays instead.
 */
export const music = {
  title: 'Kadhaippoma',
  file: 'music/kadhaippoma.mp3',
  volume: 0.55,
  startOnEnter: true,
}

export const intro = {
  brand: 'Sorry, Gayu.',
  bubble: 'Gayu… oru nimisham? 🥺',
  sub: 'Sorry solla vandhen.',
  start: 'Hmm. Sollu 😒',
  credit: 'Made by Kamales. For a very angry Gayu.',
}

/* Anger meter labels, from furious to calm (checked top to bottom). */
export const moods = [
  { min: 98, emoji: '😤', label: 'Furious' },
  { min: 90, emoji: '😠', label: 'Very angry' },
  { min: 75, emoji: '😒', label: 'Still angry' },
  { min: 55, emoji: '🙄', label: 'Eye-rolling' },
  { min: 35, emoji: '😑', label: 'Softening…' },
  { min: 15, emoji: '😏', label: 'Trying not to smile' },
  { min: 0, emoji: '🙂', label: 'Calm' },
]

export const game = {
  forgive: 'Forgive 💙',
  angerLabel: "Gayu's anger",
  attempt: 'Sorry attempt',
  rejected: 'Rejected',
  waitingSign: 'WAITING…',
  runawayStamp: 'IT RAN AWAY 🏃',
  shrinkStamp: 'SHRINKING…',
  shrinkDoneStamp: 'TOO SMALL TO CLICK',

  /*
   * One entry per sorry attempt.
   * mood: sheepish | puppy | hopeful | nervous | dizzy | sad
   * pose: stand | kneel | sit      item: none | chocolate | chocolates | biryani | sign
   * mode: normal (default) | runaway | shrink | broken
   * promise: added to the receipt at the end (same id = upgraded)
   */
  stages: [
    { line: 'Gayu… sorry.', mood: 'sheepish', no: 'No', stamp: 'REJECTED', anger: 100 },
    { line: 'Romba romba sorry 🥺', mood: 'puppy', no: 'Still no', stamp: 'DENIED', anger: 100 },
    {
      line: 'Okay. One chocolate? 🍫',
      mood: 'hopeful',
      item: 'chocolate',
      no: 'Cheap 🙄',
      stamp: 'TOO CHEAP',
      anger: 99,
      promise: { id: 'choc', text: '1 chocolate' },
    },
    {
      line: 'TWO chocolates. Final offer.',
      mood: 'nervous',
      item: 'chocolates',
      no: 'Insulting',
      stamp: 'STILL CHEAP',
      anger: 99,
      promise: { id: 'choc', text: '2 chocolates (upgraded under pressure)' },
    },
    {
      line: 'Full treat. Biriyani included. En selavu.',
      mood: 'hopeful',
      item: 'biryani',
      no: 'Hmm… no',
      stamp: 'NOT HUNGRY',
      anger: 97,
      promise: { id: 'treat', text: '1 biriyani treat, fully sponsored' },
    },
    {
      line: 'Kneel down mode: ON.',
      mood: 'puppy',
      pose: 'kneel',
      no: 'Get up. Still no.',
      stamp: 'NOPE',
      anger: 95,
      promise: { id: 'kneel', text: 'Kneeled on the floor (dignity: gone)' },
    },
    {
      line: 'Mannichidu · Maaf karo · Lo siento · Gomen',
      sub: 'Sorry in 4 languages.',
      mood: 'nervous',
      no: 'No, in all of them',
      stamp: 'NO × 4 LANGUAGES',
      anger: 92,
    },
    {
      line: 'Next time gift vaanguradhuku munnaadi unkitta kekuren.',
      sub: 'Even for a keychain.',
      mood: 'sheepish',
      no: 'Nice try',
      stamp: 'NICE TRY',
      anger: 88,
      promise: { id: 'consult', text: 'Ask Gayu before buying any gift (even keychains)' },
    },
    {
      line: 'Kamales.exe has stopped responding',
      mood: 'dizzy',
      glitch: true,
      no: 'Restart. Still no.',
      stamp: 'ERROR 404: FORGIVENESS',
      anger: 84,
    },
    {
      line: "I'll just listen. No arguing. No “but”.",
      sub: 'Full one hour.',
      mood: 'hopeful',
      no: 'Prove it',
      stamp: 'APPEAL DISMISSED',
      anger: 78,
      promise: { id: 'listen', text: '1 hour of listening. Zero arguing. Zero “but”.' },
    },
    {
      line: 'Seri. Naan inga wait panren.',
      mood: 'sad',
      pose: 'sit',
      item: 'sign',
      timer: true,
      no: 'Keep waiting',
      stamp: 'KEEP WAITING',
      anger: 70,
    },
    { line: 'Please? 🥺', sub: 'Puppy eyes: maximum.', mood: 'puppy', mode: 'runaway', no: 'No', anger: 55 },
    { line: 'Forgive button looks nice today, no?', mood: 'hopeful', mode: 'shrink', no: 'no', anger: 35 },
    { line: 'No button tired aayiduchu. Like me.', mood: 'sheepish', mode: 'broken', no: 'okay fine 🙄', anger: 15 },
  ],
}

export const result = {
  stamp: 'ACCEPTED 💙',
  early: { title: 'Wait… that easy? 😳', sub: 'Kamales had 12 more speeches ready.' },
  normal: { title: 'FORGIVEN!! 🥹', sub: (n) => `After ${n} rejections. Kamales is crying happy tears.` },
  broken: { title: 'Accepted… technically 😌', sub: 'The No button gave up before you did.' },
  stats: { rejected: 'Rejected', attempts: 'Sorry attempts', time: 'Time taken', anger: 'Anger now' },
  receiptTitle: "KAMALES'S SORRY RECEIPT",
  receiptAlways: '1 genuine sorry',
  receiptWait: (s) => `Waited ${s}s patiently (felt like ${s} years)`,
  receiptStatus: 'STATUS: FORGIVEN',
  receiptFoot: 'Non-refundable. Valid forever.',
  copy: 'Copy receipt 🧾',
  copied: 'Copied! Send it to Kamales as proof',
  replay: 'Play again',
  note: ['Jokes apart, thank you, Gayu.', "I know I hurt you. I'll actually do better."],
  signature: '— Kamales',
}
