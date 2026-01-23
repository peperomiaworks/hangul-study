export type HangulChar = {
  char: string;
  romaji: string[];
  kana: string[];
  type: 'consonant' | 'vowel' | 'compound' | 'block';
  level: 1 | 2 | 3;
};

interface BaseConsonant {
  char: string;
  uIndex: number; // Unicode initial index
  romajiStarts: string[];
  kanaStarts: string[];
}

interface BaseVowel {
  char: string;
  uIndex: number; // Unicode medial index
  romajiEnd: string;
  kanaEnd: string;
  isCompound?: boolean;
}

// 14 Basic Consonants
export const consonantsList = [
  { char: 'ㄱ', uIndex: 0 }, { char: 'ㄴ', uIndex: 2 }, { char: 'ㄷ', uIndex: 3 },
  { char: 'ㄹ', uIndex: 5 }, { char: 'ㅁ', uIndex: 6 }, { char: 'ㅂ', uIndex: 7 },
  { char: 'ㅅ', uIndex: 9 }, { char: 'ㅇ', uIndex: 11 }, { char: 'ㅈ', uIndex: 12 },
  { char: 'ㅊ', uIndex: 14 }, { char: 'ㅋ', uIndex: 15 }, { char: 'ㅌ', uIndex: 16 },
  { char: 'ㅍ', uIndex: 17 }, { char: 'ㅎ', uIndex: 18 }
];

export const vowelsList = [
  { char: 'ㅏ', uIndex: 0, kanaEnd: 'ア', isCompound: false },
  { char: 'ㅑ', uIndex: 2, kanaEnd: 'ヤ', isCompound: false },
  { char: 'ㅓ', uIndex: 4, kanaEnd: 'オ', isCompound: false },
  { char: 'ㅕ', uIndex: 6, kanaEnd: 'ヨ', isCompound: false },
  { char: 'ㅗ', uIndex: 8, kanaEnd: 'オ', isCompound: false },
  { char: 'ㅛ', uIndex: 12, kanaEnd: 'ヨ', isCompound: false },
  { char: 'ㅜ', uIndex: 13, kanaEnd: 'ウ', isCompound: false },
  { char: 'ㅠ', uIndex: 17, kanaEnd: 'ユ', isCompound: false },
  { char: 'ㅡ', uIndex: 18, kanaEnd: 'ウ', isCompound: false },
  { char: 'ㅣ', uIndex: 20, kanaEnd: 'イ', isCompound: false },
  // Compound Vowels (Level 3)
  { char: 'ㅐ', uIndex: 1, kanaEnd: 'エ', isCompound: true },
  { char: 'ㅒ', uIndex: 3, kanaEnd: 'イェ', isCompound: true },
  { char: 'ㅔ', uIndex: 5, kanaEnd: 'エ', isCompound: true },
  { char: 'ㅖ', uIndex: 7, kanaEnd: 'イェ', isCompound: true },
  { char: 'ㅘ', uIndex: 9, kanaEnd: 'ワ', isCompound: true },
  { char: 'ㅙ', uIndex: 10, kanaEnd: 'ウェ', isCompound: true },
  { char: 'ㅚ', uIndex: 11, kanaEnd: 'ウェ', isCompound: true },
  { char: 'ㅝ', uIndex: 14, kanaEnd: 'ウォ', isCompound: true },
  { char: 'ㅞ', uIndex: 15, kanaEnd: 'ウェ', isCompound: true },
  { char: 'ㅟ', uIndex: 16, kanaEnd: 'ウィ', isCompound: true },
  { char: 'ㅢ', uIndex: 19, kanaEnd: 'ウイ', isCompound: true },
];


// 14 Basic Consonants
const consonants: BaseConsonant[] = [
  { char: 'ㄱ', uIndex: 0, romajiStarts: ['k', 'g'], kanaStarts: ['カ', 'ガ'] },
  { char: 'ㄴ', uIndex: 2, romajiStarts: ['n'], kanaStarts: ['ナ'] },
  { char: 'ㄷ', uIndex: 3, romajiStarts: ['t', 'd'], kanaStarts: ['タ', 'ダ'] },
  { char: 'ㄹ', uIndex: 5, romajiStarts: ['r', 'l'], kanaStarts: ['ラ'] },
  { char: 'ㅁ', uIndex: 6, romajiStarts: ['m'], kanaStarts: ['マ'] },
  { char: 'ㅂ', uIndex: 7, romajiStarts: ['p', 'b'], kanaStarts: ['パ', 'バ'] },
  { char: 'ㅅ', uIndex: 9, romajiStarts: ['s'], kanaStarts: ['サ'] },
  { char: 'ㅇ', uIndex: 11, romajiStarts: [''], kanaStarts: ['ア'] },
  { char: 'ㅈ', uIndex: 12, romajiStarts: ['j', 'ch'], kanaStarts: ['ジャ', 'チャ'] },
  { char: 'ㅊ', uIndex: 14, romajiStarts: ['ch'], kanaStarts: ['チャ'] },
  { char: 'ㅋ', uIndex: 15, romajiStarts: ['k'], kanaStarts: ['カ'] },
  { char: 'ㅌ', uIndex: 16, romajiStarts: ['t'], kanaStarts: ['タ'] },
  { char: 'ㅍ', uIndex: 17, romajiStarts: ['p'], kanaStarts: ['パ'] },
  { char: 'ㅎ', uIndex: 18, romajiStarts: ['h'], kanaStarts: ['ハ'] },
];

// 21 Vowels (10 Basic + 11 Compound)
const vowels: BaseVowel[] = [
  // Basic (Level 2)
  { char: 'ㅏ', uIndex: 0, romajiEnd: 'a', kanaEnd: 'ア' },
  { char: 'ㅑ', uIndex: 2, romajiEnd: 'ya', kanaEnd: 'ヤ' },
  { char: 'ㅓ', uIndex: 4, romajiEnd: 'eo', kanaEnd: 'オ' },
  { char: 'ㅕ', uIndex: 6, romajiEnd: 'yeo', kanaEnd: 'ヨ' },
  { char: 'ㅗ', uIndex: 8, romajiEnd: 'o', kanaEnd: 'オ' },
  { char: 'ㅛ', uIndex: 12, romajiEnd: 'yo', kanaEnd: 'ヨ' },
  { char: 'ㅜ', uIndex: 13, romajiEnd: 'u', kanaEnd: 'ウ' },
  { char: 'ㅠ', uIndex: 17, romajiEnd: 'yu', kanaEnd: 'ユ' },
  { char: 'ㅡ', uIndex: 18, romajiEnd: 'eu', kanaEnd: 'ウ' },
  { char: 'ㅣ', uIndex: 20, romajiEnd: 'i', kanaEnd: 'イ' },
  // Compound (Level 3)
  { char: 'ㅐ', uIndex: 1, romajiEnd: 'ae', kanaEnd: 'エ', isCompound: true },
  { char: 'ㅒ', uIndex: 3, romajiEnd: 'yae', kanaEnd: 'イェ', isCompound: true },
  { char: 'ㅔ', uIndex: 5, romajiEnd: 'e', kanaEnd: 'エ', isCompound: true },
  { char: 'ㅖ', uIndex: 7, romajiEnd: 'ye', kanaEnd: 'イェ', isCompound: true },
  { char: 'ㅘ', uIndex: 9, romajiEnd: 'wa', kanaEnd: 'ワ', isCompound: true },
  { char: 'ㅙ', uIndex: 10, romajiEnd: 'wae', kanaEnd: 'ウェ', isCompound: true },
  { char: 'ㅚ', uIndex: 11, romajiEnd: 'oe', kanaEnd: 'ウェ', isCompound: true },
  { char: 'ㅝ', uIndex: 14, romajiEnd: 'wo', kanaEnd: 'ウォ', isCompound: true },
  { char: 'ㅞ', uIndex: 15, romajiEnd: 'we', kanaEnd: 'ウェ', isCompound: true },
  { char: 'ㅟ', uIndex: 16, romajiEnd: 'wi', kanaEnd: 'ウィ', isCompound: true },
  { char: 'ㅢ', uIndex: 19, romajiEnd: 'ui', kanaEnd: 'ウイ', isCompound: true },
];

// レベル3の一般的なパッチム (終声子音)
// 全27種類ではなく、最も一般的なものを実装します
// 0=なし, 1=ㄱ, 4=ㄴ, 8=ㄹ, 16=ㅁ, 17=ㅂ, 21=ㅇ
export const commonPatchims = [
  { uIndex: 1, char: 'ㄱ', romaji: 'k', kana: 'ッ' }, // k/g -> end is usually k
  { uIndex: 4, char: 'ㄴ', romaji: 'n', kana: 'ン' },
  { uIndex: 8, char: 'ㄹ', romaji: 'l', kana: 'ル' },
  { uIndex: 16, char: 'ㅁ', romaji: 'm', kana: 'ム' },
  { uIndex: 17, char: 'ㅂ', romaji: 'p', kana: 'プ' },
  { uIndex: 21, char: 'ㅇ', romaji: 'ng', kana: 'ン' },
];


// 基本母音用の簡略化されたカタカナマップ (レベル2対応)
// レベル3 (合成母音) の場合、"初声子音 + 母音の音" のヒューリスティックをデフォルトとします
const generateKana = (cChar: string, vChar: string): string[] => {
  // 合成母音の場合、子音の音 + 母音の音の近似を返します
  // これはプレースホルダーです。

  if (cChar === 'ㅇ') return []; // 上流で処理済み

  // Re-use previous map for basics
  const basicMap: Record<string, Record<string, string[]>> = {
    'ㄱ': { 'ㅏ': ['カ', 'ガ'], 'ㅑ': ['キャ', 'ギャ'], 'ㅓ': ['コ', 'ゴ'], 'ㅕ': ['キョ', 'ギョ'], 'ㅗ': ['コ', 'ゴ'], 'ㅛ': ['キョ', 'ギョ'], 'ㅜ': ['ク', 'グ'], 'ㅠ': ['キュ', 'ギュ'], 'ㅡ': ['ク', 'グ'], 'ㅣ': ['キ'] },
    'ㄴ': { 'ㅏ': ['ナ'], 'ㅑ': ['ニャ'], 'ㅓ': ['ノ'], 'ㅕ': ['ニョ'], 'ㅗ': ['ノ'], 'ㅛ': ['ニョ'], 'ㅜ': ['ヌ'], 'ㅠ': ['ニュ'], 'ㅡ': ['ヌ'], 'ㅣ': ['ニ'] },
    'ㄷ': { 'ㅏ': ['タ', 'ダ'], 'ㅑ': ['チャ', 'ヂャ'], 'ㅓ': ['ト', 'ド'], 'ㅕ': ['チョ', 'ヂョ'], 'ㅗ': ['ト', 'ド'], 'ㅛ': ['チョ', 'ヂョ'], 'ㅜ': ['トゥ', 'ドゥ'], 'ㅠ': ['チュ', 'ヂュ'], 'ㅡ': ['トゥ', 'ドゥ'], 'ㅣ': ['ティ'] },
    'ㄹ': { 'ㅏ': ['ラ'], 'ㅑ': ['リャ'], 'ㅓ': ['ロ'], 'ㅕ': ['リョ'], 'ㅗ': ['ロ'], 'ㅛ': ['リョ'], 'ㅜ': ['ル'], 'ㅠ': ['リュ'], 'ㅡ': ['ル'], 'ㅣ': ['リ'] },
    'ㅁ': { 'ㅏ': ['マ'], 'ㅑ': ['ミャ'], 'ㅓ': ['モ'], 'ㅕ': ['ミョ'], 'ㅗ': ['モ'], 'ㅛ': ['ミョ'], 'ㅜ': ['ム'], 'ㅠ': ['ミュ'], 'ㅡ': ['ム'], 'ㅣ': ['ミ'] },
    'ㅂ': { 'ㅏ': ['パ', 'バ'], 'ㅑ': ['ピャ', 'ビャ'], 'ㅓ': ['ポ', 'ボ'], 'ㅕ': ['ピョ', 'ビョ'], 'ㅗ': ['ポ', 'ボ'], 'ㅛ': ['ピョ', 'ビョ'], 'ㅜ': ['プ', 'ブ'], 'ㅠ': ['ピュ', 'ビュ'], 'ㅡ': ['プ', 'ブ'], 'ㅣ': ['ピ'] },
    'ㅅ': { 'ㅏ': ['サ'], 'ㅑ': ['シャ'], 'ㅓ': ['ソ'], 'ㅕ': ['ショ'], 'ㅗ': ['ソ'], 'ㅛ': ['ショ'], 'ㅜ': ['ス'], 'ㅠ': ['シュ'], 'ㅡ': ['ス'], 'ㅣ': ['シ'] },
    'ㅈ': { 'ㅏ': ['ジャ', 'チャ'], 'ㅑ': ['ジャ', 'チャ'], 'ㅓ': ['ジョ', 'チョ'], 'ㅕ': ['ジョ', 'チョ'], 'ㅗ': ['ジョ', 'チョ'], 'ㅛ': ['ジョ', 'チョ'], 'ㅜ': ['ジュ', 'チュ'], 'ㅠ': ['ジュ', 'チュ'], 'ㅡ': ['ジュ', 'チュ'], 'ㅣ': ['ジ'] },
    'ㅊ': { 'ㅏ': ['チャ'], 'ㅑ': ['チャ'], 'ㅓ': ['チョ'], 'ㅕ': ['チョ'], 'ㅗ': ['チョ'], 'ㅛ': ['チョ'], 'ㅜ': ['チュ'], 'ㅠ': ['チュ'], 'ㅡ': ['チュ'], 'ㅣ': ['チ'] },
    'ㅋ': { 'ㅏ': ['カ'], 'ㅑ': ['キャ'], 'ㅓ': ['コ'], 'ㅕ': ['キョ'], 'ㅗ': ['コ'], 'ㅛ': ['キョ'], 'ㅜ': ['ク'], 'ㅠ': ['キュ'], 'ㅡ': ['ク'], 'ㅣ': ['キ'] },
    'ㅌ': { 'ㅏ': ['タ'], 'ㅑ': ['チャ'], 'ㅓ': ['ト'], 'ㅕ': ['チョ'], 'ㅗ': ['ト'], 'ㅛ': ['チョ'], 'ㅜ': ['トゥ'], 'ㅠ': ['チュ'], 'ㅡ': ['トゥ'], 'ㅣ': ['ティ'] },
    'ㅍ': { 'ㅏ': ['パ'], 'ㅑ': ['ピャ'], 'ㅓ': ['ポ'], 'ㅕ': ['ピョ'], 'ㅗ': ['ポ'], 'ㅛ': ['ピョ'], 'ㅜ': ['プ'], 'ㅠ': ['ピュ'], 'ㅡ': ['プ'], 'ㅣ': ['ピ'] },
    'ㅎ': { 'ㅏ': ['ハ'], 'ㅑ': ['ヒャ'], 'ㅓ': ['ホ'], 'ㅕ': ['ヒョ'], 'ㅗ': ['ホ'], 'ㅛ': ['ヒョ'], 'ㅜ': ['フ'], 'ㅠ': ['ヒュ'], 'ㅡ': ['フ'], 'ㅣ': ['ヒ'] }
  };

  if (basicMap[cChar]?.[vChar]) return basicMap[cChar][vChar];

  // 合成母音用のフォールバック (レベル3)
  // 母音(char)からカタカナへのマッピング (近似)
  const compoundVowelMap: Record<string, string> = {
    'ㅐ': 'エ', 'ㅒ': 'イェ', 'ㅔ': 'エ', 'ㅖ': 'イェ',
    'ㅘ': 'ワ', 'ㅙ': 'ウェ', 'ㅚ': 'ウェ', 'ㅝ': 'ウォ',
    'ㅞ': 'ウェ', 'ㅟ': 'ウィ', 'ㅢ': 'ウイ'
  };

  const vSound = compoundVowelMap[vChar];
  if (!vSound) return [];

  // 子音の発音マッピング (組み合わせ用に簡略化)
  // 基本マッピングから母音部分を取り除き、子音の音を抽出します
  // 例: 'ka' -> 'k'
  const consonantSoundMap: Record<string, string> = {
    'ㄱ': 'ク', 'ㄴ': 'ヌ', 'ㄷ': 'トゥ', 'ㄹ': 'ル', 'ㅁ': 'ム',
    'ㅂ': 'プ', 'ㅅ': 'ス', 'ㅇ': '', 'ㅈ': 'ジュ', 'ㅊ': 'チュ',
    'ㅋ': 'ク', 'ㅌ': 'トゥ', 'ㅍ': 'プ', 'ㅎ': 'フ'
  };

  // 組み合わせ用のマッピング調整
  // 標準的な組み合わせを使用します

  const cSound = consonantSoundMap[cChar];
  if (cSound === undefined) return [];

  // 特殊な組み合わせ
  // ㅇ (無音) -> 母音のみ
  if (cChar === 'ㅇ') return [vSound];

  // 標準的な組み合わせ: 子音 + 小さい母音（可能な場合）または単純結合
  // カタカナは全てのハングルの組み合わせ（"Twa"など）をネイティブにサポートしていません。
  // ここでは単純に結合します。

  // 戦略:
  // wa/wo/we/wi/ui -> 多くの子音の後に続くことができます。
  // 単純な結合: "ク" + "ワ" = "クワ"
  return [cSound + vSound];
};

const basicCombinations: HangulChar[] = [];


consonants.forEach(c => {
  vowels.forEach(v => {
    // 1. Basic C + V Blocks
    const code = ((c.uIndex * 21) + v.uIndex) * 28 + 0xAC00; // Patchim 0
    const char = String.fromCharCode(code);

    const isLevel3Vowel = !!v.isCompound;

    // Basic Kana/Romaji Generation
    let romajiMain = c.romajiStarts.map(s => s + v.romajiEnd);
    // specific logic for silent initial
    if (c.char === 'ㅇ') romajiMain = [v.romajiEnd];

    // Kana generation (simplified)
    let kanaMain = generateKana(c.char, v.char);
    if (c.char === 'ㅇ') kanaMain = [v.kanaEnd];

    basicCombinations.push({
      char,
      romaji: Array.from(new Set(romajiMain)),
      kana: kanaMain,
      type: v.isCompound ? 'block' : 'compound',
      level: isLevel3Vowel ? 3 : 2
    });
  });
});

// Level 3: パッチム付き文字 (各組み合わせからランダムに生成)
// 全組み合わせ (14子音 * 10母音 * 27パッチム) は多すぎるため、
// 一般的なものや練習になるものをランダムまたはアルゴリズムで生成します。

// ここでは動的に生成します。
const generateLevel3Data = (): HangulChar[] => {
  const l3Data: HangulChar[] = [];

  // 1. 合成母音の組み合わせ (パッチムなし)
  // 基本子音 + 合成母音
  /*
  const compoundVowels = [
    { k: 'ㅐ', r: ['ae'] }, { k: 'ㅒ', r: ['yae'] },
    { k: 'ㅔ', r: ['e'] }, { k: 'ㅖ', r: ['ye'] },
    { k: 'ㅘ', r: ['wa'] }, { k: 'ㅙ', r: ['wae'] },
    { k: 'ㅚ', r: ['oe'] }, { k: 'ㅝ', r: ['wo'] },
    { k: 'ㅞ', r: ['we'] }, { k: 'ㅟ', r: ['wi'] },
    { k: 'ㅢ', r: ['ui'] }
  ];
  */

  // 各子音に対していくつか生成
  // 省略: 合成母音の動的生成は計算が複雑なため、現在はスキップし、
  // パッチム付き文字の生成に焦点を当てます。

  // 代替案: 基本文字にパッチムを付ける
  // Level 2のデータ（基本子音+基本母音）にパッチムを付与

  // 全27種類のパッチムとその代表音設定
  const allPatchims = [
    // ㄱ [k]
    { char: 'ㄱ', romaji: 'k', kana: 'ッ', uIndex: 1 },
    { char: 'ㄲ', romaji: 'k', kana: 'ッ', uIndex: 2 },
    { char: 'ㄳ', romaji: 'k', kana: 'ッ', uIndex: 3 },
    { char: 'ㅋ', romaji: 'k', kana: 'ッ', uIndex: 24 },
    // ㄴ [n]
    { char: 'ㄴ', romaji: 'n', kana: 'ン', uIndex: 4 },
    { char: 'ㄵ', romaji: 'n', kana: 'ン', uIndex: 5 },
    { char: 'ㄶ', romaji: 'n', kana: 'ン', uIndex: 6 },
    // ㄷ [t]
    { char: 'ㄷ', romaji: 't', kana: 'ッ', uIndex: 7 },
    { char: 'ㅅ', romaji: 't', kana: 'ッ', uIndex: 19 },
    { char: 'ㅆ', romaji: 't', kana: 'ッ', uIndex: 20 },
    { char: 'ㅈ', romaji: 't', kana: 'ッ', uIndex: 22 },
    { char: 'ㅊ', romaji: 't', kana: 'ッ', uIndex: 23 },
    { char: 'ㅌ', romaji: 't', kana: 'ッ', uIndex: 25 },
    { char: 'ㅎ', romaji: 't', kana: 'ッ', uIndex: 27 },
    // ㄹ [l]
    { char: 'ㄹ', romaji: 'l', kana: 'ル', uIndex: 8 },
    { char: 'ㄺ', romaji: 'k', kana: 'ッ', uIndex: 9 }, // ※右側を読む例外
    { char: 'ㄻ', romaji: 'm', kana: 'ム', uIndex: 10 }, // ※右側を読む例外
    { char: 'ㄼ', romaji: 'l', kana: 'ル', uIndex: 11 },
    { char: 'ㄽ', romaji: 'l', kana: 'ル', uIndex: 12 },
    { char: 'ㄾ', romaji: 'l', kana: 'ル', uIndex: 13 },
    { char: 'ㄿ', romaji: 'p', kana: 'プ', uIndex: 14 }, // ※右側を読む例外
    { char: 'ㅀ', romaji: 'l', kana: 'ル', uIndex: 15 },
    // ㅁ [m]
    { char: 'ㅁ', romaji: 'm', kana: 'ム', uIndex: 16 },
    // ㅂ [p]
    { char: 'ㅂ', romaji: 'p', kana: 'プ', uIndex: 17 },
    { char: 'ㅄ', romaji: 'p', kana: 'プ', uIndex: 18 },
    { char: 'ㅍ', romaji: 'p', kana: 'プ', uIndex: 26 },
    // ㅇ [ng]
    { char: 'ㅇ', romaji: 'ng', kana: 'ン', uIndex: 21 },
  ];

  basicCombinations.forEach(base => {
    // 一部の文字にランダムなパッチムを追加
    if (Math.random() > 0.4) return; // 40%の確率に少しアップ

    const p = allPatchims[Math.floor(Math.random() * allPatchims.length)];
    const pIndex = p.uIndex;

    const baseCode = base.char.charCodeAt(0);
    const newCode = baseCode + pIndex;
    const newChar = String.fromCharCode(newCode);

    const newRomaji = base.romaji.map(r => r + p.romaji);
    const newKana = base.kana.map(k => k + p.kana);

    l3Data.push({
      char: newChar,
      romaji: newRomaji,
      kana: newKana,
      type: 'block',
      level: 3
    });
  });

  // 合成母音を含める (パッチムなし)
  // これは別途対応が必要ですが、まずはパッチムでL3とします。

  return l3Data;
};

// 基本母音用の簡略化されたカタカナマップ (レベル2対応)
// レベル3 (合成母音) の場合、"初声子音 + 母音の音" のヒューリスティックをデフォルトとします


// 1. Single Consonants (Level 1)
const singleConsonants: HangulChar[] = consonants.map(c => ({
  char: c.char,
  romaji: c.romajiStarts,
  kana: c.kanaStarts.filter(k => k !== 'ア' && k !== 'ン'),
  type: 'consonant',
  level: 1
}));
// Fix 'ㅇ'
singleConsonants.find(c => c.char === 'ㅇ')!.kana = ['ng', '-', 'ン'];

// 2. Single Vowels (Level 1)
const singleVowels: HangulChar[] = vowels.filter(v => !v.isCompound).map(v => ({
  char: v.char,
  romaji: [v.romajiEnd],
  kana: [v.kanaEnd],
  type: 'vowel',
  level: 1
}));
// Fix specific romanizations
const vEo = singleVowels.find(v => v.char === 'ㅓ'); if (vEo) vEo.romaji.push('o');
const vYeo = singleVowels.find(v => v.char === 'ㅕ'); if (vYeo) vYeo.romaji.push('yo');
const vEu = singleVowels.find(v => v.char === 'ㅡ'); if (vEu) vEu.romaji.push('u');

// データをエクスポート
export const hangulData: HangulChar[] = [
  ...singleConsonants,
  ...singleVowels,
  ...basicCombinations,
  ...generateLevel3Data()
];
