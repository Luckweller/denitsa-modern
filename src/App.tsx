import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bath,
  Car,
  ChevronRight,
  Flame,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  PawPrint,
  Phone,
  Trees,
  Waves,
  Wifi,
  X,
} from "lucide-react";

const phone = "+7 953 091-25-21";
const phoneHref = "tel:+79530912521";
const whatsappHref = "https://wa.me/79530912521";
const email = "dennitsa_otdyh@mail.ru";
const address = "Республика Адыгея, Майкопский район, станица Даховская, ул. Речная, 17";

const heroImage = "https://denitsa.ru/wp-content/themes/clean_by_saxap/images/dennica_baza.jpg";
const territoryImage = "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.45.38.jpeg";
const bathImage = "https://denitsa.ru/wp-content/uploads/2019/12/bannij_kompleks_s_bassejnom.jpg";

const smoothReveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const smoothTransition = {
  duration: 1.15,
  ease: [0.16, 1, 0.3, 1],
};

const rooms = [
  {
    title: "Теремок",
    guests: "до 6 гостей",
    area: "75 м²",
    price: "уточнить цену",
    image: "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.11.jpeg",
  },
  {
    title: "Семейный номер с камином",
    guests: "до 6 гостей",
    area: "75 м²",
    price: "уточнить цену",
    image: "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.26.jpeg",
  },
  {
    title: "Домик «Премиум»",
    guests: "до 3 гостей",
    area: "отдельный домик",
    price: "уточнить цену",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.06.jpeg",
  },
  {
    title: "Трехместный номер с балконом",
    guests: "до 3 гостей",
    area: "балкон",
    price: "уточнить цену",
    image: "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.07.jpeg",
  },
  {
    title: "Семейный номер «Люкс»",
    guests: "до 6 гостей",
    area: "100 м²",
    price: "уточнить цену",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.31.jpeg",
  },
  {
    title: "Четырехместный «Комфорт»",
    guests: "до 4 гостей",
    area: "первый этаж",
    price: "уточнить цену",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.12.jpeg",
  },
];

const advantages = [
  [Waves, "Бассейн"],
  [Flame, "Банный комплекс"],
  [PawPrint, "Можно с питомцами"],
  [Car, "Парковка"],
  [Wifi, "Wi‑Fi"],
  [Trees, "Беседки и мангалы"],
] as const;

const roomDetails = [
  {
    title: "Теремок",
    guests: "до 6 гостей",
    area: "75 м²",
    description:
      "Двухэтажный дом со своей верандой. На первом этаже спальня, туалет с душевой и кухня. На втором этаже — спальные места, туалет и балкон.",
    details: ["Двухэтажный дом", "Своя веранда", "Кухня", "Балкон", "Туалет и душевая"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.11.jpeg",
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.12.jpeg",
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.56.jpeg",
    ],
  },
  {
    title: "Семейный номер с камином",
    guests: "до 6 гостей",
    area: "75 м²",
    description:
      "Семейный номер с камином: две изолированные спальни, гостиная, кухня, детский уголок, туалет и душевая.",
    details: ["2 спальни", "Камин", "Кухня", "Детский уголок", "До 6 гостей"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.26.jpeg",
      "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.28.jpeg",
      "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.30.jpeg",
    ],
  },
  {
    title: "Домик «Премиум»",
    guests: "до 3 гостей",
    area: "отдельный домик",
    description:
      "Отдельный одноэтажный домик из рубленного бревна: двуспальная кровать, диван-кровать, кондиционер, холодильник и душевая.",
    details: ["Отдельный домик", "Кондиционер", "Холодильник", "Душевая", "До 3 гостей"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.06.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.08.jpeg",
      territoryImage,
    ],
  },
  {
    title: "Трехместный номер с балконом",
    guests: "до 3 гостей",
    area: "балкон",
    description:
      "Номер на втором этаже гостиничного корпуса: двуспальная кровать, кресло-кровать, балкон, кондиционер, холодильник и душевая.",
    details: ["Балкон", "Второй этаж", "Кондиционер", "Холодильник", "До 3 гостей"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.07.jpeg",
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.09.jpeg",
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.11.jpeg",
    ],
  },
  {
    title: "Семейный номер «Люкс»",
    guests: "до 6 гостей",
    area: "100 м²",
    description:
      "Просторный семейный номер: две изолированные спальни, гостиная, кухня, детский уголок, туалет и душевая.",
    details: ["100 м²", "2 спальни", "Гостиная", "Кухня", "До 6 гостей"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.29.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.31.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.33.jpeg",
    ],
  },
  {
    title: "Четырехместный «Комфорт»",
    guests: "до 4 гостей",
    area: "первый этаж",
    description:
      "Комфортный номер на первом этаже в двухэтажном срубе: двуспальная кровать, диван-кровать, кондиционер, холодильник и душевая.",
    details: ["Первый этаж", "Диван-кровать", "Кондиционер", "Холодильник", "До 4 гостей"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.12.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.15.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.17.jpeg",
    ],
  },
];

const services = [
  {
    title: "Банный комплекс",
    text: "Русская парная, холодный бассейн, горячая купель, бильярд и гостиная.",
    image: bathImage,
  },
  {
    title: "Зоны барбекю",
    text: "Беседки, мангальные зоны и пространство для вечера компанией.",
    image: "https://denitsa.ru/wp-content/uploads/2019/12/besedki_i_mangaly_dennica.jpg",
  },
  {
    title: "Экскурсии",
    text: "Руфабго, Лаго-Наки, Гузерипль, Хаджохская теснина и маршруты рядом.",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/ekskursii_adygeja.jpg",
  },
];

const activeServices = [
  {
    title: "Экскурсии",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/ekskursii_adygeja.jpg",
  },
  {
    title: "Конные прогулки",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/konnye_progulki_dennica.jpg",
  },
  {
    title: "Рафтинг",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/rafting_v_adygee.jpg",
  },
  {
    title: "Джиппинг",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/jipping_dennica.jpg",
  },
];

const cafeGallery = [
  "https://denitsa.ru/wp-content/uploads/photo-gallery/kafe_dennitsa_%288%29.jpeg?bwg=1580578839",
  "https://denitsa.ru/wp-content/uploads/photo-gallery/kafe_dennitsa_%285%29.jpeg?bwg=1580578839",
  "https://denitsa.ru/wp-content/uploads/photo-gallery/kafe_dennitsa_%287%29.jpeg?bwg=1580578839",
];

function safeImage(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = heroImage;
}

function DenitsaLogo() {
  return (
    <div className="leading-none text-white">
      <div className="text-lg font-black uppercase tracking-[0.2em]">Денница</div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">База отдыха</div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#7A8B6F]">{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{title}</h2>
      {text ? <p className="mt-6 text-lg leading-8 text-[#2D2A26]/65">{text}</p> : null}
    </div>
  );
}

function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.01, margin: "0px 0px -160px 0px" }}
      variants={smoothReveal}
      transition={smoothTransition}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function PremiumPhotoButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`premium-photo group relative overflow-hidden bg-[#171411] text-left ${className}`}
    >
      {children}
    </button>
  );
}

export default function DenitsaHomepagePreview() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F5F1EA] text-[#2D2A26]">
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .premium-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 38%, rgba(255,255,255,0.11), transparent 36%),
            linear-gradient(to top, rgba(179,138,90,0.16), transparent 60%);
          opacity: 0;
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .premium-photo:hover::after { opacity: 1; }
      `}</style>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 text-white lg:px-8">
          <a href="#" className="block origin-left scale-90">
            <DenitsaLogo />
          </a>

          <nav className="hidden items-center gap-10 text-[13px] uppercase tracking-[0.18em] text-white/65 lg:flex">
            <a href="#rooms" className="hover:text-white">Номера</a>
            <a href="#territory" className="hover:text-white">Территория</a>
            <a href="#services" className="hover:text-white">Баня</a>
            <a href="#cafe" className="hover:text-white">Кафе</a>
            <a href="#contacts" className="hover:text-white">Контакты</a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/80 transition duration-300 hover:bg-white/10 hover:text-white" href={phoneHref}>{phone}</a>
            <a className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]" href={whatsappHref}>WhatsApp</a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="rounded-full border border-white/25 p-2 lg:hidden" aria-label="Открыть меню">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#2D2A26]/95 px-6 py-6 text-white backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <DenitsaLogo />
              <button type="button" onClick={() => setIsMenuOpen(false)} className="rounded-full border border-white/20 p-3">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-16 grid gap-6 text-4xl font-semibold tracking-[-0.04em]">
              {[
                ["Номера", "#rooms"],
                ["Территория", "#territory"],
                ["Баня", "#services"],
                ["Кафе", "#cafe"],
                ["Контакты", "#contacts"],
              ].map(([title, href]) => (
                <a key={title} href={href} onClick={() => setIsMenuOpen(false)}>{title}</a>
              ))}
            </nav>

            <div className="absolute bottom-8 left-6 right-6 grid gap-3">
              <a href={whatsappHref} className="rounded-full bg-white px-6 py-4 text-center font-medium text-[#2D2A26]">Написать в WhatsApp</a>
              <a href={phoneHref} className="rounded-full border border-white/20 px-6 py-4 text-center font-medium text-white">{phone}</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="relative min-h-[92vh] overflow-hidden md:min-h-[100vh]">
        <div className="absolute inset-0 bg-cover bg-center [animation:heroZoom_38s_ease-in-out_infinite_alternate]" style={{ backgroundImage: `url('${heroImage}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/45" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B38A5A]/18 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-20 right-10 h-64 w-64 rounded-full bg-white/10 blur-[90px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#F5F1EA] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center md:min-h-[100vh] md:px-6 md:pb-24 md:pt-32 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...smoothTransition, delay: 0.15 }} className="flex flex-col items-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white/85 backdrop-blur-md">
              <Mountain className="h-4 w-4" />
              Даховская · Адыгея
            </div>

            <h1 className="max-w-5xl text-[42px] font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Тихий отдых в горах Адыгеи
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 md:mt-6 md:text-xl md:leading-8">
              Домики и номера с бассейном, банным комплексом и природой вокруг.
            </p>

            <div className="mt-7 flex max-w-[340px] flex-wrap justify-center gap-2 text-xs text-white/80 sm:max-w-none sm:gap-3 sm:text-sm">
              {["Бассейн", "Баня 200 м²", "Кафе", "Рядом с Лаго-Наки", "Можно с питомцами"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">{item}</span>
              ))}
            </div>

            <div className="mt-9 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
              <a href={whatsappHref} className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">
                <MessageCircle className="h-5 w-5" />
                Написать в WhatsApp
              </a>
              <a href={phoneHref} className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/20 px-7 py-4 text-base font-medium text-white backdrop-blur-sm transition duration-300 hover:bg-white/10">
                Позвонить
              </a>
            </div>

            <div className="mt-10 grid w-full max-w-5xl gap-3 rounded-[1.7rem] border border-white/15 bg-white/10 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:mt-14 md:grid-cols-4 md:gap-4 md:rounded-[2.2rem] md:p-4">
              {[
                ["Бассейн", "Открытая зона отдыха"],
                ["Баня", "Комплекс более 200 м²"],
                ["Маршруты", "Руфабго и Лаго-Наки"],
                ["Домики", "Для семьи и компании"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.3rem] bg-white/10 p-4 text-left transition duration-300 hover:bg-white/[0.14] md:rounded-[1.6rem] md:p-5">
                  <div className="text-xl font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">{text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-5 md:-mt-14 lg:px-8">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-28 w-[90vw] -translate-x-1/2 rounded-full bg-[#F5F1EA]/70 blur-3xl" />
        <div className="grid gap-2 rounded-[1.6rem] bg-white p-3 shadow-xl sm:grid-cols-2 md:grid-cols-3 md:gap-3 md:rounded-[2rem] md:p-4 lg:grid-cols-6">
          {advantages.map(([Icon, title]) => (
            <div key={title} className="flex items-center gap-3 rounded-2xl bg-[#F5F1EA] p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7A8B6F]/15 text-[#7A8B6F]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium">{title}</div>
            </div>
          ))}
        </div>
      </section>

      <RevealSection className="mx-auto max-w-7xl px-5 py-20 md:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Почему выбирают Денницу</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Отдых рядом с природой, но с комфортом</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#2D2A26]/65">
            Здесь можно остановиться на выходные, приехать с детьми, собраться компанией, сходить в баню и быстро добраться до популярных мест Адыгеи.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [MapPin, "Рядом с маршрутами", "Быстрый доступ к главным местам Адыгеи."],
            [Bath, "Банный комплекс", "Парная, холодный бассейн, горячая купель, бильярд и гостиная."],
            [Trees, "Своя территория", "Бассейн, беседки, мангалы и зоны отдыха."],
            [PawPrint, "Можно с питомцем", "Размещение с питомцами до 15 кг по правилам комплекса."],
          ].map(([Icon, title, text]) => (
            <motion.div key={title as string} variants={smoothReveal} transition={smoothTransition} className="rounded-[2rem] bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7DFD3]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-[#2D2A26]/62">{text}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="rooms" className="relative overflow-hidden bg-[#2D2A26] py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F5F1EA] to-transparent opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F5F1EA] to-transparent opacity-10" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#B38A5A]">Номера и домики</p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Выберите свой формат отдыха</h2>
            </div>
            <a className="inline-flex items-center text-white/75 hover:text-white" href={whatsappHref}>Уточнить наличие <ChevronRight className="ml-1 h-4 w-4" /></a>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.title} className="group flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-white/8 ring-1 ring-white/10 transition duration-500 hover:bg-white/[0.11] hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
                <PremiumPhotoButton onClick={() => setSelectedImage(room.image)} className="h-60 md:h-72">
                  <img src={room.image} alt={room.title} onError={safeImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </PremiumPhotoButton>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-[28px]">{room.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
                    <span className="rounded-full bg-white/10 px-3 py-1">{room.guests}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{room.area}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <div className="text-lg font-semibold">{room.price}</div>
                    <a href={`#room-${room.title}`} className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">Подробнее</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection id="room-details" className="relative bg-[#F5F1EA] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#2D2A26]/10 to-transparent" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="Номера подробно" title="Посмотрите фото и детали каждого варианта" text="Каждый номер можно открыть, посмотреть галерею и быстро перейти к бронированию через WhatsApp." />

          <div className="grid gap-10">
            {roomDetails.map((room) => (
              <article id={`room-${room.title}`} key={room.title} className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm ring-1 ring-[#2D2A26]/5 transition duration-500 hover:shadow-[0_24px_80px_rgba(45,42,38,0.12)]">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-4 md:gap-3">
                    {room.gallery.map((image, index) => (
                      <PremiumPhotoButton
                        key={image}
                        onClick={() => setSelectedImage(image)}
                        className={index === 0 ? "col-span-2 row-span-2 min-h-[320px] rounded-[2rem] md:col-span-2 md:min-h-[420px]" : "min-h-[155px] rounded-[1.4rem] md:min-h-[205px]"}
                      >
                        <img src={image} alt={`${room.title} — фото ${index + 1}`} onError={safeImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />
                      </PremiumPhotoButton>
                    ))}
                  </div>

                  <div className="flex flex-col justify-center p-7 md:p-12">
                    <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">{room.guests} · {room.area}</p>
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{room.title}</h3>
                    <p className="mt-6 text-base leading-7 text-[#2D2A26]/65 md:text-lg md:leading-8">{room.description}</p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {room.details.map((detail) => (
                        <span key={detail} className="rounded-full bg-[#F5F1EA] px-4 py-2 text-sm text-[#2D2A26]/75">{detail}</span>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <a href={whatsappHref} className="inline-flex items-center justify-center rounded-full bg-[#2D2A26] px-6 py-4 font-medium text-white transition duration-300 hover:bg-[#B38A5A]">Забронировать</a>
                      <button type="button" onClick={() => setSelectedImage(room.gallery[0])} className="inline-flex items-center justify-center rounded-full border border-[#2D2A26]/15 px-6 py-4 font-medium text-[#2D2A26] transition duration-300 hover:bg-[#F5F1EA]">Смотреть фото</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative overflow-hidden bg-[#F5F1EA] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 -top-10 z-10 h-24 bg-gradient-to-b from-[#F5F1EA] to-transparent" />
        <motion.div initial={{ opacity: 0.15, scale: 1.02 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <img src={territoryImage} alt="Территория Денницы" onError={safeImage} className="h-full w-full object-cover opacity-25" />
        </motion.div>
        <div className="absolute inset-0 bg-[#2D2A26]/45" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white lg:px-8">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-white/60">Атмосфера Денницы</p>
          <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-6xl">Тишина гор, запах дерева и вечерняя баня после прогулок по Адыгее</h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/75">Пространство для спокойного отдыха: теплый свет, деревянные домики, бассейн, банный комплекс и природа вокруг.</p>
        </div>
      </RevealSection>

      <RevealSection id="territory" className="relative mx-auto max-w-7xl px-5 py-20 md:py-24 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[80vw] -translate-x-1/2 rounded-full bg-[#E7DFD3]/50 blur-3xl" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-[#E7DFD3] p-8 md:p-12">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Территория</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Банный комплекс, бассейн, беседки и вечерний свет</h2>
            <p className="mt-7 text-lg leading-8 text-[#2D2A26]/65">На территории есть зоны для отдыха, бассейн, беседки и мангальные места. Отдельный акцент — банный комплекс более 200 м².</p>
          </div>
          <PremiumPhotoButton onClick={() => setSelectedImage(territoryImage)} className="min-h-[420px] rounded-[2.5rem]">
            <img src={territoryImage} alt="Территория комплекса" onError={safeImage} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
          </PremiumPhotoButton>
        </div>
      </RevealSection>

      <RevealSection id="services" className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5F1EA] to-transparent" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="Услуги базы" title="Баня, барбекю и маршруты" text="Собрали главное, ради чего гости приезжают на выходные: отдых на территории, баня и поездки по Адыгее." />

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="group overflow-hidden rounded-[2rem] bg-[#F5F1EA] shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <PremiumPhotoButton onClick={() => setSelectedImage(service.image)} className="h-60 w-full">
                  <img src={service.image} alt={service.title} onError={safeImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </PremiumPhotoButton>
                <div className="p-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-4 leading-7 text-[#2D2A26]/65">{service.text}</p>
                  <a href={whatsappHref} className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">Уточнить</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative overflow-hidden bg-[#F5F1EA] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="Активный отдых" title="Экскурсии и маршруты по Адыгее" text="Можно выбрать спокойную прогулку или активный маршрут: экскурсии, конные прогулки, рафтинг и джиппинг." />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {activeServices.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <PremiumPhotoButton onClick={() => setSelectedImage(item.image)} className="h-64 w-full">
                  <img src={item.image} alt={item.title} onError={safeImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </PremiumPhotoButton>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#2D2A26]">{item.title}</h3>
                  <a href={whatsappHref} className="mt-6 inline-flex rounded-full bg-[#F5F1EA] px-5 py-3 text-sm font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">Подробнее</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative overflow-hidden bg-[#171411] py-24 text-white md:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-[#F5F1EA] to-transparent opacity-20" />
        <div className="absolute inset-0">
          <img src={bathImage} alt="Банный комплекс Денница" onError={safeImage} className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171411] via-[#171411]/75 to-transparent" />
          <div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 rounded-full bg-[#B38A5A]/20 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:px-8">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#B38A5A]">Вечерний отдых</p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-6xl">Баня, теплый свет и спокойный вечер после горных маршрутов</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/72">Теплый свет, деревянные домики и спокойная атмосфера создают ощущение уединенного отдыха в горах.</p>
        </div>
      </RevealSection>

      <RevealSection id="cafe" className="relative overflow-hidden bg-[#F5F1EA] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#171411]/10 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Кафе на территории</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Уютное кафе в деревянном стиле</h2>
            <p className="mt-6 text-lg leading-8 text-[#2D2A26]/65">Просторный зал, деревянная мебель, барная стойка, большие окна и спокойная атмосфера после прогулок по Адыгее.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {cafeGallery.map((image, index) => (
              <PremiumPhotoButton key={image} onClick={() => setSelectedImage(image)} className={index === 0 ? "col-span-2 row-span-2 min-h-[300px] rounded-[2rem] md:min-h-[420px]" : "min-h-[170px] rounded-[1.5rem] md:min-h-[205px]"}>
                <img src={image} alt={`Кафе Денница ${index + 1}`} onError={safeImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70" />
              </PremiumPhotoButton>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection id="contacts" className="relative overflow-hidden bg-[#B38A5A] py-20 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5F1EA] to-transparent opacity-25" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/70">Бронирование</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Подберем номер под ваши даты</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Напишите в WhatsApp или позвоните — администратор уточнит даты, количество гостей и предложит подходящий вариант.</p>
            <p className="mt-5 text-white/70">{address}<br />{email}</p>
          </div>
          <div className="grid gap-3 rounded-[2rem] bg-white p-5 text-[#2D2A26] shadow-2xl">
            <a href={whatsappHref} className="flex items-center justify-center gap-2 rounded-2xl bg-[#2D2A26] px-6 py-4 font-medium text-white transition duration-300 hover:bg-[#7A8B6F]">
              <MessageCircle className="h-4 w-4" /> Написать в WhatsApp
            </a>
            <a href={phoneHref} className="flex items-center justify-center gap-2 rounded-2xl border border-[#2D2A26]/10 px-6 py-4 font-medium transition duration-300 hover:bg-[#F5F1EA]">
              <Phone className="h-4 w-4" /> {phone}
            </a>
          </div>
        </div>
      </RevealSection>

      <footer className="relative overflow-hidden bg-[#171411] px-5 py-24 text-white lg:px-8">
        <div className="absolute inset-0">
          <img src={bathImage} alt="Вечерняя Денница" onError={safeImage} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171411] via-[#171411]/88 to-[#171411]/65" />
          <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-[#B38A5A]/18 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-5 text-sm uppercase tracking-[0.28em] text-[#B38A5A]">Денница · Адыгея</p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] md:text-6xl">Приезжайте за тишиной гор, теплым светом и спокойным отдыхом</h2>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68">Бассейн, банный комплекс, деревянные домики и природа вокруг — пространство для спокойных выходных в Адыгее.</p>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <a href={whatsappHref} className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">
                <MessageCircle className="h-5 w-5" />
                Написать в WhatsApp
              </a>

              <a href={phoneHref} className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-4 text-base font-medium text-white transition duration-300 hover:bg-white/10">
                <Phone className="h-5 w-5" />
                {phone}
              </a>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/65">
                {address}
                <br />
                {email}
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <DenitsaLogo />
            <div className="flex flex-wrap gap-6 text-sm text-white/45">
              <a href="#rooms" className="transition hover:text-white">Номера</a>
              <a href="#services" className="transition hover:text-white">Баня</a>
              <a href="#cafe" className="transition hover:text-white">Кафе</a>
              <a href="#contacts" className="transition hover:text-white">Контакты</a>
            </div>
          </div>
        </div>
      </footer>

      <a href={whatsappHref} className="fixed bottom-5 right-5 z-50 hidden rounded-full border border-white/20 bg-[#2D2A26]/85 px-5 py-4 text-sm font-medium text-white shadow-2xl backdrop-blur-xl transition duration-300 hover:bg-[#7A8B6F] md:inline-flex">
        WhatsApp
      </a>

      <AnimatePresence>
        {selectedImage ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              type="button"
              aria-label="Закрыть фото"
              className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/90 px-5 py-3 text-sm font-medium text-[#2D2A26] shadow-2xl backdrop-blur-xl transition duration-300 hover:bg-white"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedImage(null);
              }}
            >
              Закрыть
            </motion.button>

            <motion.div
              className="pointer-events-none absolute inset-x-8 bottom-8 top-8 rounded-[3rem] border border-white/10"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.img
              src={selectedImage}
              alt="Просмотр фото"
              onError={safeImage}
              className="max-h-[90vh] max-w-[95vw] rounded-[2rem] object-contain shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, scale: 0.965, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.975, y: 10, filter: "blur(6px)" }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
