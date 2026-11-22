(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const profileKeys = ["ethiopia", "colombia", "brazil", "yunnan"];
  const profiles = {
    ethiopia: {
      key: "ethiopia",
      number: "01",
      lot: "ETH-01",
      name: "埃塞俄比亚",
      region: "耶加雪菲 · 科契尔",
      notes: "花香 · 柑橘 · 蜂蜜",
      altitude: "1,900–2,200 m",
      variety: "原生种",
      process: "水洗",
      roast: "浅烘",
      texture: "轻盈、果汁感",
      story: "高海拔慢熟与精细水洗共同保留了茉莉花香。浅烘让柑橘酸质更清晰，冷却后转成蜂蜜与红茶的甜感。",
      brew: "92°C · 粉水比 1:15 · 2 分 10 秒",
      pairing: "柠檬磅蛋糕",
      color: "#cde46e",
      questions: [
        {
          title: "干香最先靠近哪一种线索？",
          options: [
            ["白色花香", true],
            ["烘烤坚果", false],
            ["红茶与红糖", false]
          ]
        },
        {
          title: "入口后，明亮的酸质更像什么？",
          options: [
            ["柑橘和桃子", true],
            ["可可与奶油", false],
            ["草本与香料", false]
          ]
        },
        {
          title: "杯中留下怎样的余韵？",
          options: [
            ["蜂蜜般的清甜", true],
            ["厚重的焦糖", false],
            ["木质与烟熏", false]
          ]
        }
      ]
    },
    colombia: {
      key: "colombia",
      number: "02",
      lot: "COL-02",
      name: "哥伦比亚",
      region: "慧兰 · 皮塔利托",
      notes: "焦糖 · 红苹果 · 圆润",
      altitude: "1,650–1,900 m",
      variety: "卡杜拉 / 卡斯蒂略",
      process: "水洗",
      roast: "中浅烘",
      texture: "圆润、糖浆感",
      story: "昼夜温差让果实积累更完整的糖分。柔和苹果酸与焦糖甜感相互支撑，是一支容易入口、又有层次的日常咖啡。",
      brew: "91°C · 粉水比 1:15 · 2 分 20 秒",
      pairing: "苹果肉桂卷",
      color: "#ffb07a",
      questions: [
        {
          title: "最明显的香气接近哪一种？",
          options: [
            ["熟苹果与焦糖", true],
            ["茉莉与柠檬", false],
            ["黑巧克力", false]
          ]
        },
        {
          title: "它的酸质给你什么感受？",
          options: [
            ["柔和、圆润", true],
            ["尖锐、明亮", false],
            ["几乎没有酸质", false]
          ]
        },
        {
          title: "温度下降后，甜感变得更像？",
          options: [
            ["红糖和坚果", true],
            ["热带水果", false],
            ["茶叶", false]
          ]
        }
      ]
    },
    brazil: {
      key: "brazil",
      number: "03",
      lot: "BRA-03",
      name: "巴西",
      region: "喜拉多 · 米纳斯",
      notes: "坚果 · 可可 · 醇厚",
      altitude: "1,000–1,300 m",
      variety: "黄卡杜艾",
      process: "半日晒",
      roast: "中烘",
      texture: "奶油般厚实",
      story: "稳定的气候与半日晒处理带来饱满甜感。烤榛子、牛奶巧克力和奶油触感让它在冷萃或奶咖中尤其稳定。",
      brew: "90°C · 粉水比 1:14 · 2 分 30 秒",
      pairing: "70% 黑巧克力",
      color: "#d8b27b",
      questions: [
        {
          title: "第一印象更像哪一组？",
          options: [
            ["烤坚果与可可", true],
            ["花香与柑橘", false],
            ["红茶与木质香", false]
          ]
        },
        {
          title: "这杯咖啡的触感更接近？",
          options: [
            ["奶油般醇厚", true],
            ["轻盈如果汁", false],
            ["干燥而收敛", false]
          ]
        },
        {
          title: "最适合搭配哪一种小食？",
          options: [
            ["黑巧克力", true],
            ["柠檬塔", false],
            ["海盐苏打", false]
          ]
        }
      ]
    },
    yunnan: {
      key: "yunnan",
      number: "04",
      lot: "YUN-04",
      name: "云南",
      region: "保山 · 潞江坝",
      notes: "红茶 · 红糖 · 草本",
      altitude: "1,300–1,700 m",
      variety: "卡蒂姆",
      process: "水洗",
      roast: "中浅烘",
      texture: "柔和、茶感",
      story: "高海拔山谷与明显干湿季塑造出温润茶感。熟果、红糖和清淡草本香层层展开，适合用稍低水温慢慢萃取。",
      brew: "90°C · 粉水比 1:15 · 2 分 25 秒",
      pairing: "滇红戚风蛋糕",
      color: "#b8d6c6",
      questions: [
        {
          title: "它的香气更接近哪一种？",
          options: [
            ["红茶与红糖", true],
            ["柑橘与白花", false],
            ["奶油与榛果", false]
          ]
        },
        {
          title: "入口后的主体风味是？",
          options: [
            ["柔和茶感", true],
            ["浓烈果酸", false],
            ["烘焙苦味", false]
          ]
        },
        {
          title: "尾韵里藏着什么？",
          options: [
            ["清淡草本香", true],
            ["蜂蜜甜香", false],
            ["可可苦韵", false]
          ]
        }
      ]
    }
  };

  const storageKey = "nfc-coffee-collection-v1";
  const requestedFlavor = (params.get("flavor") || "").toLowerCase();
  const requestedType = (params.get("type") || "game").toLowerCase();
  const hasExplicitFlavor = Boolean(profiles[requestedFlavor]);
  const randomRequested = requestedType === "random"
    || (!hasExplicitFlavor && (requestedType === "game" || !params.has("type")));
  const randomProfile = randomRequested ? pickRandomProfileKey() : "";
  const initialProfile = hasExplicitFlavor && !randomRequested
    ? requestedFlavor
    : (randomProfile || "ethiopia");
  if (randomRequested) {
    params.set("type", "game");
    params.set("flavor", initialProfile);
    params.set("lot", profiles[initialProfile].lot);
    const resolved = new URL(window.location.href);
    resolved.search = params.toString();
    window.history.replaceState({}, "", resolved);
  }
  const lot = (params.get("lot") || profiles[initialProfile].lot).slice(0, 24);

  let currentProfileKey = initialProfile;
  let questionIndex = 0;
  let score = 0;
  let answerLocked = false;
  let collected = readCollection();
  let toastTimer = 0;

  const elements = {
    gameStage: document.querySelector("#gameStage"),
    flavorName: document.querySelector("#flavorName"),
    flavorNotes: document.querySelector("#flavorNotes"),
    flavorFacts: document.querySelector("#flavorFacts"),
    flavorNumber: document.querySelector("#flavorNumber"),
    progressFill: document.querySelector("#progressFill"),
    scoreBadge: document.querySelector("#scoreBadge"),
    collection: document.querySelector("#flavorCollection"),
    collectionCount: document.querySelector("#collectionCount"),
    collectionNote: document.querySelector("#collectionNote"),
    lotLabel: document.querySelector("#lotLabel"),
    storyLot: document.querySelector("#storyLot"),
    customStory: document.querySelector("#customStory"),
    qrFallbackLink: document.querySelector("#qrFallbackLink"),
    toast: document.querySelector("#toast")
  };

  function readCollection() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return new Set(Array.isArray(value) ? value.filter((key) => profiles[key]) : []);
    } catch {
      return new Set();
    }
  }

  function saveCollection() {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...collected]));
    } catch {
      showToast("浏览器未允许本地存储，本轮收藏不会保留");
    }
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 2200);
  }

  function pickRandomProfileKey() {
    let previous = "";
    try {
      previous = window.sessionStorage.getItem("last-random-flavor") || "";
    } catch {
      // Session storage is optional; random selection still works without it.
    }
    const candidates = profileKeys.filter((key) => key !== previous);
    const picked = candidates[Math.floor(Math.random() * candidates.length)] || profileKeys[0];
    try {
      window.sessionStorage.setItem("last-random-flavor", picked);
    } catch {
      // Ignore storage restrictions.
    }
    return picked;
  }

  function updateProfileHeader() {
    const profile = profiles[currentProfileKey];
    elements.flavorName.textContent = profile.name;
    elements.flavorNotes.textContent = profile.notes;
    elements.flavorNumber.textContent = profile.number;
    elements.flavorFacts.innerHTML = "";
    [
      ["产区", profile.region],
      ["海拔", profile.altitude],
      ["处理", profile.process],
      ["烘焙", profile.roast]
    ].forEach(([label, value]) => {
      const item = document.createElement("div");
      const term = document.createElement("span");
      term.textContent = label;
      const detail = document.createElement("b");
      detail.textContent = value;
      item.append(term, detail);
      elements.flavorFacts.append(item);
    });
    document.querySelector(".bean-mark").style.background = profile.color;
  }

  function renderQuestion() {
    const profile = profiles[currentProfileKey];
    const question = profile.questions[questionIndex];
    answerLocked = false;
    elements.progressFill.style.width = `${(questionIndex / profile.questions.length) * 100}%`;
    elements.scoreBadge.textContent = `${score} / ${profile.questions.length}`;
    elements.gameStage.innerHTML = "";

    const count = document.createElement("p");
    count.className = "question-count";
    count.textContent = `QUESTION ${String(questionIndex + 1).padStart(2, "0")} / 03`;

    const title = document.createElement("h3");
    title.className = "question-title";
    title.textContent = question.title;

    const options = document.createElement("div");
    options.className = "option-list";
    question.options.forEach(([label, correct], index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button";

      const number = document.createElement("span");
      number.className = "option-index";
      number.textContent = String(index + 1).padStart(2, "0");
      button.append(number, document.createTextNode(label));
      button.addEventListener("click", () => selectAnswer(button, correct));
      options.append(button);
    });

    elements.gameStage.append(count, title, options);
  }

  function selectAnswer(button, correct) {
    if (answerLocked) {
      return;
    }
    answerLocked = true;
    button.classList.add(correct ? "is-correct" : "is-wrong");
    if (correct) {
      score += 1;
    }
    elements.scoreBadge.textContent = `${score} / ${profiles[currentProfileKey].questions.length}`;

    window.setTimeout(() => {
      questionIndex += 1;
      if (questionIndex < profiles[currentProfileKey].questions.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    }, 420);
  }

  function renderResult() {
    const profile = profiles[currentProfileKey];
    const total = profile.questions.length;
    elements.progressFill.style.width = "100%";
    collected.add(profile.key);
    saveCollection();
    updateCollection();
    elements.gameStage.innerHTML = "";

    const result = document.createElement("div");
    result.className = "result-panel";

    const scoreCircle = document.createElement("div");
    scoreCircle.className = "result-score";
    scoreCircle.textContent = `${score}/${total}`;

    const title = document.createElement("h3");
    title.textContent = score === total ? "风味线索全部命中" : score >= 2 ? "找到这杯咖啡的性格" : "解锁一张新的风味卡";

    const description = document.createElement("p");
    description.textContent = `${profile.name}的风味卡已经收入收藏册。风味没有唯一答案，你的感受才是这次品尝的最后一条线索。`;

    const details = document.createElement("dl");
    details.className = "result-profile";
    [
      ["产地故事", profile.story],
      ["品种与处理", `${profile.variety} · ${profile.process}`],
      ["杯感", profile.texture],
      ["冲煮建议", profile.brew],
      ["搭配建议", profile.pairing]
    ].forEach(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = value;
      details.append(term, detail);
    });

    const actions = document.createElement("div");
    actions.className = "action-row";

    const shareButton = document.createElement("button");
    shareButton.type = "button";
    shareButton.className = "primary-button";
    shareButton.textContent = "分享我的结果";
    shareButton.addEventListener("click", shareResult);

    const replayButton = document.createElement("button");
    replayButton.type = "button";
    replayButton.className = "ghost-button";
    replayButton.textContent = "再玩一次";
    replayButton.addEventListener("click", resetGame);

    actions.append(shareButton, replayButton);
    result.append(scoreCircle, title, description, details, actions);
    elements.gameStage.append(result);
  }

  function resetGame() {
    questionIndex = 0;
    score = 0;
    answerLocked = false;
    renderQuestion();
  }

  function updateCollection() {
    elements.collection.innerHTML = "";
    profileKeys.forEach((key) => {
      const profile = profiles[key];
      const unlocked = collected.has(key);
      const card = document.createElement("article");
      card.className = `collect-card ${unlocked ? "is-unlocked" : "is-locked"}`;
      card.dataset.number = profile.number;
      card.style.setProperty("--card-color", profile.color);

      const number = document.createElement("span");
      number.textContent = unlocked ? `UNLOCKED / ${profile.number}` : `LOCKED / ${profile.number}`;

      const name = document.createElement("h4");
      name.textContent = unlocked ? profile.name : "等待触碰";

      const notes = document.createElement("p");
      notes.textContent = unlocked ? `${profile.region} · ${profile.notes}` : "在对应包装上继续探索";
      card.append(number, name, notes);
      elements.collection.append(card);
    });

    elements.collectionCount.textContent = `${collected.size} / ${profileKeys.length}`;
    elements.collectionNote.textContent = collected.size === profileKeys.length
      ? "四张风味卡已集齐。可在展示时打开四款包装，比较不同产地留下的味觉线索。"
      : "收藏记录保存在当前浏览器；换手机后会重新开始。";
  }

  async function shareResult() {
    const profile = profiles[currentProfileKey];
    const text = `我在“触碰风味”中解锁了 ${profile.name} 风味卡（${score}/3）。`;
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "触碰风味", text, url: shareUrl });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${shareUrl}`);
        showToast("结果与链接已复制");
      } else {
        showToast(shareUrl);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        showToast("分享未完成，可截图保存结果");
      }
    }
  }

  function showView(name, updateUrl = false) {
    const safeName = ["game", "video", "image", "text"].includes(name) ? name : "game";
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.toggle("is-active", view.id === `view-${safeName}`);
    });
    document.querySelectorAll(".mode-button").forEach((button) => {
      const active = button.dataset.view === safeName;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (updateUrl) {
      const next = new URL(window.location.href);
      next.searchParams.set("type", safeName);
      window.history.replaceState({}, "", next);
      updateQrLink();
    }
  }

  function applyQueryContent() {
    const requestedType = (params.get("type") || "game").toLowerCase();
    showView(requestedType === "collection" ? "game" : requestedType);

    const customText = params.get("text");
    if (customText && customText.trim()) {
      elements.customStory.textContent = customText.trim().slice(0, 1200);
    }

    const mediaUrl = params.get("src") || params.get("media");
    if (mediaUrl) {
      try {
        const resolved = new URL(mediaUrl, window.location.href);
        if (resolved.protocol === "http:" || resolved.protocol === "https:") {
          const video = document.querySelector("#featureVideo source");
          video.src = resolved.href;
          document.querySelector("#featureVideo").load();
          document.querySelector("#featureImage").src = resolved.href;
        }
      } catch {
        showToast("媒体链接格式无效，已保留本地示例");
      }
    }

    const pageTitle = params.get("title");
    if (pageTitle && pageTitle.trim()) {
      document.title = `${pageTitle.trim().slice(0, 60)} · 触碰风味`;
    }
  }

  function updateQrLink() {
    const target = window.location.href.split("#")[0];
    elements.qrFallbackLink.href = `qr.html?url=${encodeURIComponent(target)}`;
  }

  document.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view, true));
  });

  document.querySelector("#touchSeal").addEventListener("click", (event) => {
    const button = event.currentTarget;
    button.classList.remove("is-pulsing");
    void button.offsetWidth;
    button.classList.add("is-pulsing");
    showToast(`NFC / ${lotValuesText()}`);
  });

  function lotValuesText() {
    return lot || "CONTENT OPENED";
  }

  elements.lotLabel.textContent = `LOT / ${lot}`;
  elements.storyLot.textContent = lot;
  updateProfileHeader();
  updateCollection();
  updateQrLink();
  applyQueryContent();
  resetGame();
  if (randomRequested) {
    showToast(`随机选中：${profiles[currentProfileKey].name} ${profiles[currentProfileKey].notes}`);
  }
})();
