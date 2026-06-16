import { useState, useEffect, useRef, type MouseEvent, type MouseEventHandler, type ReactNode, type SyntheticEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bath,
  CalendarDays,
  Car,
  ChevronLeft,
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
const maxHref = "https://max.ru/79530912521";
const email = "dennitsa_otdyh@mail.ru";
const address = "Республика Адыгея, Майкопский район, станица Даховская, ул. Речная, 17";

const heroImage = "https://denitsa.ru/wp-content/themes/clean_by_saxap/images/dennica_baza.jpg";
const territoryImage = "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.45.38.jpeg";
const bathImage = "https://denitsa.ru/wp-content/uploads/2019/12/bannij_kompleks_s_bassejnom.jpg";

const smoothReveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const smoothEase = [0.16, 1, 0.3, 1] as const;
const softEase = [0.22, 1, 0.36, 1] as const;

const smoothTransition = {
  duration: 1.15,
  ease: smoothEase,
};

const teremokCover = "/images/rooms/teremok/teremok-exterior-main.jpg";
const teremokGallery = [
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
];
const teremokVideo = "/videos/rooms/teremok/teremok-tour.mp4";

const rooms = [
  {
    title: "Теремок",
    type: "Семейный дом в горах",
    guests: "до 6 гостей",
    area: "75 м²",
    price: "уточнить цену",
    image: teremokCover,
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
  { Icon: Waves, title: "Бассейн" },
  { Icon: Flame, title: "Банный комплекс" },
  { Icon: PawPrint, title: "Можно с питомцами" },
  { Icon: Car, title: "Парковка" },
  { Icon: Wifi, title: "Wi‑Fi" },
  { Icon: Trees, title: "Беседки и мангалы" },
];

const roomDetails = [
  {
    title: "Теремок",
    type: "Семейный дом в горах",
    guests: "до 6 гостей",
    area: "75 м²",
    description:
      "Двухэтажный семейный дом с верандой, балконом и видом на горы. Подходит для семьи или компании друзей.",
    details: [
      "2 этажа",
      "до 6 гостей",
      "полноценная кухня",
      "веранда",
      "балкон",
      "2 санузла",
      "душ",
      "кондиционер",
      "телевизор",
      "вид на горы",
    ],
    gallery: teremokGallery,
    video: teremokVideo,
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

function safeImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = heroImage;
}

function DenitsaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`font-premium leading-none text-white ${className}`}>
      <div className="text-[17px] font-medium uppercase tracking-[0.34em]">Денница</div>
      <div className="mt-2 text-[8.5px] font-normal uppercase tracking-[0.42em] text-white/52">База отдыха</div>
    </div>
  );
}

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#7A8B6F]">{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{title}</h2>
      {text ? <p className="mt-6 text-lg leading-8 text-[#2D2A26]/65">{text}</p> : null}
    </div>
  );
}

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

function RevealSection({ children, className = "", id }: RevealSectionProps) {
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

type PremiumPhotoButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function PremiumPhotoButton({ children, className = "", onClick }: PremiumPhotoButtonProps) {
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
  const [photoGallery, setPhotoGallery] = useState<{ images: string[]; index: number; label?: string | null } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const activeThumbRef = useRef<HTMLButtonElement | null>(null);

  const getDetailGallery = (room: (typeof roomDetails)[number]) => {
    if (room.gallery?.length) return room.gallery;
    const cover = rooms.find((item) => item.title === room.title)?.image;
    return cover ? [cover] : [];
  };

  const getRoomGalleryLabel = (room: { title: string; type?: string }) => {
    if ("type" in room && room.type && room.title) {
      const typePrefix = room.type.split(" в ")[0];
      return `${typePrefix} «${room.title}»`;
    }
    return null;
  };

  const getGalleryCounterText = (gallery: NonNullable<typeof photoGallery>) => {
    const photoPart = `Фото ${gallery.index + 1} из ${gallery.images.length}`;
    return gallery.label ? `${gallery.label} • ${photoPart}` : photoPart;
  };

  const openPhotoGallery = (images: string[], index = 0, label?: string | null) => {
    if (!images.length) return;
    setPhotoGallery({
      images,
      index: Math.max(0, Math.min(index, images.length - 1)),
      label,
    });
  };

  const setPhotoGalleryIndex = (index: number) => {
    setPhotoGallery((current) =>
      current ? { ...current, index: Math.max(0, Math.min(index, current.images.length - 1)) } : current,
    );
  };

  const closePhotoGallery = () => setPhotoGallery(null);

  const setSelectedImage = (image: string) => openPhotoGallery([image], 0);

  const showPrevPhoto = () => {
    setPhotoGallery((current) =>
      current && current.images.length > 1
        ? { ...current, index: (current.index - 1 + current.images.length) % current.images.length }
        : current,
    );
  };

  const showNextPhoto = () => {
    setPhotoGallery((current) =>
      current && current.images.length > 1
        ? { ...current, index: (current.index + 1) % current.images.length }
        : current,
    );
  };

  useEffect(() => {
    if (!photoGallery) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePhotoGallery();
      if (event.key === "ArrowLeft") showPrevPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [photoGallery]);

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [photoGallery?.index]);

  return (
    <main className="min-h-screen bg-[#F5F1EA] text-[#2D2A26]">
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
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
        .room-gallery-thumbs {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.28) transparent;
        }
        .room-gallery-thumbs::-webkit-scrollbar {
          height: 6px;
        }
        .room-gallery-thumbs::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.28);
          border-radius: 999px;
        }
        .site-header-glass {
          background:
            linear-gradient(
              180deg,
              rgba(16, 28, 34, 0.58) 0%,
              rgba(14, 24, 30, 0.42) 55%,
              rgba(12, 22, 28, 0.48) 100%
            );
          backdrop-filter: blur(18px) saturate(1.25);
          -webkit-backdrop-filter: blur(18px) saturate(1.25);
          border-bottom: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            0 8px 32px rgba(8, 16, 20, 0.12);
        }
        .site-nav-link {
          position: relative;
          font-family: "Inter", "Manrope", "Helvetica Neue", Arial, sans-serif;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.68);
          transition: color 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -7px;
          width: calc(100% - 0.35em);
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(231, 223, 211, 0.75), transparent);
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-nav-link:hover { color: rgba(255, 255, 255, 0.96); }
        .site-nav-link:hover::after { transform: translateX(-50%) scaleX(1); }
        .site-header-phone {
          font-family: "Inter", "Manrope", "Helvetica Neue", Arial, sans-serif;
          font-weight: 400;
          letter-spacing: 0.1em;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          transition: color 400ms cubic-bezier(0.16, 1, 0.3, 1), background 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-header-phone:hover {
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.05);
        }
        .site-header-max {
          font-family: "Inter", "Manrope", "Helvetica Neue", Arial, sans-serif;
          font-weight: 500;
          letter-spacing: 0.22em;
          font-size: 11px;
        }
        .hero-media {
          filter: saturate(1.14) contrast(1.07) brightness(1.04);
        }
        .hero-media-mobile {
          filter: saturate(1.1) contrast(1.05) brightness(1.02);
        }
        .hero-color-grade {
          pointer-events: none;
          opacity: 0.92;
          background:
            radial-gradient(ellipse 68% 48% at 18% 34%, rgba(108, 158, 92, 0.16), transparent 56%),
            radial-gradient(ellipse 58% 44% at 82% 28%, rgba(88, 148, 178, 0.12), transparent 54%),
            radial-gradient(ellipse 48% 36% at 52% 68%, rgba(179, 138, 90, 0.11), transparent 50%),
            linear-gradient(180deg, rgba(255, 248, 235, 0.08) 0%, transparent 32%);
          mix-blend-mode: soft-light;
        }
        .hero-cinematic-overlay {
          pointer-events: none;
          background:
            linear-gradient(
              180deg,
              rgba(12, 20, 18, 0.36) 0%,
              rgba(12, 20, 18, 0.1) 11%,
              transparent 24%
            ),
            linear-gradient(
              0deg,
              rgba(16, 22, 20, 0.1) 0%,
              transparent 16%
            ),
            radial-gradient(
              ellipse 115% 95% at 50% 50%,
              transparent 52%,
              rgba(14, 20, 18, 0.1) 100%
            );
        }
        .hero-text-scrim {
          pointer-events: none;
          background: radial-gradient(
            ellipse 72% 40% at 50% 47%,
            rgba(18, 24, 20, 0.22) 0%,
            rgba(18, 24, 20, 0.08) 48%,
            transparent 72%
          );
        }
        .hero-copy h1 {
          text-shadow:
            0 3px 36px rgba(8, 14, 12, 0.48),
            0 1px 8px rgba(8, 14, 12, 0.32);
        }
        .hero-copy p {
          text-shadow:
            0 2px 24px rgba(8, 14, 12, 0.42),
            0 1px 4px rgba(8, 14, 12, 0.24);
        }
        .hero-location-badge {
          margin-bottom: 0;
        }
        .hero-copy .hero-slogan {
          margin: 0.9375rem 0 1.5rem;
          max-width: 100%;
          font-family: "Inter", "Manrope", "Helvetica Neue", Arial, sans-serif;
          font-size: 17px;
          font-weight: 300;
          font-style: normal;
          letter-spacing: 0.04em;
          line-height: 1.35;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
          text-shadow:
            0 1px 18px rgba(8, 14, 12, 0.26),
            0 1px 2px rgba(8, 14, 12, 0.14);
        }
        .hero-btn-rooms {
          border: 1px solid rgba(196, 184, 160, 0.28);
          background: rgba(74, 78, 66, 0.38);
          color: rgba(245, 241, 234, 0.94);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 10px 32px rgba(8, 14, 12, 0.18);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition:
            background 300ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-btn-rooms:hover {
          border-color: rgba(212, 200, 176, 0.38);
          background: rgba(86, 90, 76, 0.48);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 12px 36px rgba(8, 14, 12, 0.22);
        }
        @media (max-width: 767px) {
          .hero-color-grade {
            opacity: 0.88;
            background:
              radial-gradient(ellipse 72% 50% at 16% 36%, rgba(108, 158, 92, 0.14), transparent 58%),
              radial-gradient(ellipse 62% 42% at 84% 30%, rgba(72, 118, 138, 0.06), transparent 56%),
              radial-gradient(ellipse 52% 38% at 50% 72%, rgba(179, 138, 90, 0.12), transparent 52%),
              linear-gradient(180deg, rgba(255, 248, 235, 0.06) 0%, transparent 28%);
          }
          .hero-text-scrim {
            background:
              radial-gradient(
                ellipse 88% 48% at 50% 42%,
                rgba(18, 24, 20, 0.26) 0%,
                rgba(18, 24, 20, 0.1) 46%,
                transparent 70%
              );
          }
          .hero-mobile-bottom-warm {
            pointer-events: none;
            background:
              linear-gradient(
                0deg,
                rgba(72, 58, 44, 0.14) 0%,
                rgba(139, 118, 88, 0.08) 22%,
                rgba(179, 138, 90, 0.04) 38%,
                transparent 58%
              );
          }
          .hero-copy h1 {
            font-size: 31px;
            line-height: 1.06;
          }
          .hero-copy .hero-slogan {
            margin: 0.875rem 0 1.25rem;
            max-width: 100%;
            font-size: 14px;
            line-height: 1.35;
          }
          .hero-copy p:not(.hero-slogan) {
            margin-top: 1.2rem;
            max-width: 17rem;
            font-size: 14px;
            line-height: 1.58;
          }
          .hero-copy .hero-badges-wrap {
            margin-top: 2.25rem;
            gap: 0.375rem;
          }
          .hero-copy .hero-buttons-wrap {
            margin-top: 2.875rem;
            gap: 0.625rem;
          }
          .hero-badge {
            border-color: rgba(196, 184, 160, 0.16);
            background: rgba(74, 78, 66, 0.18);
            padding: 0.2rem 0.55rem;
            font-size: 9.5px;
            line-height: 1.15;
            letter-spacing: 0.045em;
            color: rgba(245, 241, 234, 0.78);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          .hero-btn-book {
            min-height: 48px;
            padding: 0.7rem 1.5rem;
            font-size: 14px;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
          }
          .hero-btn-rooms {
            min-height: 48px;
            padding: 0.7rem 1.5rem;
            font-size: 14px;
            border-color: rgba(196, 184, 160, 0.28);
            background: rgba(68, 72, 60, 0.4);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              0 6px 24px rgba(8, 14, 12, 0.14);
          }
        }
        @media (min-width: 768px) {
          .hero-cinematic-overlay {
            background:
              linear-gradient(
                180deg,
                rgba(12, 20, 18, 0.32) 0%,
                rgba(12, 20, 18, 0.08) 12%,
                transparent 26%
              ),
              linear-gradient(
                0deg,
                rgba(16, 22, 20, 0.08) 0%,
                transparent 14%
              ),
              radial-gradient(
                ellipse 110% 92% at 50% 50%,
                transparent 54%,
                rgba(14, 20, 18, 0.08) 100%
              );
          }
          .hero-text-scrim {
            background: radial-gradient(
              ellipse 68% 38% at 50% 46%,
              rgba(18, 24, 20, 0.2) 0%,
              rgba(18, 24, 20, 0.06) 50%,
              transparent 74%
            );
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-media,
          .hero-media-mobile { filter: none; }
        }
      `}</style>

      <header className="site-header-glass fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 text-white lg:px-8 lg:py-[1.125rem]">
          <a href="#" className="block shrink-0 transition-opacity duration-300 hover:opacity-88">
            <img src="/logo-dennica.svg" alt="Денница" className="block h-auto w-[162px] md:w-[224px]" />
          </a>

          <nav className="hidden items-center gap-10 xl:gap-11 lg:flex">
            {[
              ["Номера", "#rooms"],
              ["Территория", "#territory"],
              ["Баня", "#services"],
              ["Кафе", "#cafe"],
              ["Контакты", "#contacts"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="site-nav-link">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a className="site-header-phone rounded-full px-4 py-2.5" href={phoneHref}>
              {phone}
            </a>
            <a
              className="site-header-max rounded-full border border-white/20 bg-white/[0.94] px-6 py-2.5 text-[#2D2A26] uppercase shadow-[0_6px_24px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.65)] transition duration-300 hover:border-white/30 hover:bg-white hover:shadow-[0_10px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]"
              href={maxHref}
            >
              MAX
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/90 backdrop-blur-sm transition duration-300 hover:border-white/25 hover:bg-white/10 lg:hidden"
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="fixed inset-0 z-[90] bg-gradient-to-b from-[#2D2A26]/98 via-[#2D2A26]/96 to-[#1f1c19]/98 px-6 py-6 text-white backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <DenitsaLogo />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav className="font-premium mt-14 grid gap-6">
              {[
                ["Номера", "#rooms"],
                ["Территория", "#territory"],
                ["Баня", "#services"],
                ["Кафе", "#cafe"],
                ["Контакты", "#contacts"],
              ].map(([title, href]) => (
                <a
                  key={title}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-medium uppercase tracking-[0.14em] text-white/92 transition hover:text-[#E7DFD3]"
                >
                  {title}
                </a>
              ))}
            </nav>

            <div className="font-premium absolute bottom-8 left-6 right-6 grid gap-3">
              <a
                href={maxHref}
                className="rounded-full bg-white/[0.94] px-6 py-4 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-[#2D2A26] shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
              >
                Написать в MAX
              </a>
              <a
                href={phoneHref}
                className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-center text-[13px] font-normal tracking-[0.1em] text-white/88"
              >
                {phone}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="relative min-h-[100svh] overflow-hidden md:min-h-[100vh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage}
          className="hero-media-mobile absolute inset-0 h-full w-full object-cover md:hidden"
        >
          <source src="/videos/hero-mobile.webm" type="video/webm" />
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        </video>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage}
          className="hero-media absolute inset-0 hidden h-full w-full object-cover md:block"
        >
          <source src="/videos/hero-loop.webm" type="video/webm" />
          <source src="/videos/hero-loop.mov" type="video/quicktime" />
        </video>

        <div className="hero-color-grade absolute inset-0 z-[1]" aria-hidden />
        <div className="hero-cinematic-overlay absolute inset-0 z-[2]" aria-hidden />
        <div className="hero-text-scrim absolute inset-0 z-[3]" aria-hidden />
        <div className="hero-mobile-bottom-warm absolute inset-0 z-[3] md:hidden" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center md:min-h-[100vh] md:px-6 md:pb-28 md:pt-36 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.15 }}
            className="hero-copy font-premium flex flex-col items-center"
          >
            <div className="hero-location-badge inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/78 backdrop-blur-md sm:text-[11px] md:px-5 md:py-2.5">
              <Mountain className="h-3.5 w-3.5 text-[#E7DFD3]/90" strokeWidth={1.75} />
              Даховская · Адыгея
            </div>

            <p className="hero-slogan">Здесь тишина лечит душу</p>

            <h1 className="max-w-5xl text-[36px] font-medium leading-[1.14] tracking-[-0.025em] text-white md:text-6xl md:leading-[1.12] lg:text-[4.25rem] lg:leading-[1.1]">
              Тихий отдых в горах Адыгеи
            </h1>

            <p className="mt-6 max-w-[360px] text-[16px] font-normal leading-[1.78] tracking-[0.01em] text-white/76 md:mt-7 md:max-w-2xl md:text-[1.2rem] md:leading-[1.82]">
              Домики и номера с бассейном, банным комплексом и природой вокруг.
            </p>

            <div className="hero-badges-wrap mt-8 flex max-w-[340px] flex-wrap justify-center gap-1.5 sm:max-w-none md:gap-2.5">
              {["Бассейн", "Баня 200 м²", "Кафе", "Рядом с Лаго-Наки", "Можно с питомцами"].map((item) => (
                <span
                  key={item}
                  className="hero-badge rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.06em] backdrop-blur-sm md:border-white/[0.09] md:bg-white/[0.04] md:px-3.5 md:py-2 md:text-xs md:text-white/75"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="hero-buttons-wrap mt-10 flex w-full max-w-[360px] flex-col gap-2.5 sm:max-w-none md:flex-row md:justify-center md:gap-3.5">
              <a
                href={maxHref}
                className="hero-btn-book inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#F5F1EA] px-7 py-3.5 text-[15px] font-medium tracking-[0.02em] text-[#2D2A26] shadow-[0_16px_48px_rgba(0,0,0,0.22)] transition duration-300 hover:bg-[#E7DFD3] hover:shadow-[0_20px_56px_rgba(0,0,0,0.26)] md:min-h-[52px]"
              >
                <CalendarDays className="h-[18px] w-[18px]" strokeWidth={1.75} />
                Забронировать
                <ArrowRight className="h-4 w-4 opacity-70" strokeWidth={1.75} />
              </a>
              <a
                href="#rooms"
                className="hero-btn-rooms inline-flex min-h-[52px] items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[0.02em] md:min-h-[52px]"
              >
                Смотреть номера
              </a>
            </div>
          </motion.div>
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
            { Icon: MapPin, title: "Рядом с маршрутами", text: "Быстрый доступ к главным местам Адыгеи." },
            { Icon: Bath, title: "Банный комплекс", text: "Парная, холодный бассейн, горячая купель, бильярд и гостиная." },
            { Icon: Trees, title: "Своя территория", text: "Бассейн, беседки, мангалы и зоны отдыха." },
            { Icon: PawPrint, title: "Можно с питомцем", text: "Размещение с питомцами до 15 кг по правилам комплекса." },
          ].map(({ Icon, title, text }) => (
            <motion.div key={title} variants={smoothReveal} transition={smoothTransition} className="rounded-[2rem] bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl">
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
            <a className="inline-flex items-center text-white/75 hover:text-white" href={maxHref}>Уточнить наличие <ChevronRight className="ml-1 h-4 w-4" /></a>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.title} className="group flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-white/8 ring-1 ring-white/10 transition duration-500 hover:bg-white/[0.11] hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
                <PremiumPhotoButton
                  onClick={() => {
                    const detail = roomDetails.find((item) => item.title === room.title);
                    const gallery = detail ? getDetailGallery(detail) : [room.image];
                    openPhotoGallery(gallery, 0, detail ? getRoomGalleryLabel(detail) : getRoomGalleryLabel(room));
                  }}
                  className="h-60 md:h-72"
                >
                  <img src={room.image} alt={room.title} onError={safeImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </PremiumPhotoButton>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-[28px]">{room.title}</h3>
                  {"type" in room && room.type ? (
                    <p className="mt-2 text-sm text-white/55">{room.type}</p>
                  ) : null}
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
          <SectionTitle eyebrow="Номера подробно" title="Посмотрите фото и детали каждого варианта" text="Каждый номер можно открыть, посмотреть галерею и быстро перейти к бронированию через MAX." />

          <div className="grid gap-10">
            {roomDetails.map((room) => (
              <article id={`room-${room.title}`} key={room.title} className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm ring-1 ring-[#2D2A26]/5 transition duration-500 hover:shadow-[0_24px_80px_rgba(45,42,38,0.12)]">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-4 md:gap-3">
                    {getDetailGallery(room).map((image, index) => (
                      <PremiumPhotoButton
                        key={image}
                        onClick={() => openPhotoGallery(getDetailGallery(room), index, getRoomGalleryLabel(room))}
                        className={index === 0 ? "col-span-2 row-span-2 min-h-[320px] rounded-[2rem] md:col-span-2 md:min-h-[420px]" : "min-h-[155px] rounded-[1.4rem] md:min-h-[205px]"}
                      >
                        <img src={image} alt={`${room.title} — фото ${index + 1}`} onError={safeImage} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />
                      </PremiumPhotoButton>
                    ))}
                  </div>

                  <div className="flex flex-col justify-center p-7 md:p-12">
                    <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">
                      {"type" in room && room.type ? `${room.type} · ` : ""}
                      {room.guests} · {room.area}
                    </p>
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{room.title}</h3>
                    <p className="mt-6 text-base leading-7 text-[#2D2A26]/65 md:text-lg md:leading-8">{room.description}</p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {room.details.map((detail) => (
                        <span key={detail} className="rounded-full bg-[#F5F1EA] px-4 py-2 text-sm text-[#2D2A26]/75">{detail}</span>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <a href={maxHref} className="inline-flex items-center justify-center rounded-full bg-[#2D2A26] px-6 py-4 font-medium text-white transition duration-300 hover:bg-[#B38A5A]">Забронировать</a>
                      <button type="button" onClick={() => openPhotoGallery(getDetailGallery(room), 0, getRoomGalleryLabel(room))} className="inline-flex items-center justify-center rounded-full border border-[#2D2A26]/15 px-6 py-4 font-medium text-[#2D2A26] transition duration-300 hover:bg-[#F5F1EA]">Смотреть фото</button>
                      {"video" in room && room.video ? (
                        <button
                          type="button"
                          onClick={() => setSelectedVideo(room.video!)}
                          className="inline-flex items-center justify-center rounded-full border border-[#2D2A26]/15 px-6 py-4 font-medium text-[#2D2A26] transition duration-300 hover:bg-[#F5F1EA]"
                        >
                          Видеообзор
                        </button>
                      ) : null}
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
        <motion.div initial={{ opacity: 0.15, scale: 1.02 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.4, ease: softEase }} className="absolute inset-0">
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
                  <a href={maxHref} className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">Уточнить</a>
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
                  <a href={maxHref} className="mt-6 inline-flex rounded-full bg-[#F5F1EA] px-5 py-3 text-sm font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">Подробнее</a>
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
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Напишите в MAX или позвоните — администратор уточнит даты, количество гостей и предложит подходящий вариант.</p>
            <p className="mt-5 text-white/70">{address}<br />{email}</p>
          </div>
          <div className="grid gap-3 rounded-[2rem] bg-white p-5 text-[#2D2A26] shadow-2xl">
            <a href={maxHref} className="flex items-center justify-center gap-2 rounded-2xl bg-[#2D2A26] px-6 py-4 font-medium text-white transition duration-300 hover:bg-[#7A8B6F]">
              <MessageCircle className="h-4 w-4" /> Написать в MAX
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
              <a href={maxHref} className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-medium text-[#2D2A26] transition duration-300 hover:bg-[#E7DFD3]">
                <MessageCircle className="h-5 w-5" />
                Написать в MAX
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

      <AnimatePresence>
        {photoGallery ? (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-black/92 p-3 backdrop-blur-xl sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: smoothEase }}
            onClick={closePhotoGallery}
          >
            <div className="relative z-10 flex items-center justify-between gap-3 px-1 pb-3 sm:px-2">
              <p className="min-w-0 text-sm font-medium tracking-[0.02em] text-white/85 sm:text-base">
                {getGalleryCounterText(photoGallery)}
              </p>
              <button
                type="button"
                aria-label="Закрыть фото"
                className="rounded-full border border-white/15 bg-white/90 px-5 py-2.5 text-sm font-medium text-[#2D2A26] shadow-2xl backdrop-blur-xl transition duration-300 hover:bg-white"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  closePhotoGallery();
                }}
              >
                Закрыть
              </button>
            </div>

            <div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center px-1 sm:px-14">
              {photoGallery.images.length > 1 ? (
                <div className="flex w-full items-center justify-center gap-2 sm:contents">
                  <button
                    type="button"
                    aria-label="Предыдущее фото"
                    className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition duration-300 hover:bg-black/65 sm:absolute sm:left-3 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2"
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      event.stopPropagation();
                      showPrevPhoto();
                    }}
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                  </button>

                  <motion.img
                    key={photoGallery.images[photoGallery.index]}
                    src={photoGallery.images[photoGallery.index]}
                    alt={`Просмотр фото ${photoGallery.index + 1}`}
                    onError={safeImage}
                    onClick={(event: MouseEvent<HTMLImageElement>) => event.stopPropagation()}
                    className="min-w-0 max-h-[72vh] w-full max-w-full flex-1 rounded-[1.25rem] object-contain shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:max-h-[76vh] sm:flex-none md:max-h-[80vh] md:rounded-[2rem]"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.35, ease: smoothEase }}
                  />

                  <button
                    type="button"
                    aria-label="Следующее фото"
                    className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition duration-300 hover:bg-black/65 sm:absolute sm:right-3 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2"
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      event.stopPropagation();
                      showNextPhoto();
                    }}
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>
              ) : (
                <motion.img
                  key={photoGallery.images[photoGallery.index]}
                  src={photoGallery.images[photoGallery.index]}
                  alt={`Просмотр фото ${photoGallery.index + 1}`}
                  onError={safeImage}
                  onClick={(event: MouseEvent<HTMLImageElement>) => event.stopPropagation()}
                  className="max-h-[72vh] w-full max-w-full rounded-[1.25rem] object-contain shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:max-h-[76vh] md:max-h-[80vh] md:rounded-[2rem]"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                />
              )}
            </div>

            {photoGallery.images.length > 1 ? (
              <div
                className="room-gallery-thumbs mx-auto mt-3 w-full max-w-7xl overflow-x-auto px-1 pb-1 sm:mt-4 sm:px-2"
                onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              >
                <div className="mx-auto flex w-max gap-2">
                  {photoGallery.images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      ref={index === photoGallery.index ? activeThumbRef : null}
                      aria-label={`Открыть фото ${index + 1}`}
                      aria-current={index === photoGallery.index}
                      onClick={() => setPhotoGalleryIndex(index)}
                      className={`h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-white/10 transition duration-300 sm:h-16 sm:w-24 sm:rounded-2xl ${
                        index === photoGallery.index
                          ? "scale-105 opacity-100 ring-2 ring-white"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={image} alt="" onError={safeImage} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedVideo ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: smoothEase }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.button
              type="button"
              aria-label="Закрыть видео"
              className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-white/90 px-5 py-3 text-sm font-medium text-[#2D2A26] shadow-2xl backdrop-blur-xl transition duration-300 hover:bg-white"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                setSelectedVideo(null);
              }}
            >
              Закрыть
            </motion.button>

            <motion.video
              src={selectedVideo}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] max-w-[95vw] rounded-[2rem] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, scale: 0.965, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.975, y: 10 }}
              transition={{ duration: 0.62, ease: smoothEase }}
              onClick={(event: MouseEvent<HTMLVideoElement>) => event.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
