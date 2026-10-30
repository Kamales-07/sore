/*
 * Every word on the site lives in this file.
 * Edit text here; components only handle layout and behaviour.
 *
 * Language rules for anyone editing:
 *  - Never "di", never "bestie", no pet names, no romantic language.
 *  - Keep emoji rare. Keep the tone calm, dry and honest.
 */

export const site = {
  wordmark: 'BLUE',
  credit: 'Designed for Gayu. Created by Kamal.',
  privacy: 'Nothing on this site is tracked, saved on a server, or sent anywhere.',
  backToTop: 'Back to the top',
}

/* ---------- Opening ---------- */
export const intro = {
  title: 'BLUE.',
  subtitle: "Some bonds don't need explanations.",
  lede: 'A small interactive experience for someone who matters more than ordinary words can explain.',
  credit: 'Designed for Gayu. Created by Kamal.',
  enter: 'ENTER THE EXPERIENCE',
}

/* ---------- Chapters (navigation) ---------- */
export const chapters = [
  { id: 'algorithm', num: '01', title: 'The Friendship Algorithm' },
  { id: 'room', num: '02', title: 'The Blue Room' },
  { id: 'overthinking', num: '03', title: 'The Overthinking Simulator' },
  { id: 'memories', num: '04', title: 'The Memory Detector' },
  { id: 'challenge', num: '05', title: 'The Blue Challenge' },
  { id: 'reflection', num: '06', title: 'One Thing Worth Remembering' },
  { id: 'message', num: '07', title: 'Before You Leave' },
  { id: 'reply', num: '08', title: "That's Everything" },
]

export const prologue = {
  eyebrow: 'Prologue',
  title: 'A few games first. Something more honest at the end.',
  body: [
    'Eight short chapters, about ten minutes in total. A small algorithm, an escape room, two games about the human brain, and a few quieter pages near the end.',
    'Nothing here is graded, nothing is saved, and you can skip anything you like. Sound stays off unless you switch it on.',
  ],
  listLabel: 'Chapters',
}

/* ---------- 01 · Friendship algorithm ---------- */
export const algorithm = {
  heading: 'HOW DOES A FRIENDSHIP BECOME THIS IMPORTANT?',
  subheading: 'Unfortunately, no official formula has been discovered yet.',
  instructions: 'Adjust the variables, or select a node. Watch what happens to the connections.',
  variables: [
    {
      id: 'trust',
      label: 'Trust',
      short: 'Trust',
      term: 'TRUST',
      initial: 80,
      note: "The quiet one. You mostly notice it when it's missing.",
      low: 'Trust is low. Everything else starts to wobble.',
    },
    {
      id: 'comfort',
      label: 'Comfort',
      short: 'Comfort',
      term: 'COMFORT',
      initial: 85,
      note: 'Being completely normal around someone. Surprisingly rare.',
      low: 'Comfort is low. Every conversation now needs a formal agenda.',
    },
    {
      id: 'honesty',
      label: 'Honest Communication',
      short: 'Honesty',
      term: 'HONESTY',
      initial: 65,
      note: 'Not always the easiest part, but probably one of the most important.',
      low: 'Honesty is low. Assumptions are now doing most of the talking.',
    },
    {
      id: 'understanding',
      label: 'Understanding',
      short: 'Understanding',
      term: 'UNDERSTANDING',
      initial: 60,
      note: 'Sometimes the same situation feels different to two different people.',
      low: 'Understanding is low. The same sentence now means two different things.',
    },
    {
      id: 'humour',
      label: 'Shared Humour',
      short: 'Humour',
      term: 'A LITTLE CHAOS',
      initial: 90,
      note: "Apparently, tolerating each other's nonsense is an important scientific variable.",
      low: 'Humour is offline. Things are getting suspiciously serious.',
    },
  ],
  formulaLead: 'FRIENDSHIP =',
  idleNote: 'Select a variable to see what it does.',
  readoutLabel: 'Current reading',
  readouts: {
    strong: 'Strong. Not perfect. Probably better that way.',
    stable: 'Stable, with occasional turbulence. Normal, apparently.',
    attention: 'Running, but it could use some attention from both sides.',
  },
  effortLabel: 'Effort required from',
  effortValue: 'Both sides',
  footnote: 'Not a scientific formula. Just a reminder that meaningful friendships take effort from both sides.',
  reset: 'Reset values',
  centerLabel: 'Friendship',
}

/* ---------- 02 · The Blue Room ---------- */
export const room = {
  heading: 'THE BLUE ROOM',
  story:
    'The system has detected an unusually high level of overthinking. Find the three hidden clues to unlock the exit.',
  howTo: 'Tap or click objects in the room to inspect them.',
  startHint: "It's quite dark in here. That lamp looks useful.",
  dark: 'Too dark to inspect anything properly. Maybe start with the lamp.',
  objects: {
    lamp: {
      name: 'Desk lamp',
      on: "Light on. Ippo konjam clear-ah theriyudhu. Also, there's a note on the wall that definitely wasn't obvious before.",
      off: 'Light off. Back to dramatic lighting.',
    },
    note: {
      name: 'Hidden note',
      text: 'Three things in this room know something. One keeps time. One keeps logs. One is the only blue book on the shelf.',
    },
    clock: {
      name: 'Digital clock',
      time: '02:47',
      caption: '02:47 AM. Peak overthinking hours.',
      clue: "Time doesn't solve every misunderstanding. Sometimes a conversation does.",
    },
    computer: {
      name: 'Computer',
      lines: [
        'Running friendship diagnostics...',
        'Overthinking detected.',
        'Communication required.',
        'Perfect words not found.',
        'Recommendation: Start with honesty.',
      ],
    },
    bookshelf: {
      name: 'Bookshelf',
      prompt: 'Five books. One of them is slightly different.',
      books: [
        { id: 'reply', title: 'How to Reply in 0.3 Seconds', response: 'Skimmed it. Speed was never really the problem.' },
        {
          id: 'series',
          title: 'Overthinking: The Complete Series, Vol. 1–12',
          response: 'Already read. Several times. Mostly at 2 AM.',
        },
        {
          id: 'listening',
          title: 'Listening',
          clue: true,
          response:
            "Understanding someone doesn't always mean agreeing with them. Sometimes it means listening long enough to understand why they feel differently.",
        },
        {
          id: 'mind',
          title: 'Mind Reading for Beginners',
          response: 'Every page is blank. Yaarum innum ezhudhala. Nobody has figured this one out.',
        },
        { id: 'arguments', title: 'Winning Arguments, 4th Edition', response: 'Heavily highlighted. Results: not great.' },
      ],
    },
    door: {
      name: 'Blue door',
      locked: (n) => `Locked. The panel needs three clues. You have ${n}.`,
      unlocked: 'The lock has released. The door is ready when you are.',
    },
  },
  clueFound: 'Clue found',
  cluesLabel: 'Clues',
  clueNames: { clock: 'The clock', computer: 'The computer', book: 'The bookshelf' },
  unknownClue: 'Not found yet',
  inspectedLabel: 'Objects inspected',
  objectsLabel: 'Objects in the room',
  unlocked: 'EXIT UNLOCKED.',
  openDoor: 'Open the door',
  success:
    'Congratulations. You have successfully completed a puzzle that was probably easier than understanding human behaviour.',
  restart: 'Restart room',
}

/* ---------- 03 · Overthinking simulator ---------- */
export const overthinking = {
  heading: 'ONE MESSAGE. TWELVE POSSIBLE INTERPRETATIONS.',
  intro:
    'A simulation of what happens inside an overthinking brain. Any resemblance to Kamal is entirely intentional.',
  phoneTitle: 'Messages',
  delivered: 'Delivered',
  prompt: 'What do you do next?',
  meterLabel: 'Overthinking level',
  stageLabel: 'Inside the brain',
  stageIdle: 'Waiting for a decision. The brain is already preparing several.',
  calmStage: 'Brain activity: normal. Unusual, but welcome.',
  moral: 'Overthinking is entertaining until it replaces an actual conversation.',
  roundLabel: (n, total) => `Message ${n} of ${total}`,
  retry: 'Try another option',
  next: 'Next message',
  finish: 'See the results',
  restart: 'Play again',
  rounds: [
    {
      message: 'Okay, leave it.',
      time: '11:42 PM',
      options: [
        {
          key: 'A',
          label: 'Write a 700-word explanation.',
          response: "Essay successfully generated. Nobody requested the director's cut.",
          delta: 35,
          stage: { type: 'document', label: 'Words written', target: 700, lines: 9 },
        },
        {
          key: 'B',
          label: 'Assume the worst possible interpretation.',
          response: 'Congratulations. Your brain has produced a complete fictional universe from three words.',
          delta: 45,
          stage: {
            type: 'chips',
            label: 'Interpretations generated',
            items: [
              'It means okay.',
              'It means not okay.',
              "It's a test.",
              'The full stop is a warning.',
              "They're just busy.",
              'This is the end of an era.',
              "It's a riddle.",
              'Mercury is in retrograde.',
              'Autocorrect wrote it.',
              'Something I said in 2019.',
              'It literally means okay.',
              'I should move to another city.',
            ],
          },
        },
        {
          key: 'C',
          label: 'Stop, think, and ask calmly if clarification is needed.',
          response: 'Unexpected development: communication has entered the conversation.',
          delta: -25,
          stage: {
            type: 'calm',
            text: "Just checking: did you mean leave it for now, or is something bothering you? Either way, I'd rather understand than guess.",
          },
        },
        {
          key: 'D',
          label: 'Open the chat again 46 times.',
          response: 'Chat inspection completed. New information discovered: absolutely nothing.',
          delta: 40,
          stage: { type: 'counter', label: 'Times chat reopened', target: 46, foot: 'New messages: 0' },
        },
      ],
    },
    {
      message: "Nothing, it's fine.",
      time: '12:09 AM',
      options: [
        {
          key: 'A',
          label: 'Analyse the punctuation for three hours.',
          response: 'Punctuation analysis complete. The full stop was, in fact, just a full stop.',
          delta: 35,
          stage: { type: 'counter', label: 'Minutes spent analysing punctuation', target: 180, foot: 'Hidden meanings found: 0' },
        },
        {
          key: 'B',
          label: 'Draft fourteen replies. Send none.',
          response: 'Fourteen drafts written. Zero sent. Technically very productive.',
          delta: 40,
          stage: { type: 'document', label: 'Drafts written', target: 14, lines: 6 },
        },
        {
          key: 'C',
          label: "Reply: “Okay. If you want to talk about it later, I'm here.”",
          response: 'Respectful, honest, and no pressure. Suspiciously mature.',
          delta: -25,
          stage: { type: 'calm', text: "Okay. If you want to talk about it later, I'm here." },
        },
        {
          key: 'D',
          label: "Search the internet for what ‘fine’ really means.",
          response: 'Forty-seven articles found. Every one of them disagrees with the others.',
          delta: 40,
          stage: {
            type: 'chips',
            label: 'Search results',
            items: [
              "‘Fine’ means fine",
              "‘Fine’ never means fine",
              'Top 10 meanings of fine',
              'Fine: a linguistic mystery',
              'It depends (sponsored)',
              'Ask again later',
              'Forum thread, 900 replies',
              'Results inconclusive',
            ],
          },
        },
      ],
    },
  ],
  summaryTitle: 'Simulation complete',
  summary: {
    low: 'Low overthinking. Communication appears to be working. Kamal is taking notes.',
    mid: 'Moderate overthinking. Normal human behaviour. Probably.',
    high: 'Critical overthinking. Recommended treatment: one honest conversation, taken as needed.',
  },
}

/* ---------- 04 · Memory detector ---------- */
export const memories = {
  heading: 'HOW WELL DO YOU KNOW THIS FRIENDSHIP?',
  intro: 'Four sealed files. Reveal them in any order.',
  fileLabel: 'File',
  reveal: 'Reveal',
  scanning: 'Scanning',
  progress: (n, total) => `${n} of ${total} files revealed`,
  reseal: 'Seal the files again',
  cards: [
    {
      id: 'conversations',
      icon: 'chat',
      title: 'Random conversations',
      text: 'Some conversations have no purpose. They still become part of the day you remember.',
    },
    {
      id: 'silence',
      icon: 'silence',
      title: 'Comfortable silence',
      text: 'Being comfortable around someone can be just as meaningful as having something to say.',
    },
    {
      id: 'disagreements',
      icon: 'split',
      title: 'Honest disagreements',
      text: "A close friendship doesn't require identical opinions. It requires respect when opinions differ.",
    },
    {
      id: 'humour',
      icon: 'spark',
      title: 'Laughing at things nobody else understands',
      text: "Sometimes a conversation is funny only because of the person you're having it with.",
    },
  ],
  closing: "These aren't assumptions about your memories. They're possibilities that make close friendships meaningful.",
  editor: {
    title: 'Personalise these files',
    note: 'You are seeing this panel because the link contains ?edit. Replace any card with a real memory, or keep the defaults. Every field is optional.',
    cardLabel: (n) => `File 0${n}`,
    titleLabel: 'Title',
    textLabel: 'Text',
    closingLabel: 'Closing line',
    closingHint: 'If you add real memories, you may want to change this line too.',
    copyLink: 'Copy link with these cards',
    copied: 'Link copied',
    reset: 'Restore defaults',
    privacy:
      'Edits stay in this browser and inside the link you copy. Nothing is uploaded. To make them permanent, edit src/content/content.js instead.',
  },
}

/* ---------- 05 · Blue challenge ---------- */
export const challenge = {
  heading: 'FIVE QUESTIONS. ZERO SERIOUS CONSEQUENCES.',
  intro: 'No wrong answers. Some answers are just funnier than others.',
  progress: (n, total) => `Question ${n} of ${total}`,
  next: 'Next question',
  finish: 'Show my result',
  restart: 'Play again',
  resultEyebrow: 'Your result',
  traitsLabel: 'Detected tendencies',
  traits: { calm: 'Calm', overthink: 'Overthinking', chaos: 'Chaos', expect: 'Expectations' },
  questions: [
    {
      q: 'What is more dangerous?',
      options: [
        { key: 'A', label: 'A low phone battery.', trait: 'chaos', reply: 'Fair. Two percent battery has ended many important conversations.' },
        { key: 'B', label: 'An ambiguous message.', trait: 'overthink', reply: 'Three words, no context, infinite possibilities. Respect.' },
        {
          key: 'C',
          label: "Saying ‘nothing’ when there is clearly something.",
          trait: 'overthink',
          reply: 'Reasonable. Things that go unsaid usually find their way back into the conversation.',
        },
        { key: 'D', label: 'All of the above.', trait: 'chaos', reply: 'Correct. Modern life is a minefield.' },
      ],
    },
    {
      q: 'What is the most underrated friendship skill?',
      options: [
        { key: 'A', label: 'Winning every argument.', trait: 'expect', reply: "Bold. Unfortunately, friendship doesn't come with a scoreboard." },
        { key: 'B', label: 'Remembering every detail.', trait: 'expect', reply: 'Impressive memory. Slightly less useful than it sounds.' },
        { key: 'C', label: 'Listening without preparing a defence.', trait: 'calm', reply: 'Underrated indeed. Also much harder than it sounds.' },
        { key: 'D', label: 'Replying within 0.3 seconds.', trait: 'chaos', reply: 'Fast. Not necessarily helpful, but fast.' },
      ],
    },
    {
      q: 'When a misunderstanding happens, what is usually useful?',
      options: [
        { key: 'A', label: 'Assuming intentions.', trait: 'overthink', reply: 'A popular choice. Historically unreliable.' },
        { key: 'B', label: 'Keeping score.', trait: 'expect', reply: 'The scoreboard returns. Still no prizes.' },
        { key: 'C', label: 'Calm communication.', trait: 'calm', reply: 'Boring, effective, highly recommended.' },
        {
          key: 'D',
          label: 'Conducting a full internal investigation.',
          trait: 'overthink',
          reply: 'Thorough. Unfortunately, the investigation only interviewed one witness.',
        },
      ],
    },
    {
      q: 'What makes a friendship feel comfortable?',
      options: [
        { key: 'A', label: 'Always agreeing.', trait: 'expect', reply: 'Peaceful, but slightly suspicious.' },
        { key: 'B', label: 'Never having difficult conversations.', trait: 'expect', reply: 'Comfortable now. Expensive later.' },
        {
          key: 'C',
          label: 'Being able to communicate honestly and respectfully.',
          trait: 'calm',
          reply: 'Correct, and slightly harder than it looks.',
        },
        { key: 'D', label: 'Sending 45 reels a day.', trait: 'chaos', reply: 'Technically a form of communication. Respect.' },
      ],
    },
    {
      q: 'Choose the most realistic friendship philosophy.',
      options: [
        { key: 'A', label: 'Nobody should ever make mistakes.', trait: 'expect', reply: 'Ambitious. Humans have not received this update yet.' },
        {
          key: 'B',
          label: 'Close friends should understand everything without being told.',
          trait: 'overthink',
          reply: 'Would be convenient. Mind-reading is still in beta.',
        },
        {
          key: 'C',
          label: 'People can care about each other and still misunderstand each other.',
          trait: 'calm',
          reply: 'Realistic. Also slightly reassuring.',
        },
        { key: 'D', label: 'The human brain should come with a user manual.', trait: 'chaos', reply: 'Strongly supported. Nobody has written it yet.' },
      ],
    },
  ],
  results: {
    diplomat: {
      title: 'THE QUIET DIPLOMAT',
      text: 'Calm, fair, and frustratingly reasonable. Please share your settings with the rest of us.',
    },
    calmChaos: {
      title: 'THE CALM CHAOS SPECIALIST',
      text: 'Your theoretical friendship-management system is functional. Occasional software updates may still be required.',
    },
    overthinker: {
      title: 'THE PROFESSIONAL OVERTHINKER',
      text: 'Excellent imagination. Questionable evidence handling. Communication skills recommended.',
    },
    chaos: {
      title: 'THE CHAOS COORDINATOR',
      text: 'Unconventional methods. Highly entertaining results. Not recommended by any professional body.',
    },
    auditor: {
      title: 'THE HIGH-STANDARDS AUDITOR',
      text: 'Very high expectations. Most humans will need a few patches to meet them.',
    },
  },
}

/* ---------- 06 · Reflection ---------- */
export const reflection = {
  heading: 'ONE THING WORTH REMEMBERING.',
  paragraphs: [
    "Closeness doesn't mean two people will always understand every situation in the same way.",
    'Sometimes one person moves on from something that the other person is still thinking about. Sometimes an explanation sounds different from what was intended. And sometimes a small situation brings up feelings that have been building for longer than either person realised.',
    "That doesn't automatically make either person the villain.",
    "What matters is whether both people are willing to listen, communicate honestly, acknowledge the impact of their actions, and respect each other's feelings.",
    "A meaningful friendship isn't about never getting things wrong.",
    "It's about being willing to understand each other better.",
  ],
  button: "THAT'S WORTH THINKING ABOUT.",
  reveal: 'Understanding is not mind-reading. Sometimes it begins with asking and listening.',
}

/* ---------- 07 · Final message (displayed exactly as written) ---------- */
export const finalMessage = {
  heading: 'Before You Leave.',
  subheading: 'No jokes for this part.',
  salutation: 'Gayu,',
  paragraphs: [
    'I wanted to make something different instead of sending another long message trying to explain everything.',
    "I know this situation may not be only about the chain itself. You told me that there have been times when you've let things go, even when they hurt you, and I understand why having those feelings come up again can be frustrating.",
    "I may not have understood your perspective properly every time, and I don't want to dismiss how you feel just because hurting you wasn't my intention.",
    "You're a very important person in my life, and I genuinely value the friendship we have.",
    'I know that saying sorry is easy. What matters more is listening properly, understanding where I went wrong, and being more thoughtful about my actions.',
    "I'm not expecting this website to fix everything or make you stop feeling upset. I just wanted to make you smile a little, acknowledge your feelings, and remind you that I don't take our friendship for granted.",
    "You don't have to pretend everything is okay before you're ready.",
    'Thank you for being someone whose friendship means this much to me.',
    "I'm genuinely sorry for the times I've hurt you without understanding how much it affected you.",
  ],
  signature: '— Kamal',
}

/* ---------- 08 · Final interaction ---------- */
export const finalInteraction = {
  heading: "That's everything I wanted to say.",
  note: 'Everything below is optional. Closing the page is a perfectly valid response too.',
  options: {
    okay: { label: 'Okay, I get it.', response: 'Message received. No dramatic soundtrack required.' },
    time: { label: 'I need some time.', response: "That's okay. Take the time you need. No pressure." },
    say: { label: 'One thing I want to say.' },
  },
  form: {
    label: 'Your message',
    placeholder: 'Say whatever you feel comfortable saying...',
    copy: 'Copy message',
    copied: 'Copied',
    clear: 'Clear',
    empty: 'Write something first, then copy it.',
    note: "This isn't sent or saved anywhere. Copy it and share it however, and whenever, you like.",
  },
}

/* ---------- Easter egg ---------- */
export const easterEgg = {
  dotLabel: 'A small blue dot',
  title: 'Achievement unlocked',
  lines: ['Achievement unlocked: You noticed something small.', 'Apparently, attention to detail matters. Who knew? 😂'],
  after: 'Thanks for exploring this little corner of the internet.',
  close: 'Close',
}
