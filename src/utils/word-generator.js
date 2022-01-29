const CONSONENTS = {
    COMMON: [
        ...('bcdfghklmnprst'.split('')),
        'th', 'ch', 'ck', 'sp'
    ],
    RARE: [
        ...('jqvwxz'.split('')),
        'ng'
    ]
};

const VOWELS = {
    COMMON: [
        ...('aeiou'.split('')),
        'ea', 'oa', 'ee', 'ai', 'oo', 'ou'
    ],
    RARE: [
        'y', 
        'aa',       'ia',       'ua',
        'ae',       'ie', 'oe', 'ue',
              'ei', 'ii', 'oi', 'ui',
        'ao', 'eo', 'io',       'uo',
        'au', 'eu', 'iu',       'uu',
        'ay', 'ey', 'iy', 'oy', 'uy',
    ]
};

const RARE_CONSONENT_RATE = 0.1;
const RARE_VOWEL_RATE = 0.1;

const SYLLABLE_TYPES = [
    'VC', 'CVC', 'V'
];

const randomFromList = (list) => list[Math.floor(Math.random() * list.length)];
const randomLength = () => Math.floor(1 + Math.random() * 2) + Math.floor(1 + Math.random() * 2) -1;
const randomConsonent = () => (
    randomFromList(
        Math.random() <= RARE_CONSONENT_RATE ? CONSONENTS.RARE : CONSONENTS.COMMON
    )
);
const randomVowel = () => (
    randomFromList(
        Math.random() <= RARE_VOWEL_RATE ? VOWELS.RARE : VOWELS.COMMON
    )
);

export const generateWord = (sylables = randomLength()) => (
    new Array(sylables).fill('')
        .map(_ => randomFromList(SYLLABLE_TYPES)).join('').split('')
        .map(x => x
            .replaceAll('C', randomConsonent())
            .replaceAll('V', randomVowel())
        ).join('')
);