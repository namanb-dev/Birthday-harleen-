// ============================================================
// EDIT EVERYTHING HERE — swap names, images, music, and text.
// ============================================================

export type Memory = {
  img: string
  caption: string
  note: string
}

export type OpenWhen = {
  title: string
  message: string
}

export const CONFIG = {
  recipientName: "Harleen",
  senderName: "Naman",

  // Unlock gate. Set previewMode false to enable the live countdown.
  // Anchored to midnight in Fremont, CA timezone (Sept 6 is PDT, UTC-7).
  // When you're ready to arm the countdown, set previewMode to false.
  unlockISO: "2026-09-06T00:00:00-07:00",
  previewMode: True,

  // Direct WhatsApp Chat Button Configuration
  whatsapp: {
    enabled: true,
    // 👈 REPLACE WITH YOUR ACTUAL NUMBER (with country code, e.g. "+919876543210")
    phoneNumber: "+918054206570",
    message: "Hey! I just visited your birthday website 🎉",
    tooltip: "Chat on WhatsApp",
    badgeMessage: "I'm just a button away from making a call or msg! 📱💬",
  },

  // Stylized avatar or photo of the birthday girl.
  avatarSrc: "/harleen-avatar.jpg",

  // Speech bubble quotes — cycles on each click of the avatar.
  avatarQuotes: [
    "ਓ ਕਿਵੇਂ ਆ ਸਿੰਘ! ਸਤ ਸ੍ਰੀ ਅਕਾਲਲਲਲਲਲ",
    "ਮਿੱਤਰਰਰਰ ਥੋੜ੍ਹਾ ਬਰਥਡੇ ਆ ਅੱਜ ਤਾਂ",
    "ਇੱਕ ਹੋਰ ਸਾਲ ਨਿਕਲ ਗਿਆ ਅਮਰੀਕਾ 'ਚ ਮੁਸ਼ੱਕਤਾਂ ਕੱਢਦੇ ਹੋਏ",
    "ਬੁੱਢੇ ਹੋ ਰਹੇ ਹੋ ਮਿੱਤਰ ਹੌਲੀ ਹੌਲੀ ਹੁਣ ਤਾਂ 😂",
    "\"ਹਮ ਤੋਂ ਐਸੇ ਹੀ ਹੈ ਜੀ\" ਐਸੇ ਹੀ ਰਹਿਣਾ ਮਿੱਤਰ ਹਮੇਸ਼ਾ",
  ],

  // Background music — plays softly once she enters.
  backgroundMusicSrc: "",

  // Featured song for the music player.
  songTitle: "A Little Something For You",
  songArtist: "press play & stay a while",
  songSrc: "/audio/Memories Calm Dreamy Piano by TwoTwice.mp3",

  // Memory Lane — 3D polaroids that flip to reveal a note.
  memories: [
    { img: "/memory-1.jpeg", caption: "a good bachpan di yaad👼🏻", note: "i want you to remember that day, delhi jana and interview dena and like still can't believe thonu ehne chote hunde toh ehni sohni english andi aa 😍 ." },
    { img: "/memory-2.jpeg", caption: "kinda first pic i saw of you❤️", note: "Ofc mittar this isn't the first pic i saw of you, it was the graduation one. But this is special because it was kind of the pic that you shared and showed that u trust me enough to send me a picture jo yaar bohut acha lgya c uss time." },
    { img: "/memory-3.jpeg", caption: "Love the good nights and good mornings🫀", note: "yaar it's never been like this but hun pta ni kyo raati and swere thode naal madi g gl ho jandi aa na tn eh ni hunda v bekar subah ya bekar raat aa it's always good after even a little talk with you" },
    { img: "/memory-4.jpeg", caption: "i just love your this yaar, bakchodiiii 🫶🏻", note: "this side of you is like a blesssing to be around, mtlb the people are really blessed to see your this side jis ch you are just free and being you" },
  ] as Memory[],

  // "Open When..." digital envelopes.
  openWhen: [
    { title: "when you miss me", message: "I'm closer than you think. For this i have added a feature ig which u might have already seen, Whatsapp ala button jad v yaad aye ek button naal meri chat khul ju  😁." },
    { title: "when you need a laugh", message: "Remeber when you make the og voices like vich ch awaj ni kad de krde rea kro. Bohut vadiya lgda 😂" },
    { title: "when you're proud of yourself", message: "GOOD. Sit in it. You earned this. I'm over here being annoyingly proud of you for the hundredth time." },
    { title: "when it's hard", message: "You've survived so much ki hun tn koi dikkat ehni vddi ho hi ni skdi ki thonu hilade still ehda hoye kde yaad ek var yaad krlea kro appe shkti milju v ki kuj sehn kita ohde murre ah situation ki aa ehda 🔥" },
  ] as OpenWhen[],

  // The letter.
  letterParagraphs: [
    "Dear Harleen,",
    "Hi mittar, kive ho ? Hope you are having the best day of your life. I guess you have the idea about how special have you became in my life in just a very short span of time and it’s really magical ki how not even being physical present here you are the one that feels more close than anyone else.",
    "You really have became my comfort zone now, literally a little inconvenience and first thing come to my mind is ki haan harleen nu dsunga. Do you know why I admire you so much it’s because your values your pureness your honesty your hardwork your will to make effort even after being busy. You are very precious Harleen and it’s something I felt which can’t be said in words. I am really happy and for the first time I don’t have to expect or say to myself ki kash eh meri dost hundi ya kash mai ehde naal khulke gl kr panda kyuki mai already kr skda and it makes me so happy. Har roj thode naal gl krn toh baad the first that I always have is ki haan yaar eh khush rhe ehda hi hamesha apni life ch no matter what. You have became so important in my life that kiteh v betha pave for milliseconds but yaad aa hi jandi aa kisi na kisi way ch and oh chij khushi hi leandi aa hamesha. You know I have felt so important and like useful to someone after so long Vrna hamesha bojh hi feel hunda c dujea te and like dosta ch v leftist feel hunda c and hai but thode naal online gl krke atleast I feel like I am part of someone’s life for the first time, and like idk how should explain but mainu kdi koi ehda ni lgya jinu mai apna best frnd ya jiste hlka bohuta haq jma ska but thode naal pehli var lgya. I want to be honest mainu anusha and jasleen naal v lgya c but anusha jdo eko dm change hogi c and jasleen v ohna ch ek chij common c ki they never ever asked or cared much about me oh bs apnia sunandia c ya meri bs kde kde puchlea ki kive aa kive nai but tuc minor ja v change notice krde ho ki agr main hlka ja v sahi ni sound kr rea thonu naldi nal pta lg janda and makes me feel so important or valued to be exact. IDK what to write and what not to 😭 sorry yaar hje smjh ni areya ki likha ki ni likha mai dubara likhdunga 😭. In last bs eh kehna chahna YOU ARE THE MOST IMPORTANT PERSON IN MY LIFE RIGHT NOW."
  ],
  letterSignOff: "Naman",

  // Hidden easter egg — revealed by the heart in the corner.
  eggMessage:
    "Okay, you found the secret one. I am so proud of you Harleen for not giving up on yourself, you are one of the most strongest person I have met in my life. I really like you yaar, u are the best thing happened to me this year.",
}
