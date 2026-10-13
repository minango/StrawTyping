const words = [
    "猫", "りんご", "さくら", "いぬ", "そら",
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
    "あ": ["a"], "い": ["i"], "う": ["u", "wu", "whu"],
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
    "ふぇ": ["fe"], "ふぉ": ["fo"]
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
        "猫", "りんご", "桜", "いぬ", "そら",
        "たまご", "すいか", "はなび", "でんしゃ",
        "ともだち", "ひまわり", "ほしぞら",
        "がっこう", "しんぶん", "ありがとう"
    ],
    sentences: [
        "おはようございます",
        "きょうはいいてんきです",
        "ねこがにわであそんでいる",
        "まいにちすこしずつれんしゅうする",
        "すきなことをたのしくつづけよう"
    ],
    english: [
        "hello",
        "good morning",
        "thank you",
        "nice to meet you",
        "I like typing",
        "Have a nice day",
        "Practice makes progress"
    ]
};

// 長文タイムアタック用のお題
// 日本語はローマ字入力しやすいひらがな文
const longPassages = {
    japanese: [
        "あさはやくおきてまどをあけるとすずしいかぜがへやにはいってきましたきょうもすこしずつれんしゅうをつづけてじぶんのもくひょうにちかづいていきます",
        "すきなことをたのしくつづけるためにはあせらずにまいにちすこしずつとりくむことがたいせつですできることがふえるともっとじしんがついてきます"
    ],
    english: [
        "Typing is a skill that grows with practice. Stay relaxed, focus on accuracy, and keep a steady rhythm. Small improvements every day can lead to great results.",
        "A good practice session does not need to be perfect. Take your time, learn from mistakes, and enjoy seeing your speed improve little by little."
    ]
};

const TOTAL_QUESTIONS = 15;
const STORAGE_KEY = "strawTypingHistory";

const difficultySettings = {
    words: { label: "単語モード" },
    sentences: { label: "短文モード" },
    english: { label: "英文モード" },
    missLimit: { label: "ミス制限モード" },
    longText: { label: "長文タイムアタック" }
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

        const points = document.createElement("span");
        points.className = "history-score";
        points.textContent = `${item.correct || 0}問正解`;

        row.append(details, points);
        historyList.appendChild(row);
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
function updateRomaji() {
    const display = currentTokens
        .map(token => token[0])
        .join("");

    $("romaji").replaceChildren();

    const typedSpan = document.createElement("span");
    typedSpan.className = "typed";
    typedSpan.textContent = typed;

    const remainingSpan = document.createElement("span");
    remainingSpan.className = "remaining";
    remainingSpan.textContent = display.slice(typed.length);

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
            score++;
            correct++;

            playSound("correct");
            updateStats();

            if (score >= TOTAL_QUESTIONS) {
                finishGame();
            } else {
                $("message").textContent = "";
                scheduleNextWord();
            }
        } else {
            $("message").textContent = "";
        }

        return;
    }

    // 日本語モードは英字のみ
    if (!/^[a-z]$/i.test(key)) return;

    totalKeystrokes++;

    const newTyped = typed + key.toLowerCase();

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
    // お題を最後まで入力したら次の長文へ
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
        score++;
        correct++;

        playSound("correct");
        updateStats();

        if (score >= TOTAL_QUESTIONS) {
            finishGame();
        } else {
            $("message").textContent = "";
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
