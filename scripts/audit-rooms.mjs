import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { chromium, devices } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const BASE = process.env.AUDIT_BASE || "http://127.0.0.1:4178";

const errors = [];
const warnings = [];
const recommendations = [];
const clean = [];

function err(room, msg) {
  errors.push(room ? `[${room}] ${msg}` : msg);
}
function warn(room, msg) {
  warnings.push(room ? `[${room}] ${msg}` : msg);
}
function rec(msg) {
  recommendations.push(msg);
}

const catalog = [
  {
    title: "Теремок",
    guests: "до 6 гостей",
    areaCard: "75 м²",
    areaDetail: "75 м²",
    cover: "/images/rooms/teremok/teremok-exterior-main.jpg",
    gallery: [
      "/images/rooms/teremok/teremok-exterior-main.jpg",
      "/images/rooms/teremok/teremok-veranda.jpg",
      "/images/rooms/teremok/teremok-kitchen-dining.jpg",
      "/images/rooms/teremok/teremok-kitchen.jpg",
      "/images/rooms/teremok/teremok-bedroom-ground-floor.jpg",
      "/images/rooms/teremok/teremok-bathroom-shower.jpg",
      "/images/rooms/teremok/teremok-bedroom-second-floor.jpg",
      "/images/rooms/teremok/teremok-second-floor-bed.jpg",
      "/images/rooms/teremok/teremok-second-floor-overview.jpg",
      "/images/rooms/teremok/teremok-bathroom.jpg",
    ],
    displayCount: 10,
    video: "/videos/rooms/teremok/teremok-tour.mp4",
  },
  {
    title: "Семейный дом с камином",
    guests: "до 7 гостей",
    areaCard: "75 м²",
    areaDetail: "75 м²",
    cover: "/images/rooms/fireplace-house/fireplace-house-living-room-fireplace.jpg",
    gallery: [
      "/images/rooms/fireplace-house/fireplace-house-living-room-fireplace.jpg",
      "/images/rooms/fireplace-house/fireplace-house-kitchen.jpg",
      "/images/rooms/fireplace-house/fireplace-house-dining-room.jpg",
      "/images/rooms/fireplace-house/fireplace-house-master-bedroom.jpg",
      "/images/rooms/fireplace-house/fireplace-house-bedroom-with-crib.jpg",
      "/images/rooms/fireplace-house/fireplace-house-bathroom.jpg",
      "/images/rooms/fireplace-house/fireplace-house-playroom.jpg",
      "/images/rooms/fireplace-house/fireplace-house-veranda.jpg",
    ],
    displayCount: 8,
    video: "/videos/rooms/fireplace-house/fireplace-house-tour.mp4",
  },
  {
    title: "Премиум-дом у бассейна",
    guests: "до 4 гостей",
    areaCard: "36 м²",
    areaDetail: "36 м²",
    cover: "/images/rooms/pool-premium-house/pool-premium-house-front-view.jpg",
    gallery: [
      "/images/rooms/pool-premium-house/pool-premium-house-front-view.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-veranda.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-bedroom.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-bedroom-wide.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-living-area.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-kitchen-area.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-bedroom-sofa.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-bed-view.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-bed-view-2.jpg",
      "/images/rooms/pool-premium-house/pool-premium-house-pool-view.jpg",
    ],
    displayCount: 10,
    video: "/videos/rooms/pool-premium-house/pool-premium-house-tour.mp4",
  },
  {
    title: "Трёхместный номер с балконом в корпусе",
    guests: "до 3 гостей",
    areaCard: null,
    areaDetail: null,
    cover: "/images/rooms/triple-balcony-room/triple-balcony-room-building-front.jpg",
    gallery: [
      "/images/rooms/triple-balcony-room/triple-balcony-room-bedroom-main.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-balcony-view.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-building-front.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-bedroom-front.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-territory-view.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-bedroom-tv-view.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-bathroom.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-balcony-corridor.jpg",
      "/images/rooms/triple-balcony-room/triple-balcony-room-third-bed.jpg",
    ],
    displayCount: 9,
    video: "/videos/rooms/triple-balcony-room/triple-balcony-room-tour.mp4",
  },
  {
    title: "Семейный люкс с видом",
    guests: "до 6 гостей",
    areaCard: "100 м²",
    areaDetail: "100 м²",
    cover: "/images/rooms/family-lux-view/family-lux-view-house-front.jpg",
    gallery: [
      "/images/rooms/family-lux-view/family-lux-view-house-front.jpg",
      "/images/rooms/family-lux-view/family-lux-view-balcony-main.jpg",
      "/images/rooms/family-lux-view/family-lux-view-balcony-view.jpg",
      "/images/rooms/family-lux-view/family-lux-view-living-kitchen.jpg",
      "/images/rooms/family-lux-view/family-lux-view-bedroom-master.jpg",
      "/images/rooms/family-lux-view/family-lux-view-bedroom-second.jpg",
      "/images/rooms/family-lux-view/family-lux-view-dining-area.jpg",
      "/images/rooms/family-lux-view/family-lux-view-bathroom.jpg",
    ],
    displayCount: 8,
    video: "/videos/rooms/family-lux-view/family-lux-view-tour.mp4",
  },
  {
    title: "3-хместный Комфорт в двухэтажном срубе на втором этаже",
    guests: "до 3 гостей",
    areaCard: "15 м²",
    areaDetail: "15 м²",
    cover: "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-main.jpg",
    gallery: [
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-main.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-building-front.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-balcony.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-room-main.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-room-overview.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-three-beds.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-double-bed.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-room-angle.jpg",
      "/images/rooms/comfort-log-second-floor/comfort-log-second-floor-bathroom.jpg",
    ],
    displayCount: 9,
    video: "/videos/rooms/comfort-log-second-floor/comfort-log-second-floor-main.mp4",
  },
  {
    title: "4-хместный Комфорт в двухэтажном срубе на первом этаже",
    guests: "до 4 гостей",
    areaCard: null,
    areaDetail: null,
    cover: "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-main.jpg",
    gallery: [
      "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-main.jpg",
      "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-building-front.jpg",
      "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-entrance.jpg",
      "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-room-main.jpg",
      "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-double-bed.jpg",
      "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-dining-area.jpg",
      "/images/rooms/comfort-log-first-floor/comfort-log-first-floor-room-overview.jpg",
    ],
    displayCount: 7,
    video: "/videos/rooms/comfort-log-first-floor/comfort-log-first-floor-main.mp4",
  },
  {
    title: "Двухкомнатный номер в корпусе",
    guests: "до 4 гостей",
    areaCard: "45 м²",
    areaDetail: "45 м²",
    cover: "/images/rooms/two-room-standard/two-room-standard-main.jpg",
    gallery: [
      "/images/rooms/two-room-standard/two-room-standard-main.jpg",
      "/images/rooms/two-room-standard/two-room-standard-building.jpg",
      "/images/rooms/two-room-standard/two-room-standard-master-bedroom.jpg",
      "/images/rooms/two-room-standard/two-room-standard-twin-bedroom.jpg",
      "/images/rooms/two-room-standard/two-room-standard-twin-room-view.jpg",
      "/images/rooms/two-room-standard/two-room-standard-room-corridor.jpg",
      "/images/rooms/two-room-standard/two-room-standard-shower.jpg",
      "/images/rooms/two-room-standard/two-room-standard-toilet.jpg",
    ],
    displayCount: 8,
    video: "/videos/rooms/two-room-standard/two-room-standard-main.mp4",
  },
  {
    title: "Домик «Премиум»",
    guests: "до 3 гостей",
    areaCard: "отдельный домик",
    areaDetail: "отдельный домик",
    cover: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.06.jpeg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.06.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.08.jpeg",
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.45.38.jpeg",
    ],
    displayCount: 3,
    video: null,
  },
  {
    title: "Трехместный номер с балконом",
    guests: "до 3 гостей",
    areaCard: "балкон",
    areaDetail: "балкон",
    cover: "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.07.jpeg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.07.jpeg",
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.09.jpeg",
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.11.jpeg",
    ],
    displayCount: 3,
    video: null,
  },
  {
    title: "Семейный номер «Люкс»",
    guests: "до 6 гостей",
    areaCard: "100 м²",
    areaDetail: "100 m²",
    cover: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.31.jpeg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.29.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.31.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.33.jpeg",
    ],
    displayCount: 3,
    video: null,
  },
  {
    title: "Четырехместный «Комфорт»",
    guests: "до 4 гостей",
    areaCard: "первый этаж",
    areaDetail: "первый этаж",
    cover: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.12.jpeg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.12.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.15.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.17.jpeg",
    ],
    displayCount: 3,
    video: null,
  },
];

// Fix typo in catalog - areaDetail should be 100 m² not 100 m² - I made typo "100 m²" vs "100 m²" - actually I wrote "100 m²" wrong as "100 m²" - let me fix: I wrote "100 m²" as areaDetail with wrong character - "100 m²" should be "100 м²"

catalog[10].areaDetail = "100 м²";

async function checkUrl(url) {
  if (url.startsWith("/")) {
    const local = join(root, "public", url.slice(1));
    if (!existsSync(local)) return { ok: false, status: "missing-local", url };
    return { ok: true, status: 200, url, local: true };
  }
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.status === 405 || res.status === 403) {
      const get = await fetch(url, { method: "GET", headers: { Range: "bytes=0-0" } });
      return { ok: get.ok, status: get.status, url };
    }
    return { ok: res.ok, status: res.status, url };
  } catch (e) {
    return { ok: false, status: "fetch-error", url, error: String(e) };
  }
}

console.log("=== STATIC & MEDIA ===\n");

for (const room of catalog) {
  const roomIssues = [];
  const roomWarns = [];

  if (room.areaCard !== room.areaDetail && (room.areaCard || room.areaDetail)) {
    roomWarns.push(`Площадь: карточка «${room.areaCard}», детали «${room.areaDetail}»`);
  }
  if (!room.areaCard && !room.areaDetail) {
    roomWarns.push("Площадь не указана ни в карточке, ни в деталях");
  }

  const coverR = await checkUrl(room.cover);
  if (!coverR.ok) roomIssues.push(`Обложка (${coverR.status}): ${room.cover}`);

  for (const img of room.gallery) {
    const r = await checkUrl(img);
    if (!r.ok) roomIssues.push(`Фото (${r.status}): ${img}`);
  }

  if (room.video) {
    const vr = await checkUrl(room.video);
    if (!vr.ok) roomIssues.push(`Видео (${vr.status}): ${room.video}`);
  }

  for (const w of roomWarns) warn(room.title, w);
  for (const i of roomIssues) err(room.title, i);
  if (!roomIssues.length && !roomWarns.length) clean.push(room.title);
}

console.log("=== UI (desktop 1280 / tablet 768 / iPhone 13) ===\n");

const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", ...devices["iPhone 13"].viewport, isMobile: true, hasTouch: true },
];

const browser = await chromium.launch();
const uiIssues = new Map(catalog.map((r) => [r.title, []]));

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
    userAgent: vp.name === "mobile" ? devices["iPhone 13"].userAgent : undefined,
  });
  const page = await context.newPage();

  try {
    await page.goto(`${BASE}/#rooms`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(600);

    for (const room of catalog) {
      const issues = uiIssues.get(room.title);

      const card = page.locator("article").filter({ has: page.getByRole("heading", { name: room.title, exact: true, level: 3 }) }).first();
      if (!(await card.isVisible())) {
        issues.push(`${vp.name}: карточка не видна`);
        continue;
      }

      const cardText = await card.innerText();
      if (!cardText.includes(room.guests)) issues.push(`${vp.name}: вместимость «${room.guests}» не в карточке`);
      if (room.areaCard && !cardText.includes(room.areaCard)) issues.push(`${vp.name}: площадь «${room.areaCard}» не в карточке`);

      await card.locator("button").first().click();
      await page.waitForTimeout(350);
      const closeBtn = page.getByRole("button", { name: "Закрыть" }).first();
      if (!(await closeBtn.isVisible())) {
        issues.push(`${vp.name}: модальное окно не открывается с карточки`);
      } else {
        const counter = await page.locator("text=/Фото \\d+ из \\d+/").first().textContent().catch(() => "");
        if (!counter.includes(`из ${room.gallery.length}`)) {
          issues.push(`${vp.name}: счётчик «${counter?.trim()}», ожидалось «из ${room.gallery.length}»`);
        }
        await page.keyboard.press("Escape");
        await page.waitForTimeout(250);
      }

      const detail = page.locator(`[id="room-${room.title}"]`);
      await detail.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);

      const detailText = (await detail.innerText()).toLowerCase();
      if (!detailText.includes(room.guests.toLowerCase())) issues.push(`${vp.name}: вместимость не в деталях`);
      if (room.areaDetail && !detailText.includes(room.areaDetail.toLowerCase())) issues.push(`${vp.name}: площадь «${room.areaDetail}» не в деталях`);

      const photoCount = await detail.locator("button img").count();
      if (photoCount < room.displayCount) {
        issues.push(`${vp.name}: в сетке ${photoCount} фото, ожидалось ${room.displayCount}`);
      }

      const bookBtn = detail.getByRole("link", { name: "Забронировать" });
      const photoBtn = detail.getByRole("button", { name: "Смотреть фото" });
      const videoBtn = detail.getByRole("button", { name: "Видеообзор" });

      if (!(await bookBtn.isVisible())) issues.push(`${vp.name}: нет «Забронировать»`);
      if (!(await photoBtn.isVisible())) issues.push(`${vp.name}: нет «Смотреть фото»`);
      if (room.video && !(await videoBtn.isVisible())) issues.push(`${vp.name}: нет «Видеообзор»`);
      if (!room.video && (await videoBtn.isVisible())) issues.push(`${vp.name}: лишняя «Видеообзор»`);

      await photoBtn.click();
      await page.waitForTimeout(350);
      if (!(await closeBtn.isVisible())) {
        issues.push(`${vp.name}: «Смотреть фото» не открывает модальное окно`);
      } else {
        if (room.gallery.length > 1) {
          await page.getByLabel("Следующее фото").click();
          await page.waitForTimeout(200);
          const navOk = await page.locator("text=/Фото 2 из/").first().isVisible().catch(() => false);
          if (!navOk) issues.push(`${vp.name}: навигация вперёд не работает`);
          const thumbs = await page.locator(".room-gallery-thumbs button").count();
          if (thumbs !== room.gallery.length) {
            issues.push(`${vp.name}: миниатюр ${thumbs}, ожидалось ${room.gallery.length}`);
          }
        }
        await page.keyboard.press("Escape");
        await page.waitForTimeout(250);
      }

      if (room.video) {
        await videoBtn.click();
        await page.waitForTimeout(500);
        const videoEl = page.locator("video").last();
        const src = (await videoEl.getAttribute("src")) || "";
        const file = room.video.split("/").pop();
        if (!src.includes(file)) issues.push(`${vp.name}: видео src «${src}», ожидалось «${file}»`);
        const closeVideo = page.getByLabel("Закрыть видео");
        if (await closeVideo.isVisible()) await closeVideo.click();
        else await page.keyboard.press("Escape");
        await page.waitForTimeout(250);
      }
    }
  } catch (e) {
    err(null, `UI ${vp.name}: ${e.message}`);
  }

  await context.close();
}

await browser.close();

for (const room of catalog) {
  const issues = uiIssues.get(room.title) || [];
  for (const i of issues) {
    if (i.includes("счётчик") || i.includes("не в карточке") && !room.areaCard) warn(room.title, i);
    else if (i.includes("Площадь")) warn(room.title, i);
    else err(room.title, i);
  }
  const idx = clean.indexOf(room.title);
  if (issues.length && idx >= 0) clean.splice(idx, 1);
}

rec("4 legacy-номера без видеообзора используют внешние URL denitsa.ru");
rec("«Трёхместный номер с балконом в корпусе» и «4-хместный Комфорт… 1 этаж» — нет площади в м² на карточке");
rec("При ошибке загрузки изображения подставляется heroImage (fallback) — битые фото могут быть неочевидны");
rec("Медиафайлы two-room-standard и другие новые папки не закоммичены в git");

console.log("\n========== ОТЧЁТ АУДИТА РАЗДЕЛА «НОМЕРА» ==========\n");
console.log(`URL: ${BASE} | Номеров: ${catalog.length} | Viewports: desktop, tablet (768px), iPhone 13 (390px)\n`);

console.log("## 1. ОШИБКИ");
if (errors.length) errors.forEach((e) => console.log("- " + e));
else console.log("- (нет)");

console.log("\n## 2. ПРЕДУПРЕЖДЕНИЯ");
if (warnings.length) warnings.forEach((w) => console.log("- " + w));
else console.log("- (нет)");

console.log("\n## 3. РЕКОМЕНДАЦИИ");
recommendations.forEach((r) => console.log("- " + r));

console.log("\n## 4. НОМЕРА БЕЗ ЗАМЕЧАНИЙ");
if (clean.length) clean.forEach((r) => console.log("- " + r));
else console.log("- (нет)");

console.log(`\nИтого: ошибок=${errors.length}, предупреждений=${warnings.length}, без замечаний=${clean.length}`);
process.exit(errors.length ? 1 : 0);
