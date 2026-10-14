const words = [
    "ねこ", "りんご", "さくら", "いぬ", "そら",
    "し", "ち", "つ", "ふ", "じ",
    "しゃ", "しゅ", "しょ", "ちゃ", "ちゅ", "ちょ",
    "じゃ", "じゅ", "じょ", "きゃ", "きゅ", "きょ",
    "にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ",
    "みゃ", "みゅ", "みょ", "りゃ", "りゅ", "りょ",
    "ぎゃ", "ぎゅ", "ぎょ", "びゃ", "びゅ", "びょ",
    "ぴゃ", "ぴゅ", "ぴょ", "てぃ", "でぃ",
    "うぃ", "うぇ", "うぉ", "たまご", "すいか",
    "はなび", "でんしゃ", "ありがとう", "おはよう",
    "ともだち", "ひまわり", "ちから", "ほしぞら",
    "がっこう", "きって", "しんぶん"
].map(japanese => ({ japanese }));

// ローマ字変換表
const base = {
    "あ": ["a"], "い": ["i", "yi"], "う": ["u", "wu", "whu"],
    "え": ["e"], "お": ["o"],
    "か": ["ka", "ca"], "き": ["ki"], "く": ["ku", "cu", "qu"],
    "け": ["ke"], "こ": ["ko", "co"],
    "さ": ["sa"], "し": ["shi", "si", "ci"], "す": ["su"],
    "せ": ["se", "ce"], "そ": ["so"],
    "た": ["ta"], "ち": ["chi", "ti"], "つ": ["tsu", "tu"],
    "て": ["te"], "と": ["to"],
    "な": ["na"], "に": ["ni"], "ぬ": ["nu"], "ね": ["ne"], "の": ["no"],
    "は": ["ha"], "ひ": ["hi"], "ふ": ["fu", "hu"], "へ": ["he"], "ほ": ["ho"],
    "ま": ["ma"], "み": ["mi"], "む": ["mu"], "め": ["me"], "も": ["mo"],
    "や": ["ya"], "ゆ": ["yu"], "よ": ["yo"],
    "ら": ["ra"], "り": ["ri"], "る": ["ru"], "れ": ["re"], "ろ": ["ro"],
    "わ": ["wa"], "を": ["wo", "o"], "ん": ["nn", "n", "xn"],
    "が": ["ga"], "ぎ": ["gi"], "ぐ": ["gu"], "げ": ["ge"], "ご": ["go"],
    "ざ": ["za"], "じ": ["ji", "zi"], "ず": ["zu"], "ぜ": ["ze"], "ぞ": ["zo"],
    "だ": ["da"], "ぢ": ["di", "ji"], "づ": ["du", "zu"],
    "で": ["de"], "ど": ["do"],
    "ば": ["ba"], "び": ["bi"], "ぶ": ["bu"], "べ": ["be"], "ぼ": ["bo"],
    "ぱ": ["pa"], "ぴ": ["pi"], "ぷ": ["pu"], "ぺ": ["pe"], "ぽ": ["po"],
    "ぁ": ["xa", "la"], "ぃ": ["xi", "li"], "ぅ": ["xu", "lu"],
    "ぇ": ["xe", "le"], "ぉ": ["xo", "lo"],
    "ゃ": ["xya", "lya"], "ゅ": ["xyu", "lyu"], "ょ": ["xyo", "lyo"],
    "っ": ["xtu", "ltu", "xtsu", "ltsu"],
    "ふぁ": ["fa", "fwa"], "ふぃ": ["fi", "fyi"],
    "ふぇ": ["fe"], "ふぉ": ["fo"], "ふぇ": ["fe"], "ふぉ": ["fo"],
    "、": [","],
    "。": ["."],
    "ー": ["-"]
};

const smallY = {
    "ゃ": ["xya", "lya"],
    "ゅ": ["xyu", "lyu"],
    "ょ": ["xyo", "lyo"]
};

const combo = {
    "きゃ": ["kya"], "きゅ": ["kyu"], "きょ": ["kyo"],
    "しゃ": ["sha", "sya"], "しゅ": ["shu", "syu"], "しょ": ["sho", "syo"],
    "ちゃ": ["cha", "tya", "cya"], "ちゅ": ["chu", "tyu", "cyu"],
    "ちょ": ["cho", "tyo", "cyo"],
    "にゃ": ["nya"], "にゅ": ["nyu"], "にょ": ["nyo"],
    "ひゃ": ["hya"], "ひゅ": ["hyu"], "ひょ": ["hyo"],
    "みゃ": ["mya"], "みゅ": ["myu"], "みょ": ["myo"],
    "りゃ": ["rya"], "りゅ": ["ryu"], "りょ": ["ryo"],
    "ぎゃ": ["gya"], "ぎゅ": ["gyu"], "ぎょ": ["gyo"],
    "じゃ": ["ja", "jya", "zya"], "じゅ": ["ju", "jyu", "zyu"],
    "じょ": ["jo", "jyo", "zyo"],
    "びゃ": ["bya"], "びゅ": ["byu"], "びょ": ["byo"],
    "ぴゃ": ["pya"], "ぴゅ": ["pyu"], "ぴょ": ["pyo"],
    "てぃ": ["thi", "texi", "t'i"],
    "でぃ": ["dhi", "dexi", "d'i"],
    "うぃ": ["wi", "whi", "uxi"],
    "うぇ": ["we", "whe", "uxe"],
    "うぉ": ["who", "uxo"]
};

const modePrompts = {
    words: [
        "しょうがくせい", "しょうがっこう", "ちゅうがくせい", "ちゅうがっこう", "こうこうせい",
    "こうとうがっこう", "こくご", "さんすう", "すうがく", "りか",
    "しゃかい", "えいご", "しょうぼうし", "しょうぼうしゃ", "ひょうげん", "ひょうじょう",
    "じゃくにくきょうしょく", "つうじょう", "ふつう", "きりぎりす", "こうたい", "ほうたい",
    "こうちょう", "こうちょうしつ", "ひんぱん", "ふぁいる", "たっきゅう", "てにす",
    "あそぶ", "こわい", "さいぼう", "きょうそう", "きょうそうきょく", "ばしょ",
    "なんこつ", "ぎゅうどん", "しずむ", "らくたん", "かし", "かしゅ",
    "しるし", "ぼうそう", "たまご", "どんまい", "ぶんしょう",
    "ぶんせつ", "たんご", "ちょうぶん", "ちょうし", "すいか",
    "はなび", "きゅうきゅうしゃ", "きゅうしょく", "おはよう",
    "ともだち", "ほしぞら", "しょうごう", "かんせい",
    "がっこう", "よろこぶ", "しんぶん"
    ],
    sentences: [
    "おはようございます",
    "しょうがくせいといっしょにきゅうしょくをたべる",
    "ねこがにわであそんでいる",
    "まいにちすこしずつれんしゅうする",
    "すきなことをたのしくつづけよう",
    "じんせいはたのしい",
    "どうがのこうこくがながい",
    "こうこくのまちじかんにたいぴんぐをする",
    "しゅうちゅうりょくをたもつ",
    "まいにちてきどにすいぶんほきゅう",
    "しょうがくせいがしょうらいしょうぼうしになる",
    "とうかいどうしんかんせんにのりおくれる",
    "べんきょうはりょうよりこうりつがだいじ",
    "たいぴんぐのちょうしがわるい",
    "こくりつがっこうにかようせいと",
    "じゅうみんのふまんをむしするしちょう",
    "どうがのしちょうしゃがふえることによろこぶ",
    "たいぴんぐさいとのぶんしょうをかんがえるのはとてもたいへんだ",
    "もくひょうはしょうり",
    "ちゅうがくせいがうちゅうひこうしをめざす",
    "けっこううちやすいぶんしょう",
    "どうろをこうじする",
    "かみのげんかいをにんげんがたっせいしてしまう",
    "せかいのちょうてんにたつ",
    "しょうがくせいがしょうがをたべてしまうことはしょうがない",
    "こうそくどうろをつうこうするきゅうきゅうしゃ",
    "ほうしゃせいぶっしつをほうちする",
    "ひとのこころをかしかする",
    "ながいうたをうたう",
    "こうこうせいがほうたいをこうかんする",
    "さべつのないよのなか",
    "まいにちたんたんめんをたべる",
    "じぶんのちからでじしんをおこしてじしんのじしんをこうじょうする",
    "じゅうぶんたのしいたいぴんぐさいとをつくる",
    "あともうちょっとでおわる",
    "ちきゅうおんだんかをとめたい",
    "こうちょうそうちょうぜっこうちょう",
    "きゅうしょくとうばんのしごとをさぼる",
    "さいこうにおいしいおべんとう",
    "あらそいたえることないせまいかいわい",
    "めずらしいずかんをこうにゅうする"
],
    english: [
    "Good morning.",
    "Thank you.",
    "We want more time to finish.",
    "What are you doing now?",
    "I am going to see a movie tonight.",
    "Do you do your homework?",
    "I run in the park before school.",
    "This is Haru.",
    "I like typing.",
    "This is your size.",
    "Many of the men and women are far away.",
    "We come through the gate.",
    "I found his key.",
    "He put on his jacket.",
    "He is putting water into the bottle.",
    "I teach you.",
    "Practice makes perfect.",
    "I hit the ball with the bat.",
    "We found it easy to use the app.",
    "I am such a genius.",
    "You can open online data to save the menu.",
    "The admin can check the visual signals on site."
]
};

// 日本語はローマ字入力しやすいひらがな文
const longPassages = {
    japanese: [
    "あさのひかりがまどからさしこみ、へやのなかがすこしずつあかるくなりました。わたしはかおをあらい、あさごはんをたべてから、きょうのよていをのーとにかきました。そとではことりがなき、にわのきにはちいさなはがかぜにゆれています。がっこうへむかうみちでは、ちかくのひとにあいさつをしました。いつものけしきにも、あたらしいはっけんがあります。",

    "たいぴんぐがじょうずになるには、はやさだけでなく、せいかくさをいしきすることがたいせつです。はじめはキーのばしょをさがすのにじかんがかかっても、すこしずつれんしゅうすれば、ゆびのうごきがしぜんになります。ほーむぽじしょんにもどるくせをつけると、つぎのもじをうちやすくなります。まちがえたときは、あせらずにかくにんしましょう。",

    "やすみのひのごご、わたしはちかくのこうえんまでさんぽにでかけました。みちのわきにはいろとりどりのはながさき、きのはのあいだからやわらかなひかりがさしていました。ひろばではこどもたちがげんきにあそび、べんちではほんをよんでいるひとがいます。わたしはそらをながめながら、ゆっくりとしたじかんをたのしみました。",

    "あたらしいことをはじめるとき、さいしょからじょうずにできるひとはおおくありません。しっぱいしても、くりかえしちょうせんすることで、すこしずつできることがふえていきます。おおきなもくひょうだけでなく、きょうできるちいさなことをたいせつにしましょう。つかれたときにはやすみ、じぶんのぺーすでつづけることが、せいちょうにつながります。",

    "としょかんには、しらないせかいをおしえてくれるほんがたくさんあります。どうぶつのくらしや、とおいくにのぶんか、かがくのふしぎについてかかれたほんなど、しゅるいもさまざまです。わたしはせんじつ、ほしやつきについてのほんをよみました。きになったことをのーとにかいてしらべると、いつものけしきにもあたらしいはっけんがふえていきます。"
],
    english: [
    "Typing is a skill that improves with practice. Start slowly and focus on accuracy before trying to type faster. When you make a mistake, take a moment to find the correct key and try again. A little practice every day can help you become more confident. Enjoy learning at your own pace and celebrate every small improvement.",

    "Every morning, I wake up and get ready for a new day. I eat breakfast, check my school bag, and make sure I have everything I need. On my way to school, I enjoy looking at the sky and the trees along the road. Even an ordinary day can bring something interesting if we pay attention to the world around us.",

    "Reading books is a great way to discover new ideas. Some books teach us about science, while others tell exciting stories about people and places. When I find something interesting, I write it in my notebook so I can remember it later. Sharing ideas with friends also helps me see things from a different point of view.",

    "Learning something new can be difficult at first. You may make mistakes or feel that you are not improving quickly enough. However, every attempt gives you another chance to learn. Set a small goal, practice regularly, and take breaks when you need them. The most important thing is to keep enjoying the process and move forward at your own pace.",

    "On a sunny afternoon, I visited a park near my home. Children were playing on the grass, and birds were singing in the trees. I sat on a bench and watched the clouds slowly move across the sky. After a while, I walked to a small bakery and bought some fresh bread. It was a simple day, but it made me feel relaxed and happy."
]
};

const TOTAL_QUESTIONS = 15;
const STORAGE_KEY = "strawTypingHistory";

const difficultySettings = {
    words: { label: "単語モード" },
    sentences: { label: "短文モード" },
    english: { label: "英文モード" },
    missLimit: { label: "ミス制限モード" },
    longText: { label: "長文モード" }
};

const $ = id => document.getElementById(id);

const screens = {
    home: $("homeScreen"),
    game: $("gameScreen"),
    result: $("resultScreen")
};

let currentWord = null;
let currentTokens = [];
let typed = "";

// 1つの文章ごとの計測
let promptStartedAt = 0;
let promptFirstKeyAt = null;

let score = 0;
let correct = 0;
let mistakes = 0;
let totalKeystrokes = 0;
let correctKeystrokes = 0;

let playing = false;
let countdownRunning = false;
let soundEnabled = true;
let currentDifficulty = "words";
let activePromptMode = "words";
let gameStartedAt = 0;
let missLimit = 5;
let invalidRecord = false;
let timerInterval = null;
let timeRemaining = 30;

let totalPausedTime = 0;
let pauseStartedAt = null;
let nextWordTimer = null;

// 画面切り替え
function showScreen(name) {
    Object.entries(screens).forEach(([key, element]) => {
        if (element) element.hidden = key !== name;
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 待ち時間を除いた経過時間
function getElapsedTime() {
    if (!gameStartedAt) return 0;

    const now = pauseStartedAt ?? Date.now();

    return Math.max(
        0,
        now - gameStartedAt - totalPausedTime
    );
}

// 文章ごとのKPMと初速を表示
function showPromptStats() {
    const elapsedSeconds =
        (Date.now() - promptStartedAt) / 1000;

    const kpm = elapsedSeconds > 0
        ? Math.round(typed.length * 60 / elapsedSeconds)
        : 0;

    const firstSpeed = promptFirstKeyAt !== null
        ? ((promptFirstKeyAt - promptStartedAt) / 1000)
            .toFixed(2)
        : "未入力";

    $("message").textContent =
        `KPM：${kpm} ／ 初速：${firstSpeed}${
            firstSpeed === "未入力" ? "" : "秒"
        }`;
}

// 次の問題を700ms後に表示
function scheduleNextWord() {
    clearTimeout(nextWordTimer);

    pauseStartedAt = Date.now();

    nextWordTimer = setTimeout(() => {
        if (pauseStartedAt !== null) {
            totalPausedTime += Date.now() - pauseStartedAt;
            pauseStartedAt = null;
        }

        nextWordTimer = null;

        if (playing && !$("gameScreen").hidden) {
            nextWord();
        }
    }, 700);
}

// 履歴
function getHistory() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.warn("履歴を保存できませんでした。", error);
    }
}

// 効果音
function playSound(type = "correct") {
    if (!soundEnabled) return;

    try {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) return;

        const audio = new AudioContextClass();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = type === "correct" ? 740 : 180;
        gain.gain.value = 0.045;

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start();
        oscillator.stop(audio.currentTime + 0.09);
        oscillator.onended = () => audio.close();
    } catch {
        // 効果音が使えなくてもゲームは続行
    }
}
// 統計情報
function updateStats() {
    const elapsedSeconds = getElapsedTime() / 1000;

    const kpm = elapsedSeconds > 0
        ? Math.round(correctKeystrokes * 60 / elapsedSeconds)
        : 0;

    const accuracy = totalKeystrokes > 0
        ? Math.round(correctKeystrokes / totalKeystrokes * 100)
        : 100;

    $("currentKpm").textContent = kpm;
    $("currentAccuracy").textContent = `${accuracy}%`;
    $("currentMistakes").textContent = mistakes;
    $("questionCount").textContent = currentDifficulty === "longText"
        ? `${correctKeystrokes} 字`
        : `${score} / ${TOTAL_QUESTIONS}`;
}

// ランキングと履歴
function refreshRecords() {
    const history = getHistory();


const best = history.reduce(
    (maximum, item) => Math.max(maximum, item.kpm || 0),
    0
);

$("bestScore").textContent = best;
$("playCount").textContent = `${history.length}回`;

// モード別の最高KPM
const modeRecords = [
    ["bestWords", "単語モード"],
    ["bestSentences", "短文モード"],
    ["bestEnglish", "英文モード"],
    ["bestMissLimit", "ミス制限モード"],
    ["bestLongText", "長文モード"]
];

modeRecords.forEach(([elementId, modeName]) => {
    const modeBest = history
        .filter(item => item.difficulty === modeName)
        .reduce(
            (maximum, item) => Math.max(maximum, item.kpm || 0),
            0
        );

    $(elementId).textContent =
        modeBest > 0 ? `KPM ${modeBest}` : "記録なし";
});


    const ranking = [...history]
        .sort((a, b) => (b.kpm || 0) - (a.kpm || 0))
        .slice(0, 5);

    const rankingList = $("rankingList");
    rankingList.replaceChildren();

    if (ranking.length === 0) {
        const li = document.createElement("li");
        li.className = "empty-record";
        li.textContent = "まだ記録がありません。";
        rankingList.appendChild(li);
    } else {
        ranking.forEach(item => {
            const li = document.createElement("li");
            li.textContent =
                `KPM ${item.kpm || 0} — ${item.difficulty} / 正確性 ${item.accuracy}%`;
            rankingList.appendChild(li);
        });
    }

    const historyList = $("historyList");
    historyList.replaceChildren();

    if (history.length === 0) {
        const p = document.createElement("p");
        p.className = "muted";
        p.textContent = "プレイすると、ここに記録が表示されます。";
        historyList.appendChild(p);
        return;
    }

    history.slice(-10).reverse().forEach(item => {
        const row = document.createElement("div");
        row.className = "history-item";

        const details = document.createElement("div");
        const title = document.createElement("strong");
        const date = document.createElement("small");

        title.textContent =
            `${item.difficulty} · KPM ${item.kpm || 0} · 正確性 ${item.accuracy}% · ミス ${item.mistakes || 0}回`;

        date.textContent = item.date;

        details.append(title, date);


        row.appendChild(details);
        historyList.appendChild(row);
;
    });
}

// ランダムなお題
function getRandomWord() {
    const prompts = modePrompts[activePromptMode] || modePrompts.words;
    let next;

    do {
        next = {
            japanese: prompts[
                Math.floor(Math.random() * prompts.length)
            ]
        };
    } while (
        prompts.length > 1 &&
        next.japanese === currentWord?.japanese
    );

    return next;
}

// 入力が正解につながるか判定
function canMatch(typedText, tokens, exact = false) {
    function search(tokenIndex, position) {
        if (tokenIndex === tokens.length) {
            return exact ? position === typedText.length : true;
        }

        for (const option of tokens[tokenIndex]) {
            const remaining = typedText.slice(position);
            const commonLength = Math.min(
                remaining.length,
                option.length
            );

            if (
                remaining.slice(0, commonLength) !==
                option.slice(0, commonLength)
            ) {
                continue;
            }

            if (remaining.length <= option.length) {
                if (remaining.length < option.length) {
                    if (!exact) return true;
                } else if (
                    search(tokenIndex + 1, position + option.length)
                ) {
                    return true;
                }
            } else if (
                search(tokenIndex + 1, position + option.length)
            ) {
                return true;
            }
        }

        return false;
    }

    return search(0, 0);
}

// 日本語をローマ字候補に分解
function getTokens(japanese) {
    const tokens = [];
    let i = 0;

    while (i < japanese.length) {
        const pair = japanese.slice(i, i + 2);

        if (combo[pair]) {
            const options = [...combo[pair]];
            const firstKana = japanese[i];
            const smallKana = japanese[i + 1];

            if (base[firstKana] && smallY[smallKana]) {
                for (const first of base[firstKana]) {
                    for (const second of smallY[smallKana]) {
                        options.push(first + second);
                    }
                }
            }

            tokens.push([...new Set(options)]);
            i += 2;
            continue;
        }

        if (base[pair]) {
            tokens.push(base[pair]);
            i += 2;
            continue;
        }

        const kana = japanese[i];

        if (kana === "っ") {
            const next = getTokens(japanese.slice(i + 1))[0] || [];
            const doubled = next
                .map(option => option[0])
                .filter(char =>
                    char && /[bcdfghjklmnpqrstvwxyz]/.test(char)
                );

            tokens.push([...new Set([...base[kana], ...doubled])]);
        } else if (base[kana]) {
            tokens.push(base[kana]);
        } else {
            tokens.push([kana]);
        }

        i++;
    }

    return tokens;
}

// ローマ字表示
// 入力したローマ字に合わせて残りの表示を更新
function updateRomaji() {
    // 今の入力に合うローマ字ルートを探す
    function findRemaining(tokenIndex, position) {
        // すべての入力候補を使い切った
        if (tokenIndex >= currentTokens.length) {
            return position === typed.length ? "" : null;
        }

        // 入力済みの位置なら、残りは標準の候補で表示
        if (position === typed.length) {
            return currentTokens
                .slice(tokenIndex)
                .map(token => token[0])
                .join("");
        }

        const remainingTyped = typed.slice(position);

        for (const option of currentTokens[tokenIndex]) {
            const commonLength = Math.min(
                remainingTyped.length,
                option.length
            );

            // 入力と候補の先頭が一致しなければ次の候補へ
            if (
                remainingTyped.slice(0, commonLength) !==
                option.slice(0, commonLength)
            ) {
                continue;
            }

            // 候補の途中まで入力している
            if (remainingTyped.length < option.length) {
                return option.slice(remainingTyped.length) +
                    currentTokens
                        .slice(tokenIndex + 1)
                        .map(token => token[0])
                        .join("");
            }

            // この候補を入力し終えたので次の文字へ
            const result = findRemaining(
                tokenIndex + 1,
                position + option.length
            );

            if (result !== null) {
                return result;
            }
        }

        return null;
    }

    const remaining = findRemaining(0, 0);

    $("romaji").replaceChildren();

    const typedSpan = document.createElement("span");
    typedSpan.className = "typed";
    typedSpan.textContent = typed;

    const remainingSpan = document.createElement("span");
    remainingSpan.className = "remaining";

    remainingSpan.textContent = remaining ??
        currentTokens.map(token => token[0]).join("").slice(typed.length);

    $("romaji").append(typedSpan, remainingSpan);
}

// 次のお題
function nextWord() {
    if (currentDifficulty === "longText") {
        const language = $("longLanguage").value;
        const passages = longPassages[language];

        currentWord = {
            japanese: passages[
                Math.floor(Math.random() * passages.length)
            ]
        };
    } else {
        currentWord = getRandomWord();
    }

    typed = "";

    promptStartedAt = Date.now();
    promptFirstKeyAt = null;

    $("romaji").classList.remove("mistake");
    $("word").textContent = currentWord.japanese;

    if (activePromptMode === "english") {
        currentTokens = [];
        $("romaji").replaceChildren();

        const remaining = document.createElement("span");
        remaining.className = "remaining";
        remaining.textContent = currentWord.japanese;

        $("romaji").appendChild(remaining);
        return;
    }

    currentTokens = getTokens(currentWord.japanese);
    updateRomaji();
}

// ゲーム開始
function startGame() {
    if (countdownRunning || playing) return;

    clearTimeout(nextWordTimer);
    nextWordTimer = null;
    totalPausedTime = 0;
    pauseStartedAt = null;

    currentDifficulty = $("difficulty").value;
    $("gameScreen").classList.toggle(
    "long-text-mode",
    currentDifficulty === "longText"
    );
    invalidRecord = false;
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = 30;

    if (currentDifficulty === "missLimit") {
        activePromptMode = $("missType").value;
        missLimit = Math.max(
            1,
            Number.parseInt($("missLimit").value, 10) || 1
        );
    } else if (currentDifficulty === "longText") {
        activePromptMode =
            $("longLanguage").value === "english"
                ? "english"
                : "sentences";
    } else {
        activePromptMode = currentDifficulty;
    }

    // 表示する統計ラベルをモードに合わせる
    const questionLabel =
        document.querySelector("#questionCount").previousElementSibling;

    questionLabel.textContent =
        currentDifficulty === "longText"
            ? "正しく入力した文字"
            : "問題数";

    $("message").textContent = "準備してね！";

    score = 0;
    correct = 0;
    mistakes = 0;
    totalKeystrokes = 0;
    correctKeystrokes = 0;
    typed = "";
    currentWord = null;
    currentTokens = [];

    playing = false;
    countdownRunning = true;
    gameStartedAt = 0;

    $("currentKpm").textContent = "0";
    $("currentAccuracy").textContent = "100%";
    $("currentMistakes").textContent = "0";
    $("questionCount").textContent = `0 / ${TOTAL_QUESTIONS}`;
    $("word").textContent = "準備中…";
    $("romaji").replaceChildren();
    $("romaji").classList.remove("mistake");
    $("message").textContent = "準備してね！";

    showScreen("game");

    const overlay = $("countdownOverlay");
    const number = $("countdownNumber");

    overlay.hidden = false;
    number.textContent = "3";

    let count = 3;

    const countdownInterval = setInterval(() => {
        count--;

        if (count > 0) {
            number.textContent = String(count);
        } else {
            clearInterval(countdownInterval);

            overlay.hidden = true;
            countdownRunning = false;
            playing = true;
            gameStartedAt = Date.now();

            $("message").textContent =
                currentDifficulty === "longText"
                    ? "残り30秒！できるだけ正確に入力しよう！"
                    : "頑張ってください！";

            nextWord();
            updateStats();

            if (currentDifficulty === "longText") {
                timerInterval = setInterval(() => {
                    const elapsed = Math.floor(
                        getElapsedTime() / 1000
                    );

                    timeRemaining = Math.max(0, 30 - elapsed);
                    $("message").textContent =
                        `残り時間：${timeRemaining}秒`;

                    if (timeRemaining <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        finishGame();
                    }
                }, 100);
            }
        }
    }, 1000);
}

// ゲーム終了
function finishGame(cancelled = false) {
    if (!playing) return;

    const elapsedMinutes = Math.max(
        getElapsedTime() / 60000,
        0.001
    );

    clearTimeout(nextWordTimer);
    nextWordTimer = null;
    clearInterval(timerInterval);
    timerInterval = null;
    pauseStartedAt = null;

    playing = false;

    const kpm = Math.round(
        correctKeystrokes / elapsedMinutes
    );

    const accuracy = totalKeystrokes === 0
        ? 100
        : Math.round(
            correctKeystrokes / totalKeystrokes * 100
        );

    const recordValid = !cancelled && !invalidRecord;

    if (recordValid) {
        const history = getHistory();

        history.push({
            score,
            correct: score,
            accuracy,
            mistakes,
            kpm,
            difficulty: difficultySettings[currentDifficulty].label,
            date: new Date().toLocaleString("ja-JP")
        });

        saveHistory(history.slice(-100));
    }

    $("resultTitle").textContent = cancelled
        ? "ゲームを中断しました"
        : invalidRecord
            ? "記録は無効です"
            : currentDifficulty === "longText"
                ? "30秒終了！"
                : score >= TOTAL_QUESTIONS
                    ? "15問クリア！"
                    : "おつかれさま！";

    $("resultMessage").textContent = cancelled
        ? "今回は記録に保存していません。"
        : invalidRecord
            ? `ミス上限の${missLimit}回に到達したため、今回の記録は保存されません。`
            : currentDifficulty === "longText"
                ? "30秒間の入力結果はこちら！"
                : "今回のプレイ結果はこちら！";

    $("resultMistakes").textContent = `${mistakes}回`;

    $("resultCorrect").textContent =
        currentDifficulty === "longText"
            ? `${correctKeystrokes}字`
            : `${score}/${TOTAL_QUESTIONS}問`;

    $("resultAccuracy").textContent = `${accuracy}%`;
    $("resultKpm").textContent = kpm;
    $("resultDifficulty").textContent =
        difficultySettings[currentDifficulty].label;

    showScreen("result");
    refreshRecords();
}

// ホームへ戻る
function goHome() {
    if (playing) {
        finishGame(true);
    } else {
        showScreen("home");
    }
}

// 選択したモードに応じて追加設定を表示
function updateModeSettings() {
    const mode = $("difficulty").value;

    $("missSettings").hidden = mode !== "missLimit";
    $("longSettings").hidden = mode !== "longText";
}

$("difficulty").addEventListener("change", updateModeSettings);
updateModeSettings();

// ボタン
$("startButton").addEventListener("click", startGame);
$("retryButton").addEventListener("click", startGame);

$("resultHomeButton").addEventListener("click", () => {
    showScreen("home");
    refreshRecords();
});

$("quitButton").addEventListener("click", () => {
    finishGame(true);
});

$("homeLink").addEventListener("click", event => {
    event.preventDefault();
    goHome();
});

$("soundButton").addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    $("soundButton").textContent =
        `効果音：${soundEnabled ? "ON" : "OFF"}`;

    if (soundEnabled) playSound("correct");
});

$("clearHistoryButton").addEventListener("click", () => {
    if (confirm("プレイ履歴をすべて削除しますか？")) {
        saveHistory([]);
        refreshRecords();
    }
});
// キーボード入力
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && playing) {
        event.preventDefault();
        finishGame(true);
        return;
    }

    if (!playing) return;

    // 次の問題が表示されるまで入力を受け付けない
    if (pauseStartedAt !== null) return;

    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const key = event.key;

    if (
        promptFirstKeyAt === null &&
         key.length === 1 &&
          (
               activePromptMode === "english"
                 ? /^[a-z0-9 .,!?'-]$/i.test(key)
                    : /^[a-z,、，]$/i.test(key)
          )
        ) {
              promptFirstKeyAt = Date.now();
        }

    // 長文タイムアタック：英語
    if (
        currentDifficulty === "longText" &&
        activePromptMode === "english"
    ) {
        if (key.length !== 1) return;

        totalKeystrokes++;

        const newTyped = typed + key;
        const target = currentWord.japanese;

        if (
            !target.toLowerCase().startsWith(
                newTyped.toLowerCase()
            )
        ) {
            mistakes++;
            $("romaji").classList.add("mistake");

            if (
                currentDifficulty === "missLimit" &&
                mistakes >= missLimit
            ) {
                invalidRecord = true;
                finishGame();
                return;
            }

            playSound("wrong");
            updateStats();
            return;
        }

        $("romaji").classList.remove("mistake");

        typed = newTyped;
        correctKeystrokes++;

        const done = document.createElement("span");
        done.className = "typed";
        done.textContent = target.slice(0, typed.length);

        const rest = document.createElement("span");
        rest.className = "remaining";
        rest.textContent = target.slice(typed.length);

        $("romaji").replaceChildren(done, rest);
        updateStats();

        if (typed.length === target.length) {
            score++;
            correct++;
            playSound("correct");
            nextWord();
            updateStats();
        }

        return;
    }

    // 英文モード
    if (activePromptMode === "english") {
        if (key.length !== 1) return;

        totalKeystrokes++;

        const newTyped = typed + key;
        const target = currentWord.japanese;

        if (
            !target.toLowerCase().startsWith(
                newTyped.toLowerCase()
            )
        ) {
            mistakes++;
            $("message").textContent = "";
            $("romaji").classList.add("mistake");

            if (
                currentDifficulty === "missLimit" &&
                mistakes >= missLimit
            ) {
                invalidRecord = true;
                finishGame();
                return;
            }

            playSound("wrong");
            updateStats();
            return;
        }

        // 正しいキーなら赤色を解除
        $("romaji").classList.remove("mistake");

        typed = newTyped;
        correctKeystrokes++;

        $("romaji").replaceChildren();

        const done = document.createElement("span");
        done.className = "typed";
        done.textContent = target.slice(0, typed.length);

        const rest = document.createElement("span");
        rest.className = "remaining";
        rest.textContent = target.slice(typed.length);

        $("romaji").append(done, rest);
        updateStats();

        if (typed.length === target.length) {
        showPromptStats();
         score++;
         correct++;

         playSound("correct");
            updateStats();

            if (score >= TOTAL_QUESTIONS) {
               finishGame();
         } else {
                scheduleNextWord();
          }
        } else {
          $("message").textContent = "";
        }

              return;
            }


if (!/^[a-z,、，.。-]$/i.test(key)) return;
    totalKeystrokes++;


    const newTyped = typed + (
    key === "、" || key === "，"
        ? ","
        : key === "。"
            ? "."
            : key.toLowerCase()
);

    if (!canMatch(newTyped, currentTokens)) {
        mistakes++;
        $("message").textContent = "";
        $("romaji").classList.add("mistake");

        if (
            currentDifficulty === "missLimit" &&
            mistakes >= missLimit
        ) {
            invalidRecord = true;
            finishGame();
            return;
        }

        playSound("wrong");
        updateStats();
        return;
    }

    $("romaji").classList.remove("mistake");

    typed = newTyped;
    correctKeystrokes++;

    updateRomaji();
    updateStats();

    // 長文タイムアタック（日本語）
    if (currentDifficulty === "longText") {
        if (canMatch(typed, currentTokens, true)) {
            score++;
            correct++;
            playSound("correct");
            nextWord();
            updateStats();
        }

        return;
    }

    // すべて入力し終えたかを確認
    if (canMatch(typed, currentTokens, true)) {
        showPromptStats();
        score++;
        correct++;

        playSound("correct");
        updateStats();

        if (score >= TOTAL_QUESTIONS) {
            finishGame();
        } else {
            scheduleNextWord();
        }
    } else {
        $("message").textContent = "";
    }

});

// ホーム画面・結果画面でSpaceキーを押すと開始
document.addEventListener("keydown", event => {
    if (event.code !== "Space") return;

    const tag = event.target.tagName;

    if (
        tag === "BUTTON" ||
        tag === "INPUT" ||
        tag === "SELECT" ||
        tag === "TEXTAREA"
    ) {
        return;
    }

    if (playing || countdownRunning) return;

    const homeVisible = !$("homeScreen").hidden;
    const resultVisible = !$("resultScreen").hidden;

    if (homeVisible || resultVisible) {
        event.preventDefault();
        startGame();
    }
});

// 初期表示
$("soundButton").textContent = "効果音：ON";
refreshRecords();
showScreen("home");
refreshRecords();
