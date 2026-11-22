(() => {
  "use strict";

  const FLAVORS = {
    ethiopia: {
      id: "ethiopia",
      lot: "ETH-01",
      number: "01",
      name: "埃塞俄比亚",
      region: "耶加雪菲",
      short: "花香与柑橘",
      clue: "闻到茉莉花香，杯口有明亮的柠檬皮气息。",
      notes: ["茉莉", "柑橘", "红茶"],
      story: "高海拔慢熟让这支豆子拥有清晰的花香。浅烘焙保留了柑橘酸质，放凉后会出现类似红茶的余韵。",
      brew: "92°C · 1:15 · 2 分 10 秒",
      color: "#F2B84B",
      dark: "#8C5A00",
    },
    colombia: {
      id: "colombia",
      lot: "COL-02",
      number: "02",
      name: "哥伦比亚",
      region: "慧兰",
      short: "红糖与红苹果",
      clue: "入口像咬下一口红苹果，尾段留下柔和红糖甜感。",
      notes: ["红苹果", "红糖", "可可"],
      story: "慧兰产区的昼夜温差带来更完整的甜感。中浅烘焙让苹果酸质与焦糖甜味保持平衡，适合第一次接触精品咖啡的人。",
      brew: "91°C · 1:15 · 2 分 20 秒",
      color: "#EE8068",
      dark: "#8D3022",
    },
    brazil: {
      id: "brazil",
      lot: "BRA-03",
      number: "03",
      name: "巴西",
      region: "喜拉多",
      short: "坚果与巧克力",
      clue: "香气像烤榛子，温度下降后浮现牛奶巧克力。",
      notes: ["榛子", "可可", "焦糖"],
      story: "喜拉多稳定的气候赋予咖啡圆润口感。中度烘焙强调坚果与巧克力调性，低酸、顺滑，是奶咖和冷萃的友好选择。",
      brew: "90°C · 1:14 · 2 分 30 秒",
      color: "#B9825B",
      dark: "#67402A",
    },
    yunnan: {
      id: "yunnan",
      lot: "YUN-04",
      number: "04",
      name: "中国云南",
      region: "保山",
      short: "红茶与焦糖",
      clue: "杯中有熟果与红糖香，余韵像一杯温润红茶。",
      notes: ["红茶", "焦糖", "熟果"],
      story: "保山的高山种植环境让这支咖啡兼具茶感与甜感。中浅烘焙突出熟果香和焦糖尾韵，适合慢慢喝完一杯。",
      brew: "91°C · 1:15 · 2 分 15 秒",
      color: "#58A58A",
      dark: "#235E4A",
    },
  };

  const QUESTIONS = [
    {
      eyebrow: "01 / 闻香",
      title: "最先抓住你的是哪一种香气？",
      options: [
        ["茉莉花香与柠檬皮", "ethiopia"],
        ["红苹果与红糖", "colombia"],
        ["烤榛子与牛奶巧克力", "brazil"],
        ["熟果与温热红茶", "yunnan"],
      ],
    },
    {
      eyebrow: "02 / 品尝",
      title: "入口后的第一感受更接近？",
      options: [
        ["明亮、轻盈，酸质像柑橘", "ethiopia"],
        ["苹果般多汁，甜感干净", "colombia"],
        ["圆润厚实，像可可奶油", "brazil"],
        ["柔和顺口，茶感绵长", "yunnan"],
      ],
    },
    {
      eyebrow: "03 / 余韵",
      title: "你会怎样记住这一口？",
      options: [
        ["花香留在杯口，清爽回甘", "ethiopia"],
        ["焦糖甜感缓慢落下", "colombia"],
        ["坚果和巧克力久久不散", "brazil"],
        ["像喝完一口红茶，温润安静", "yunnan"],
      ],
    },
  ];

  const params = new URLSearchParams(window.location.search);
  const content = document.querySelector("#content");
  const typeBadge = document.querySelector("#typeBadge");
  const storageKey = "touch-flavor-collection-v1";
  const requestedType = (params.get("type") || "home").toLowerCase();
  const requestedFlavor = (params.get("flavor") || "ethiopia").toLowerCase();
  const flavor = FLAVORS[requestedFlavor] || FLAVORS.ethiopia;
  const lot = clean(params.get("lot"), flavor.lot, 16);
  const clue = clean(params.get("clue"), flavor.clue, 160);
  const allowedTypes = new Set(["home", "game", "collection", "poster", "card", "video", "image", "text"]);
  const view = allowedTypes.has(requestedType) ? requestedType : "home";
  let collected = loadCollection();

  document.querySelector(".brand span:last-child").textContent = "TOUCH / FLAVOR";
  document.title = "触碰风味 · NFC 咖啡探索礼盒";

  if (view === "home") {
    typeBadge.textContent = "咖啡礼盒";
    renderHome();
  } else if (view === "game") {
    typeBadge.textContent = `风味 ${flavor.number} / 04`;
    document.title = `${flavor.name} · 风味侦探`;
    renderGame();
  } else if (view === "collection") {
    typeBadge.textContent = `收藏 ${collected.size} / 4`;
    renderCollection();
  } else if (view === "poster") {
    typeBadge.textContent = "系列海报";
    renderPoster();
  } else if (view === "card") {
    typeBadge.textContent = "分享结果";
    renderSharedCard();
  } else if (view === "video" || view === "image") {
    typeBadge.textContent = view === "video" ? "视频内容" : "图片内容";
    renderMedia(view, params.get("src"));
  } else {
    typeBadge.textContent = "文字内容";
    renderText();
  }

  function renderHome() {
    content.innerHTML = `
      <p class="eyebrow">Packaging / Game / Collection</p>
      <h1>先看见线索，<br>再触碰风味。</h1>
      <p class="lead">四支挂耳咖啡，四种风味线索。找到包装上的 NFC 标记，碰一下，完成 20–40 秒的“风味侦探”测试，收集属于这支咖啡的数字风味卡。</p>
      <section class="experience-strip" aria-label="体验流程">
        <span><b>01</b> 看见线索</span>
        <span><b>02</b> 触碰包装</span>
        <span><b>03</b> 完成测试</span>
        <span><b>04</b> 收集海报</span>
      </section>
      <div class="collection-summary panel">
        <div>
          <p class="eyebrow">Current collection</p>
          <strong class="collection-number">${collected.size}<small> / 4</small></strong>
          <p>张风味卡已收集</p>
        </div>
        ${progressRing(collected.size)}
        <a class="button secondary" href="${link("collection")}">查看收藏</a>
      </div>
      <div class="section-heading">
        <div>
          <p class="eyebrow">Four origins</p>
          <h2>找到属于你的那一支</h2>
        </div>
        <span>从包装线索开始</span>
      </div>
      <div class="flavor-grid">
        ${Object.values(FLAVORS).map(renderFlavorTile).join("")}
      </div>
      <div class="result-invitation panel">
        <span class="invitation-mark" aria-hidden="true">✦</span>
        <div>
          <h3>四种风味，拼成一张海报</h3>
          <p>集齐四张数字风味卡后，盒背图案会拼合成一张完整的咖啡产地海报。</p>
        </div>
        <a class="button" href="${link("poster")}">预览海报</a>
      </div>
      <p class="fine-print">原型说明：系列卡与海报使用浏览器本地收藏。清空网站数据会重置收集进度。</p>
    `;
  }

  function renderFlavorTile(item) {
    const earned = collected.has(item.id);
    return `
      <a class="flavor-tile ${earned ? "is-earned" : ""}" href="${link("game", {
        flavor: item.id,
        lot: item.lot,
      })}" style="--flavor:${item.color};--flavor-dark:${item.dark}">
        <span class="flavor-index">${item.number}</span>
        <span class="flavor-orbit" aria-hidden="true"></span>
        <span class="flavor-copy">
          <small>${escapeHtml(item.region)}</small>
          <b>${escapeHtml(item.name)}</b>
          <span>${escapeHtml(item.short)}</span>
        </span>
        <span class="flavor-state">${earned ? "已收集" : "触碰开始"}</span>
      </a>
    `;
  }

  function renderGame() {
    content.innerHTML = `
      <p class="eyebrow">Flavor detective / 3 questions</p>
      <div class="game-title-row">
        <div>
          <small>包装 ${flavor.number} / 04 · 隐藏编号 ${escapeHtml(lot)}</small>
          <h1>${escapeHtml(flavor.name)}<br><span>${escapeHtml(flavor.region)}</span></h1>
        </div>
        <div class="clue-stamp" style="--flavor:${flavor.color};--flavor-dark:${flavor.dark}">
          <span>包装线索</span>
          <b>${escapeHtml(flavor.short)}</b>
          <small>${escapeHtml(clue)}</small>
        </div>
      </div>
      <section class="detective panel" data-game>
        <div class="detective-progress"><span data-progress></span></div>
        <div class="detective-content">
          <p class="eyebrow" data-question-eyebrow></p>
          <h2 data-question-title></h2>
          <div class="option-grid" data-options></div>
        </div>
      </section>
    `;

    const game = content.querySelector("[data-game]");
    const progress = content.querySelector("[data-progress]");
    const eyebrow = content.querySelector("[data-question-eyebrow]");
    const title = content.querySelector("[data-question-title]");
    const options = content.querySelector("[data-options]");
    let step = 0;
    let picks = [];

    showQuestion();

    function showQuestion() {
      const question = QUESTIONS[step];
      progress.style.width = `${((step + 1) / QUESTIONS.length) * 100}%`;
      eyebrow.textContent = question.eyebrow;
      title.textContent = question.title;
      options.replaceChildren();
      question.options.forEach(([text, optionFlavor]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option-button";
        button.innerHTML = `<span>${escapeHtml(text)}</span><b>记录</b>`;
        button.addEventListener("click", () => choose(optionFlavor), { once: true });
        options.appendChild(button);
      });
    }

    function choose(optionFlavor) {
      picks.push(optionFlavor);
      step += 1;
      if (step < QUESTIONS.length) {
        game.classList.add("is-advancing");
        window.setTimeout(() => {
          game.classList.remove("is-advancing");
          showQuestion();
        }, 180);
        return;
      }
      finishGame();
    }

    function finishGame() {
      const matches = picks.filter((pick) => pick === flavor.id).length;
      const score = Math.round((matches / QUESTIONS.length) * 100);
      collected.add(flavor.id);
      saveCollection(collected);
      typeBadge.textContent = `收藏 ${collected.size} / 4`;
      game.replaceWith(resultCard(flavor, score, false));
      bindCardActions();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function renderSharedCard() {
    const scoreValue = Number.parseInt(params.get("score") || "75", 10);
    const score = Number.isFinite(scoreValue) ? Math.min(100, Math.max(0, scoreValue)) : 75;
    content.innerHTML = `
      <p class="eyebrow">Shared / Flavor result</p>
      <h1 class="article-title">朋友分享给你<br>一张风味线索。</h1>
      <div data-card>${resultCard(flavor, score, true).outerHTML}</div>
      <div class="actions">
        <a class="button" href="${link("game", { flavor: flavor.id, lot: flavor.lot })}">我也来测一次</a>
        <a class="button secondary" href="${link("home")}">查看系列</a>
      </div>
    `;
    bindCardActions();
  }

  function resultCard(item, score, shared) {
    const article = document.createElement("article");
    article.className = "flavor-card panel";
    article.style.setProperty("--flavor", item.color);
    article.style.setProperty("--flavor-dark", item.dark);
    article.innerHTML = `
      <div class="flavor-card-head">
        <span>${shared ? "朋友的风味卡" : "你的数字风味卡"}</span>
        <span>${item.number} / 04</span>
      </div>
      <div class="flavor-card-hero">
        <div class="flavor-symbol" aria-hidden="true">✦</div>
        <p>${escapeHtml(item.region)}</p>
        <h2>${escapeHtml(item.name)}</h2>
        <strong>${score}% <small>风味匹配</small></strong>
      </div>
      <div class="tasting-notes">
        ${item.notes.map((note) => `<span>${escapeHtml(note)}</span>`).join("")}
      </div>
      <div class="flavor-story">
        <div><span>产地故事</span><p>${escapeHtml(item.story)}</p></div>
        <div><span>冲煮建议</span><p>${escapeHtml(item.brew)}</p></div>
      </div>
      <div class="card-footer">
        <span>隐藏编号</span><b>${escapeHtml(lot)}</b>
        <span>收集进度</span><b>${collected.size} / 4</b>
      </div>
      <div class="actions card-actions">
        <button class="button" type="button" data-share>分享结果</button>
        <button class="button secondary" type="button" data-print>打印 / 存为 PDF</button>
      </div>
    `;
    return article;
  }

  function renderCollection() {
    const complete = collected.size === Object.keys(FLAVORS).length;
    content.innerHTML = `
      <p class="eyebrow">Your collection</p>
      <h1>风味卡收藏册</h1>
      <p class="lead">每次完成一支咖啡的风味测试，都会点亮对应卡片。集齐四张后，可以拼合一张完整的产地海报。</p>
      <section class="collection-board panel">
        <div class="collection-board-head">
          <div>
            <span>已完成</span>
            <strong>${collected.size}<small> / 4</small></strong>
          </div>
          <a class="button ${complete ? "" : "secondary"}" href="${link("poster")}">${complete ? "打开完整海报" : "预览海报版式"}</a>
        </div>
        <div class="progress-track"><span style="width:${(collected.size / 4) * 100}%"></span></div>
        <div class="collection-grid">
          ${Object.values(FLAVORS).map((item) => {
            const earned = collected.has(item.id);
            return `
              <a class="collection-card ${earned ? "is-earned" : "is-locked"}" href="${link("game", {
                flavor: item.id,
                lot: item.lot,
              })}" style="--flavor:${item.color};--flavor-dark:${item.dark}">
                <span>${item.number}</span>
                <b>${earned ? item.name : "未点亮"}</b>
                <small>${earned ? item.short : "碰触对应包装开始"}</small>
                <i>${earned ? "✓" : "＋"}</i>
              </a>
            `;
          }).join("")}
        </div>
      </section>
      <div class="actions"><a class="button secondary" href="${link("home")}">返回风味首页</a></div>
    `;
  }

  function renderPoster() {
    const complete = collected.size === 4;
    content.innerHTML = `
      <p class="eyebrow">Four cards / One poster</p>
      <h1 class="article-title">把四种风味<br>拼回一张地图。</h1>
      <p class="lead">${complete ? "四张风味卡已经集齐。这张海报可以打印、保存为 PDF，也可以作为礼盒内页或盒背图案。" : "这是海报版式预览。完成四款风味测试后，收集进度会完整点亮。"}</p>
      <article class="flavor-poster" id="flavorPoster">
        <header>
          <span>TOUCH / FLAVOR</span>
          <small>NFC 咖啡风味探索礼盒</small>
        </header>
        <div class="poster-grid">
          ${Object.values(FLAVORS).map((item) => `
            <section style="--flavor:${item.color};--flavor-dark:${item.dark}">
              <span>${item.number}</span>
              <small>${escapeHtml(item.region)}</small>
              <b>${escapeHtml(item.name)}</b>
              <p>${escapeHtml(item.notes.join(" · "))}</p>
            </section>
          `).join("")}
        </div>
        <footer>
          <span>触碰、品尝、收集。</span>
          <small>${complete ? "收藏完成" : "版式预览"} · NFC 互动包装原型</small>
        </footer>
      </article>
      <div class="actions">
        <button class="button" type="button" data-print>打印 / 存为 PDF</button>
        <a class="button secondary" href="${link("collection")}">返回收藏册</a>
      </div>
    `;
    bindPrintAction();
  }

  function renderMedia(mediaType, rawSource) {
    const title = clean(params.get("title"), mediaType === "video" ? "一段咖啡故事" : "一张风味图片", 100);
    const source = safeMediaUrl(rawSource);
    content.innerHTML = `
      <p class="eyebrow">Touch / ${mediaType === "video" ? "Watch" : "View"}</p>
      <h1 class="article-title" data-title></h1>
      <div class="media-frame" data-media></div>
      <div class="actions"><a class="button secondary" href="${link("home")}">返回风味首页</a></div>
    `;
    content.querySelector("[data-title]").textContent = title;
    const frame = content.querySelector("[data-media]");
    if (!source) {
      renderMediaError(frame, mediaType);
      return;
    }
    const element = document.createElement(mediaType === "video" ? "video" : "img");
    element.src = source;
    if (mediaType === "video") {
      element.controls = true;
      element.playsInline = true;
      element.autoplay = true;
      element.muted = true;
    } else {
      element.alt = title;
    }
    element.addEventListener("error", () => renderMediaError(frame, mediaType), { once: true });
    frame.appendChild(element);
  }

  function renderText() {
    const title = clean(params.get("title"), "一张文字卡片", 100);
    const body = clean(params.get("text"), "触碰风味的过程，也应该像打开一段故事。", 2000);
    content.innerHTML = `
      <p class="eyebrow">Touch / Read</p>
      <h1 class="article-title" data-title></h1>
      <article class="panel text-card"><p data-body></p></article>
      <div class="actions"><a class="button secondary" href="${link("home")}">返回风味首页</a></div>
    `;
    content.querySelector("[data-title]").textContent = title;
    content.querySelector("[data-body]").textContent = body;
  }

  function renderMediaError(frame, mediaType) {
    frame.innerHTML = `<div class="media-error">${mediaType === "video" ? "视频" : "图片"}地址缺失或无法访问。</div>`;
  }

  function bindCardActions() {
    content.querySelectorAll("[data-share]").forEach((button) => {
      button.addEventListener("click", shareResult);
    });
    bindPrintAction();
  }

  function bindPrintAction() {
    content.querySelectorAll("[data-print]").forEach((button) => {
      button.addEventListener("click", () => window.print());
    });
  }

  async function shareResult() {
    const shareUrl = link("card", {
      flavor: flavor.id,
      lot,
      score: String(collectScore()),
    });
    const data = {
      title: `我在触碰风味里遇见了${flavor.name}`,
      text: `${flavor.short}。这是我的 NFC 咖啡风味卡。`,
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${data.title}\n${data.text}\n${shareUrl}`);
        announce("分享链接已复制");
      } else {
        window.prompt("复制分享链接", shareUrl);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        window.prompt("复制分享链接", shareUrl);
      }
    }
  }

  function collectScore() {
    const node = content.querySelector(".flavor-card-hero strong");
    const value = Number.parseInt(String(node?.textContent || ""), 10);
    return Number.isFinite(value) ? value : 75;
  }

  function announce(message) {
    typeBadge.textContent = message;
  }

  function link(nextType, extra = {}) {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("type", nextType);
    url.searchParams.set("series", "coffee");
    Object.entries(extra).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.href;
  }

  function progressRing(count) {
    const angle = Math.round((count / 4) * 360);
    return `<div class="progress-ring" style="--progress:${angle}deg"><span>${count}/4</span></div>`;
  }

  function loadCollection() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return new Set(Array.isArray(stored) ? stored.filter((id) => FLAVORS[id]) : []);
    } catch {
      return new Set();
    }
  }

  function saveCollection(value) {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...value]));
    } catch {
      // Private browsing can disable storage; the current session still shows the result.
    }
  }

  function safeMediaUrl(rawValue) {
    if (!rawValue) return "";
    try {
      const url = new URL(rawValue, window.location.href);
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
    } catch {
      return "";
    }
  }

  function clean(value, fallback, maxLength) {
    const normalized = typeof value === "string" ? value.trim() : "";
    return (normalized || fallback).slice(0, maxLength);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
