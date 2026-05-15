import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  Wifi,
  Car,
  Waves,
  Flame,
  PawPrint,
  Trees,
  MapPin,
  Star,
  Phone,
  Menu,
  ChevronRight,
  Bath,
  Mountain,
  Clock,
  MessageCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const phone = "+7 953 091-25-21";
const phoneHref = "tel:+79530912521";
const whatsappHref = "https://wa.me/79530912521";
const email = "dennitsa_otdyh@mail.ru";
const address = "Республика Адыгея, Майкопский район, станица Даховская, ул. Речная, 17";
const fallbackImage = "https://denitsa.ru/wp-content/themes/clean_by_saxap/images/dennica_baza.jpg";
const logoImage = "data:image/webp;base64,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";

const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
};

const handleLogoError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null;
  event.currentTarget.style.display = "none";
};

type Room = {
  title: string;
  guests: string;
  area: string;
  price: string;
  image: string;
  slug: string;
};

type Place = [name: string, distance: string];

type RoomPage = Room & {
  description: string;
  details: string[];
  gallery: string[];
  sourceUrl: string;
};

const rooms: Room[] = [
  {
    title: "Теремок",
    guests: "до 6 гостей",
    area: "75 м²",
    price: "уточнить цену",
    slug: "teremok",
    image: "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.11.jpeg",
  },
  {
    title: "Семейный номер с камином",
    guests: "до 6 гостей",
    area: "75 м²",
    price: "уточнить цену",
    slug: "family-fireplace",
    image: "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.26.jpeg",
  },
  {
    title: "Одноэтажный домик «Премиум»",
    guests: "до 3 гостей",
    area: "отдельный домик",
    price: "уточнить цену",
    slug: "premium-house",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.06.jpeg",
  },
  {
    title: "Трехместный номер с балконом",
    guests: "до 3 гостей",
    area: "балкон",
    price: "уточнить цену",
    slug: "triple-balcony",
    image: "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.07.jpeg",
  },
  {
    title: "Семейный номер «Люкс»",
    guests: "до 6 гостей",
    area: "100 м²",
    price: "уточнить цену",
    slug: "family-luxe",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.31.jpeg",
  },
  {
    title: "Четырехместный номер «Комфорт»",
    guests: "до 4 гостей",
    area: "первый этаж",
    price: "уточнить цену",
    slug: "quad-comfort",
    image: "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.12.jpeg",
  },
];

const roomPages: RoomPage[] = [
  {
    ...rooms[0],
    sourceUrl: "https://denitsa.ru/teremok/",
    description: "Двухэтажный дом со своей верандой. На первом этаже спальня, туалет с душевой и полностью оборудованная кухня. На втором этаже — двуспальная кровать, две односпальные кровати, туалет и балкон.",
    details: ["Двухэтажный дом", "Своя веранда", "Кухня", "Балкон", "Туалет и душевая"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.11.jpeg",
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.12.jpeg",
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.30.56.jpeg",
    ],
  },
  {
    ...rooms[1],
    sourceUrl: "https://denitsa.ru/semejnyj-nomer-s-kaminom/",
    description: "Семейный номер с камином расположен в одноэтажном доме. В номере две изолированные спальни, гостиная с диваном и креслом-кроватью, полностью оборудованная кухня, детский уголок, туалет и душевая.",
    details: ["75 м²", "До 6 гостей", "2 спальни", "Камин", "Кухня", "Детский уголок"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.26.jpeg",
      "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.28.jpeg",
      "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.30.jpeg",
      "https://denitsa.ru/wp-content/uploads/2021/04/photo_2023-07-27-15.18.32.jpeg",
    ],
  },
  {
    ...rooms[2],
    sourceUrl: "https://denitsa.ru/nomera-klassa-premium/",
    description: "Одноэтажный домик «Премиум» — отдельный домик из рубленного бревна. Внутри двуспальная кровать, диван-кровать, телевизор, холодильник, электрический чайник, кондиционер, туалет и душевая.",
    details: ["Отдельный домик", "До 3 гостей", "Диван-кровать", "Кондиционер", "Холодильник", "Душевая"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.06.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.08.jpeg",
      "https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.45.38.jpeg",
    ],
  },
  {
    ...rooms[3],
    sourceUrl: "https://denitsa.ru/trexmestnyj-nomer-s-balkonom/",
    description: "Трехместный номер с балконом расположен на втором этаже гостиничного корпуса. В номере двуспальная кровать, кресло-кровать, телевизор, холодильник, электрический чайник, кондиционер, туалет и душевая.",
    details: ["До 3 гостей", "Балкон", "Второй этаж", "Кондиционер", "Холодильник", "Душевая"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.07.jpeg",
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.09.jpeg",
      "https://denitsa.ru/wp-content/uploads/2020/02/photo_2023-07-27-15.07.11.jpeg",
    ],
  },
  {
    ...rooms[4],
    sourceUrl: "https://denitsa.ru/nomera-klassa-lyuks/",
    description: "Семейный номер «Люкс» расположен на втором этаже большого сруба. Пространство 100 м²: две изолированные спальни, гостиная, полностью оборудованная кухня, детский уголок, туалет и душевая.",
    details: ["100 м²", "До 6 гостей", "2 спальни", "Гостиная", "Кухня", "Детский уголок"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.29.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.31.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.04.33.jpeg",
    ],
  },
  {
    ...rooms[5],
    sourceUrl: "https://denitsa.ru/chetyrexmestnyj-nomer-kategorii-komfort/",
    description: "Четырехместный номер «Комфорт» расположен на первом этаже в двухэтажном срубе. В номере двуспальная кровать, диван-кровать, телевизор, холодильник, электрический чайник, кондиционер, туалет и душевая.",
    details: ["До 4 гостей", "Первый этаж", "Диван-кровать", "Кондиционер", "Холодильник", "Душевая"],
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.12.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.15.jpeg",
      "https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-14.43.17.jpeg",
    ],
  },
];

const places: Place[] = [
  ["Водопады Руфабго", "рядом"],
  ["Хаджохская теснина", "рядом"],
  ["Лаго-Наки", "по маршруту"],
  ["Гузерипль", "по маршруту"],
  ["Большая Азишская пещера", "по маршруту"],
  ["Канатная дорога", "рядом"],
  ["Конные прогулки", "рядом"],
  ["Термальные источники", "по маршруту"],
];

const advantages = [
  [Waves, "Бассейн"],
  [Flame, "Банный комплекс"],
  [PawPrint, "Можно с питомцами до 15 кг"],
  [Car, "Парковка"],
  [Wifi, "Wi‑Fi"],
  [Trees, "Беседки и мангалы"],
] as const;

const siteSections = [
  ["Главная", "Продающая посадочная страница с быстрым бронированием, преимуществами, номерами и ключевыми CTA.", "/"],
  ["О нас", "История базы отдыха, преимущества, правила проживания, заезд/выезд и общая информация для гостей.", "/o-nas/"],
  ["Фото", "Общая галерея, фото территории, кухни и банного комплекса.", "/foto/"],
  ["Номера", "Каталог номеров и домиков с фильтрами по вместимости, формату отдыха и цене.", "/nomera/"],
  ["Услуги", "Банный комплекс, зоны барбекю, экскурсии, конные прогулки, рафтинг и джиппинг.", "/uslugi/"],
  ["Кафе", "Описание кафе, кухни, завтраков, питания и фотографий зоны приема пищи.", "/kafe/"],
  ["Что посетить", "Достопримечательности рядом: Руфабго, Лаго‑Наки, Гузерипль, монастырь и Хаджохская теснина.", "/chto-posetit/"],
  ["Контакты", "Адрес, телефон, email, карта, WhatsApp и форма обратной связи.", "/kontakty/"],
] as const;

const servicePages = [
  ["Банный комплекс", "/bannyj-kompleks/"],
  ["Зоны для барбекю", "/zony-dlya-barbekyu/"],
  ["Экскурсии", "/ekskursii/"],
  ["Конные прогулки", "/konnye-progulki/"],
  ["Рафтинг", "/rafting/"],
  ["Джиппинг", "/dzhipping/"],
] as const;

const visitPages = [
  ["Водопад Руфабго", "/vodopad-rufabgo/"],
  ["Лаго-Наки", "/lago-naki/"],
  ["Гузерипль", "/guzeripl/"],
  ["Свято-Михайловский монастырь", "/svyato-mixajlovskij-muzhskoj-monastyr/"],
  ["Хаджохская теснина", "/xadzhoxskaya-tesnina/"],
] as const;

const aboutContent = {
  title: "База отдыха «Денница»",
  text: "База отдыха расположена в станице Даховская Майкопского района Республики Адыгея. Комплекс находится рядом с основными туристическими маршрутами региона и подходит для семейного отдыха, поездок компанией и спокойных выходных в горах.",
  features: ["Номера и домики разных категорий", "Банный комплекс более 200 м²", "Бассейн и зоны отдыха", "Беседки и мангальные зоны", "Парковка на территории", "Размещение с питомцами до 15 кг"],
};

const cafeContent = {
  title: "Кафе на территории",
  text: "На территории комплекса работает кафе для гостей базы отдыха. Здесь можно позавтракать, пообедать или поужинать после прогулок по Адыгее. Подходит для семей, туристических групп и компаний.",
  features: ["Завтраки", "Домашняя кухня", "Зона для семей", "Уютный интерьер", "Возможность группового питания"],
};

const rulesContent = ["Заезд с 15:00", "Выезд до 12:00", "Размещение с питомцами до 15 кг", "Курение в номерах запрещено", "Бронирование подтверждается администратором", "На территории действует режим тишины"];

const servicesContent = [
  {
    title: "Экскурсии",
    slug: "ekskursii",
    href: "/ekskursii/",
    price: "цены по договоренности",
    intro: "Экскурсионные программы по природным и историческим достопримечательностям Адыгеи.",
    text: "Экскурсионные программы по природным и историческим достопримечательностям: Хаджохская теснина, водопады Руфабго, Свято-Михайловский мужской монастырь, плато Лаго-Наки и поселок Гузерипль.",
    items: ["Хаджохская теснина", "Водопады Руфабго", "Свято-Михайловский монастырь", "Плато Лаго-Наки", "пос. Гузерипль"],
    image: "https://denitsa.ru/wp-content/uploads/2019/10/ekskursii_adygeja.jpg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/ekskursii_adygeja.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/10/rafting_v_adygee.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/10/jipping_dennica.jpg",
    ],
  },
  {
    title: "Конные прогулки",
    slug: "konnye-progulki",
    href: "/konnye-progulki/",
    price: "цены по договоренности",
    intro: "Маршруты для прогулок верхом рядом с Даховской, ущельем Мишоко и хребтом Уна-Коз.",
    text: "Маршруты: 1 час — ущелье Мишоко; 1,5 часа — Дубовая роща; 2 часа — Уна-Коз; 3 часа — Уна-Коз и Дубовая роща. Есть и другие маршруты, подробности уточняются у администратора.",
    items: ["1 час — ущелье Мишоко", "1,5 часа — Дубовая роща", "2 часа — Уна-Коз", "3 часа — Уна-Коз и Дубовая роща"],
    image: "https://denitsa.ru/wp-content/uploads/2019/10/konnye_progulki_dennica.jpg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/konnye_progulki_dennica.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/10/konnye_progulki_dennica.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/10/konnye_progulki_dennica.jpg",
    ],
  },
  {
    title: "Рафтинг",
    slug: "rafting",
    href: "/rafting/",
    price: "цены по договоренности",
    intro: "Активный водный отдых на реке Белой — прогулочные и экстремальные маршруты разной сложности.",
    text: "Рафтинг — уникальный вид активного отдыха в Адыгее. Маршруты бывают разной сложности: прогулочные и экстремальные. С воды можно увидеть водопады, гранитные скалы и горное ущелье реки Белой.",
    items: ["Маршруты разной сложности", "Прогулочные сплавы", "Экстремальные маршруты", "Сопровождение инструкторов"],
    image: "https://denitsa.ru/wp-content/uploads/2019/10/rafting_v_adygee.jpg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/rafting_v_adygee.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/10/rafting_v_adygee.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/10/rafting_v_adygee.jpg",
    ],
  },
  {
    title: "Джиппинг",
    slug: "dzhipping",
    href: "/dzhipping/",
    price: "от 5 000 руб./машина",
    intro: "Внедорожные маршруты там, где не проедет обычный легковой автомобиль.",
    text: "Джиппинг — путешествие там, где нет дорог. Глубокие колеи, лесные дороги, просеки, завалы деревьев и настоящий внедорожный драйв. Цена на старом сайте указана от 5000 рублей за машину на 6–7 человек.",
    items: ["6–7 человек в машине", "Лесные дороги и просеки", "Естественные препятствия", "Формат активного отдыха"],
    image: "https://denitsa.ru/wp-content/uploads/2019/10/jipping_dennica.jpg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/10/jipping_dennica.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/12/jipping_adygeja_main.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/10/jipping_dennica.jpg",
    ],
  },
  {
    title: "Зоны для барбекю",
    slug: "zony-dlya-barbekyu",
    href: "/zony-dlya-barbekyu/",
    price: "включено в цену",
    intro: "Беседки и мангальные зоны для отдыха на природе, шашлыков и вечеров компанией.",
    text: "На старом сайте описаны открытая уличная беседка с мангальной зоной и закрытая беседка с мангальной зоной, микроволновой печью, электроплитой и настоящей русской печью.",
    items: ["Открытая беседка", "Закрытая беседка", "Мангальная зона", "Русская печь", "Микроволновая печь", "Электроплита"],
    image: "https://denitsa.ru/wp-content/uploads/2019/12/besedki_i_mangaly_dennica.jpg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/12/besedki_i_mangaly_dennica.jpg",
      "https://denitsa.ru/wp-content/uploads/photo-gallery/imported_from_media_libray/image4.jpg?bwg=1745666425",
      "https://denitsa.ru/wp-content/uploads/photo-gallery/imported_from_media_libray/image1.jpg?bwg=1745666425",
      "https://denitsa.ru/wp-content/uploads/photo-gallery/imported_from_media_libray/image0.jpg?bwg=1745666425",
      "https://denitsa.ru/wp-content/uploads/photo-gallery/imported_from_media_libray/image2.jpg?bwg=1745666425",
    ],
  },
  {
    title: "Банный комплекс",
    slug: "bannyj-kompleks",
    href: "/bannyj-kompleks/",
    price: "от 3 000 руб./час",
    intro: "Просторный банный комплекс более 200 м² для отдыха и восстановления после прогулок.",
    text: "Русская парная, бассейн с холодной водой, горячая купель, бильярд, сеновал и гостиная в комплексе из северного рубленного бревна.",
    items: ["Русская парная", "Холодный бассейн", "Горячая купель", "Бильярд", "Гостиная"],
    image: "https://denitsa.ru/wp-content/uploads/2019/12/bannij_kompleks_s_bassejnom.jpg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/12/bannij_kompleks_s_bassejnom.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/12/bannij_kompleks_s_bassejnom.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/12/bannij_kompleks_s_bassejnom.jpg",
    ],
  },
  {
    title: "Трансфер",
    slug: "transfer",
    href: "/transfer/",
    price: "от 3 500 руб.",
    intro: "Трансфер из Краснодара до станицы Даховская.",
    text: "Удобный вариант для гостей, которые приезжают без автомобиля и хотят добраться до базы отдыха с комфортом. На старом сайте указан трансфер из Краснодара до станицы Даховская.",
    items: ["Из Краснодара", "До станицы Даховская", "По предварительному заказу"],
    image: "https://denitsa.ru/wp-content/uploads/2019/12/transfer_dennica.jpg",
    gallery: [
      "https://denitsa.ru/wp-content/uploads/2019/12/transfer_dennica.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/12/transfer_dennica.jpg",
      "https://denitsa.ru/wp-content/uploads/2019/12/transfer_dennica.jpg",
    ],
  },
];

const excursionServices = servicesContent.filter((service) =>
  ["ekskursii", "konnye-progulki", "rafting", "dzhipping"].includes(service.slug)
);

const baseServices = servicesContent.filter((service) =>
  ["zony-dlya-barbekyu", "bannyj-kompleks", "transfer"].includes(service.slug)
);

const yandexMapSrc = "https://yandex.com/map-widget/v1/?ll=40.203464%2C44.237460&mode=search&oid=1712737983&ol=biz&sll=40.203458%2C44.237458&sspn=0.002835%2C0.001353&text=%D0%B4%D0%B0%D1%85%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%B4%D0%B5%D0%BD%D0%BD%D0%B8%D1%86%D0%B0&z=18.8";
const yandexMapUrl = "https://yandex.com/maps/org/dennitsa/1712737983/";
const yandexRouteUrl = "https://yandex.com/maps/?rtext=~44.237460%2C40.203464&rtt=auto";

export const denitsaPrototypeSmokeTests = {
  hasRooms: rooms.length >= 6,
  hasRoomPages: roomPages.length >= rooms.length,
  allRoomsHaveRequiredFields: rooms.every((room) => Boolean(room.title && room.guests && room.area && room.price && room.image && room.slug)),
  allRoomPagesHaveGalleries: roomPages.every((room) => room.gallery.length >= 3),
  allRoomImagesAreFromDenitsa: rooms.every((room) => room.image.startsWith("https://denitsa.ru/")),
  allGalleryImagesAreFromDenitsa: roomPages.every((room) => room.gallery.every((image) => image.startsWith("https://denitsa.ru/"))),
  hasPlaces: places.length >= 8,
  hasSiteSections: siteSections.length >= 8,
  hasServicePages: servicePages.length >= 6,
  hasVisitPages: visitPages.length >= 5,
  hasAboutContent: aboutContent.features.length >= 5,
  hasCafeContent: cafeContent.features.length >= 5,
  hasRules: rulesContent.length >= 5,
  hasServicesContent: servicesContent.length >= 7,
  hasExcursionServices: excursionServices.length >= 4,
  hasBaseServices: baseServices.length >= 3,
  allServicesHaveGallery: servicesContent.every((service) => service.gallery.length >= 3),
  hasYandexMap: yandexMapSrc.includes("yandex.com/map-widget"),
  hasYandexMapLinks: yandexMapUrl.includes("yandex.com/maps") && yandexRouteUrl.includes("yandex.com/maps"),
  hasValidContactLinks: phoneHref.startsWith("tel:") && whatsappHref.startsWith("https://wa.me/") && email.includes("@"),
  hasLogoPath: logoImage === "/logo-denitsa.png",
};

const SectionTitle = ({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) => (
  <div className="mb-12 max-w-3xl">
    <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">{eyebrow}</p>
    <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{title}</h2>
    {text ? <p className="mt-6 text-lg leading-8 text-[#2D2A26]/65">{text}</p> : null}
  </div>
);

const DenitsaLogo = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  const invertClass = variant === "dark" ? "brightness-0" : "";
  const textColor = variant === "light" ? "text-white" : "text-[#2D2A26]";

  return (
    <div className="flex items-center gap-3" aria-label="Денница — база отдыха">
      <img
        src={logoImage}
        alt="Денница — база отдыха"
        onError={handleLogoError}
        className={`h-16 w-auto object-contain ${invertClass}`}
      />
      <div className={`leading-none ${textColor}`}>
        <div className="text-lg font-black uppercase tracking-[0.18em]">Денница</div>
        <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] opacity-80">База отдыха</div>
      </div>
    </div>
  );
};

export default function DenitsaHomepagePrototype() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const selectedService = servicesContent.find((service) => service.slug === selectedServiceSlug);

  if (selectedService) {
    return (
      <main className="min-h-screen bg-[#F5F1EA] text-[#2D2A26]">
        <header className="sticky top-0 z-50 border-b border-[#2D2A26]/10 bg-[#F5F1EA]/90 px-5 py-4 backdrop-blur-xl lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <button type="button" onClick={() => setSelectedServiceSlug(null)} className="rounded-full border border-[#2D2A26]/15 px-5 py-3 text-sm font-medium hover:bg-white">
              ← Назад ко всем услугам
            </button>
            <a href="#booking" className="rounded-full bg-[#2D2A26] px-5 py-3 text-sm font-medium text-white hover:bg-[#B38A5A]">
              Забронировать
            </a>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Услуга · {selectedService.price}</p>
              <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{selectedService.title}</h1>
            </div>
            <a href={selectedService.href} target="_blank" rel="noreferrer" className="rounded-full border border-[#2D2A26]/15 px-6 py-4 text-sm font-medium hover:bg-white">
              Открыть старую страницу
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {selectedService.gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={index === 0 ? "group col-span-2 row-span-2 min-h-[440px] overflow-hidden rounded-[2.5rem] text-left md:col-span-2" : "group min-h-[215px] overflow-hidden rounded-[2rem] text-left"}
                >
                  <img src={image} alt={`${selectedService.title} — фото ${index + 1}`} onError={handleImageError} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </button>
              ))}
            </div>

            <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#7A8B6F]">{selectedService.intro}</p>
              <p className="mt-6 text-lg leading-8 text-[#2D2A26]/68">{selectedService.text}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {selectedService.items.map((item) => (
                  <span key={item} className="rounded-full bg-[#F5F1EA] px-4 py-2 text-sm text-[#2D2A26]/75">{item}</span>
                ))}
              </div>
              <div className="mt-10 grid gap-3">
                <a href="#booking" className="rounded-full bg-[#2D2A26] px-6 py-4 text-center font-medium text-white hover:bg-[#B38A5A]">Заказать услугу</a>
                <a href={whatsappHref} className="rounded-full border border-[#2D2A26]/15 px-6 py-4 text-center font-medium hover:bg-[#F5F1EA]">Написать в WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {selectedImage ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedImage(null)}>
            <button type="button" aria-label="Закрыть фото" className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#2D2A26]" onClick={() => setSelectedImage(null)}>
              Закрыть
            </button>
            <img src={selectedImage} alt="Просмотр фото" onError={handleImageError} className="max-h-[90vh] max-w-[95vw] rounded-[2rem] object-contain shadow-2xl" />
          </div>
        ) : null}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F1EA] text-[#2D2A26]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-[#2D2A26]/45 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white lg:px-8">
          <a href="#" className="block origin-left scale-90 md:scale-100">
            <DenitsaLogo variant="light" />
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/80 lg:flex">
            <a href="#rooms" className="hover:text-white">Номера</a>
            <a href="#services" className="hover:text-white">Услуги</a>
            <a href="#cafe" className="hover:text-white">Кафе</a>
            <a href="#places" className="hover:text-white">Что посетить</a>
            <a href="#contacts" className="hover:text-white">Контакты</a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a className="rounded-full border border-white/25 px-5 py-2 text-sm text-white/90 hover:bg-white/10" href={phoneHref}>{phone}</a>
            <a className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#2D2A26] hover:bg-[#E7DFD3]" href="#booking">Забронировать</a>
          </div>

          <button className="rounded-full border border-white/25 p-2 lg:hidden" aria-label="Открыть меню">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="relative min-h-[100vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://denitsa.ru/wp-content/themes/clean_by_saxap/images/dennica_baza.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171411]/90 via-[#171411]/55 to-[#171411]/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F5F1EA] to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[100vh] max-w-7xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-md">
              <Mountain className="h-4 w-4" />
              Даховская · Лаго-Наки · Руфабго
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">Отдых в Даховской рядом с главными маршрутами Адыгеи</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/78 md:text-xl">База отдыха в станице Даховская: номера, домики, банный комплекс, бассейн и удобный доступ к Лаго-Наки, Руфабго, Хаджохской теснине и Гузериплю.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#booking" className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-medium text-[#2D2A26] transition hover:bg-[#E7DFD3]">Забронировать <ChevronRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" /></a>
              <a href={whatsappHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-medium text-white backdrop-blur-sm transition hover:bg-white/10"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="rounded-[2rem] border border-white/20 bg-white/15 p-4 shadow-2xl backdrop-blur-2xl md:p-6">
            <div className="rounded-[1.5rem] bg-[#F5F1EA]/95 p-5 md:p-7">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Проверить свободные номера</h2>
              <p className="mt-2 text-sm text-[#2D2A26]/65">Оставьте даты — администратор подберет свободные варианты.</p>
              <div className="mt-6 grid gap-3">
                {[
                  [CalendarDays, "Заезд", "Выберите дату"],
                  [Users, "Гости", "2 взрослых, 1 ребенок"],
                  [Phone, "Телефон", "+7 ___ ___‑__‑__"],
                ].map(([Icon, label, placeholder]) => (
                  <label key={label as string} className="rounded-2xl bg-white p-4 shadow-sm">
                    <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-[#2D2A26]/45"><Icon className="h-4 w-4" /> {label}</span>
                    <input className="w-full bg-transparent text-base outline-none" placeholder={placeholder as string} />
                  </label>
                ))}
                <button className="mt-2 rounded-2xl bg-[#2D2A26] px-6 py-4 font-medium text-white transition hover:bg-[#B38A5A]">Проверить свободные номера</button>
                <a href={whatsappHref} className="flex items-center justify-center gap-2 rounded-2xl border border-[#2D2A26]/10 px-6 py-4 text-sm font-medium text-[#2D2A26] hover:bg-white"><MessageCircle className="h-4 w-4" /> Написать в WhatsApp</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-5 lg:px-8">
        <div className="grid gap-3 rounded-[2rem] bg-white p-4 shadow-xl md:grid-cols-3 lg:grid-cols-6">
          {advantages.map(([Icon, title]) => (
            <div key={title} className="flex items-center gap-3 rounded-2xl bg-[#F5F1EA] p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7A8B6F]/15 text-[#7A8B6F]"><Icon className="h-5 w-5" /></div>
              <div className="text-sm font-medium">{title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Почему Денница</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Место, куда хочется возвращаться</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#2D2A26]/65">Здесь можно провести тихие выходные вдвоем, приехать с детьми, собраться компанией у мангала или восстановиться после прогулок по горам и водопадам.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [MapPin, "Рядом с маршрутами", "Быстрый доступ к главным местам Адыгеи."],
            [Bath, "Банный комплекс", "Более 200 м²: парная, холодный бассейн, горячая купель, бильярд и гостиная."],
            [Trees, "Своя территория", "Бассейн, беседки, мангалы и зоны отдыха."],
            [PawPrint, "Можно с питомцем", "Размещение с питомцами до 15 кг по правилам комплекса."],
          ].map(([Icon, title, text]) => (
            <motion.div key={title as string} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-[2rem] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7DFD3]"><Icon className="h-6 w-6" /></div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-[#2D2A26]/62">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem]"><img src={fallbackImage} alt="База отдыха Денница" onError={handleImageError} className="h-full min-h-[520px] w-full object-cover" /></div>
          <div className="flex flex-col justify-center rounded-[2.5rem] bg-[#F5F1EA] p-8 md:p-12">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">О нас</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{aboutContent.title}</h2>
            <p className="mt-7 text-lg leading-8 text-[#2D2A26]/65">{aboutContent.text}</p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {aboutContent.features.map((feature) => <div key={feature} className="rounded-2xl bg-white px-5 py-4 text-sm text-[#2D2A26]/75 shadow-sm">{feature}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="site-structure" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="Структура сайта" title="Полноценный сайт, а не только один лендинг" text="Главная остается продающей страницей, а остальные разделы становятся отдельными SEO-страницами. Так сайт лучше индексируется и удобнее для гостей." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {siteSections.map(([title, description, href]) => (
              <a key={title} href={href} className="group rounded-[2rem] border border-[#2D2A26]/10 bg-[#F5F1EA] p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#7A8B6F]"><ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" /></div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#2D2A26]/62">{description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="rooms" className="bg-[#2D2A26] py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#B38A5A]">Номера и домики</p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Выберите свой формат отдыха</h2>
            </div>
            <a className="inline-flex items-center text-white/75 hover:text-white" href="#booking">Все варианты <ChevronRight className="ml-1 h-4 w-4" /></a>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.title} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white/8 ring-1 ring-white/10">
                <button type="button" onClick={() => setSelectedImage(room.image)} className="h-72 overflow-hidden text-left">
                  <img src={room.image} alt={room.title} onError={handleImageError} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </button>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-semibold">{room.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
                    <span className="rounded-full bg-white/10 px-3 py-1">{room.guests}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{room.area}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">подробнее</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-7">
                    <div className="text-xl font-semibold">{room.price}</div>
                    <a href={`#room-${room.slug}`} className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#2D2A26] hover:bg-[#E7DFD3]">Подробнее</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="room-pages" className="bg-[#F5F1EA] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="Страницы номеров" title="Отдельные страницы с фото и описанием" text="Ниже — заготовки отдельных страниц для каждого номера. Их можно вынести в маршруты Next.js: /rooms/teremok, /rooms/family-fireplace и так далее." />
          <div className="grid gap-10">
            {roomPages.map((room) => (
              <article id={`room-${room.slug}`} key={room.slug} className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-3">
                    {room.gallery.map((image, index) => (
                      <button
                        type="button"
                        key={image}
                        onClick={() => setSelectedImage(image)}
                        className={index === 0 ? "group col-span-2 row-span-2 min-h-[360px] overflow-hidden rounded-[2rem] text-left md:col-span-2" : "group min-h-[175px] overflow-hidden rounded-[1.5rem] text-left"}
                      >
                        <img src={image} alt={`${room.title} — фото ${index + 1}`} onError={handleImageError} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">{room.guests} · {room.area}</p>
                    <h3 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{room.title}</h3>
                    <p className="mt-6 text-lg leading-8 text-[#2D2A26]/65">{room.description}</p>
                    <div className="mt-8 flex flex-wrap gap-2">{room.details.map((detail) => <span key={detail} className="rounded-full bg-[#F5F1EA] px-4 py-2 text-sm text-[#2D2A26]/75">{detail}</span>)}</div>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-[#2D2A26] px-6 py-4 font-medium text-white hover:bg-[#B38A5A]">Забронировать</a>
                      <a href={room.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#2D2A26]/15 px-6 py-4 font-medium text-[#2D2A26] hover:bg-[#F5F1EA]">Открыть старую страницу</a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="territory" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-[#E7DFD3] p-8 md:p-12">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Территория</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Банный комплекс, бассейн, беседки и вечерний свет</h2>
            <p className="mt-7 text-lg leading-8 text-[#2D2A26]/65">На территории есть зоны для отдыха, бассейн, беседки и мангальные места. Отдельный акцент — банный комплекс более 200 м² из рубленного северного бревна: русская парная, бассейн с холодной водой, горячая купель, бильярд, сеновал и гостиная.</p>
          </div>
          <div className="min-h-[420px] overflow-hidden rounded-[2.5rem]"><img src="https://denitsa.ru/wp-content/uploads/2023/07/photo_2023-07-27-15.45.38.jpeg" alt="Территория комплекса" onError={handleImageError} className="h-full w-full object-cover" /></div>
        </div>
      </section>

      <section className="bg-[#E7DFD3] py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-3 lg:px-8">
          {[[Clock, "Заезд и выезд", "Заезд с 15:00, выезд до 12:00."], [Phone, "Быстрая связь", `Телефон и WhatsApp: ${phone}`], [MapPin, "Адрес", "ул. Речная, 17, станица Даховская."]].map(([Icon, title, text]) => (
            <div key={title as string} className="rounded-[2rem] bg-white/70 p-6"><Icon className="mb-6 h-6 w-6 text-[#7A8B6F]" /><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-[#2D2A26]/65">{text}</p></div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Услуги базы</p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Баня, барбекю и трансфер</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2D2A26]/65">
                Отдельный раздел для услуг на территории базы и удобства гостей.
              </p>
            </div>
            <a href="/uslugi/" className="inline-flex items-center text-[#2D2A26]/65 hover:text-[#2D2A26]">Раздел услуг <ChevronRight className="ml-1 h-4 w-4" /></a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {baseServices.map((service) => (
              <article key={service.slug} id={`service-${service.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#F5F1EA] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <button type="button" onClick={() => setSelectedImage(service.image)} className="h-56 overflow-hidden text-left">
                  <img src={service.image} alt={service.title} onError={handleImageError} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </button>
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em]">{service.title}</h3>
                    <span className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#2D2A26]/70">{service.price}</span>
                  </div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#7A8B6F]">{service.intro}</p>
                  <p className="mt-4 leading-7 text-[#2D2A26]/65">{service.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.items.map((item) => <span key={item} className="rounded-full bg-white px-4 py-2 text-sm text-[#2D2A26]/70">{item}</span>)}
                  </div>
                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                    <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-[#2D2A26] px-5 py-3 text-sm font-medium text-white hover:bg-[#B38A5A]">Заказать</a>
                    <button type="button" onClick={() => setSelectedServiceSlug(service.slug)} className="inline-flex items-center justify-center rounded-full border border-[#2D2A26]/15 px-5 py-3 text-sm font-medium text-[#2D2A26] hover:bg-white">Открыть страницу</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="excursions" className="bg-[#F5F1EA] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Экскурсии и активный отдых</p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Маршруты, сплавы, кони и джиппинг</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2D2A26]/65">
                Отдельный раздел для активностей и маршрутов по Адыгее со старого сайта.
              </p>
            </div>
            <a href="/ekskursii/" className="inline-flex items-center text-[#2D2A26]/65 hover:text-[#2D2A26]">Раздел экскурсий <ChevronRight className="ml-1 h-4 w-4" /></a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {excursionServices.map((service) => (
              <article key={service.slug} id={`excursion-${service.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <button type="button" onClick={() => setSelectedImage(service.image)} className="h-56 overflow-hidden text-left">
                  <img src={service.image} alt={service.title} onError={handleImageError} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </button>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#7A8B6F]">{service.price}</p>
                  <p className="mt-4 leading-7 text-[#2D2A26]/65">{service.intro}</p>
                  <div className="mt-auto flex flex-col gap-3 pt-8">
                    <button type="button" onClick={() => setSelectedServiceSlug(service.slug)} className="rounded-full bg-[#2D2A26] px-5 py-3 text-sm font-medium text-white hover:bg-[#B38A5A]">Открыть страницу</button>
                    <a href="#booking" className="rounded-full border border-[#2D2A26]/15 px-5 py-3 text-center text-sm font-medium text-[#2D2A26] hover:bg-[#F5F1EA]">Заказать</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="service-pages" className="bg-[#F5F1EA] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Детальные страницы услуг"
            title="Заготовки страниц под каждую услугу"
            text="Эти блоки можно вынести в отдельные страницы: /ekskursii, /rafting, /dzhipping, /konnye-progulki и другие."
          />
          <div className="grid gap-8">
            {servicesContent.map((service, index) => (
              <article key={service.slug} className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
                <div className={index % 2 === 0 ? "grid gap-0 lg:grid-cols-[0.85fr_1.15fr]" : "grid gap-0 lg:grid-cols-[1.15fr_0.85fr]"}>
                  <button type="button" onClick={() => setSelectedImage(service.image)} className={index % 2 === 0 ? "min-h-[420px] overflow-hidden text-left" : "min-h-[420px] overflow-hidden text-left lg:order-2"}>
                    <img src={service.image} alt={service.title} onError={handleImageError} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                  </button>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">{service.price}</p>
                    <h3 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{service.title}</h3>
                    <p className="mt-6 text-lg leading-8 text-[#2D2A26]/65">{service.text}</p>
                    <div className="mt-8 grid gap-3 md:grid-cols-2">
                      {service.items.map((item) => (
                        <div key={item} className="rounded-2xl bg-[#F5F1EA] px-5 py-4 text-sm text-[#2D2A26]/75">{item}</div>
                      ))}
                    </div>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <a href="#booking" className="inline-flex items-center justify-center rounded-full bg-[#2D2A26] px-6 py-4 font-medium text-white hover:bg-[#B38A5A]">Заказать услугу</a>
                      <button type="button" onClick={() => setSelectedServiceSlug(service.slug)} className="inline-flex items-center justify-center rounded-full border border-[#2D2A26]/15 px-6 py-4 font-medium text-[#2D2A26] hover:bg-[#F5F1EA]">Открыть страницу</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cafe" className="bg-[#F5F1EA] py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-[2.5rem] bg-[#E7DFD3] p-8 md:p-12">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Кафе</p><h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{cafeContent.title}</h2><p className="mt-7 text-lg leading-8 text-[#2D2A26]/65">{cafeContent.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">{cafeContent.features.map((feature) => <span key={feature} className="rounded-full bg-white px-4 py-2 text-sm text-[#2D2A26]/75 shadow-sm">{feature}</span>)}</div>
            <a href="/kafe/" className="mt-8 inline-flex rounded-full bg-[#2D2A26] px-6 py-4 font-medium text-white hover:bg-[#B38A5A]">Открыть раздел кафе</a>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] bg-white p-3"><img src="https://denitsa.ru/wp-content/uploads/2019/10/photo_2023-07-27-15.01.06.jpeg" alt="Кафе и кухня Денница" onError={handleImageError} className="h-full min-h-[420px] w-full rounded-[2rem] object-cover" /></div>
        </div>
      </section>

      <section id="places" className="bg-white py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Что рядом" title="Главные места Адыгеи рядом с вами" /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{places.map(([name, time]) => <div key={name} className="rounded-[2rem] border border-[#2D2A26]/10 bg-[#F5F1EA] p-6"><MapPin className="mb-8 h-6 w-6 text-[#7A8B6F]" /><h3 className="text-xl font-semibold">{name}</h3><p className="mt-2 text-[#2D2A26]/60">{time}</p></div>)}</div></div></section>

      <section id="visit-pages" className="bg-[#2D2A26] py-24 text-white"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 max-w-3xl"><p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#B38A5A]">Что посетить</p><h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Отдельные SEO-страницы по маршрутам</h2><p className="mt-6 text-lg leading-8 text-white/65">Эти страницы важны для поиска: гости часто ищут не базу отдыха, а конкретные места рядом — Лаго‑Наки, Руфабго, Хаджохскую теснину и маршруты по Адыгее.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{visitPages.map(([title, href]) => <a key={title} href={href} className="rounded-[2rem] bg-white/8 p-6 ring-1 ring-white/10 transition hover:bg-white/12"><MapPin className="mb-8 h-6 w-6 text-[#B38A5A]" /><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/60">Маршрут, расстояние, фото, советы и CTA забронировать отдых.</p></a>)}</div></div></section>

      <section id="rules" className="bg-[#F5F1EA] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Правила проживания" title="Важная информация перед заездом" /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{rulesContent.map((rule) => <div key={rule} className="rounded-[2rem] bg-white p-6 shadow-sm"><Clock className="mb-6 h-6 w-6 text-[#7A8B6F]" /><div className="text-lg font-medium">{rule}</div></div>)}</div></div></section>

      <section id="reviews" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Отзывы</p><h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Гости ценят атмосферу и расположение</h2></div><div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-10"><div className="mb-6 flex gap-1 text-[#B38A5A]">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div><p className="text-2xl leading-10 tracking-[-0.02em] text-[#2D2A26]/82">«Очень уютное место. Красивые виды, чистые номера, приятная территория и ощущение полного отдыха от города.»</p><div className="mt-8 text-sm text-[#2D2A26]/55">Анна · отдых с семьей</div></div></div></section>

      <section id="map" className="bg-[#F5F1EA] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#7A8B6F]">Как добраться</p>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Денница на карте</h2>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <p className="text-lg font-medium text-[#2D2A26]">{address}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#2D2A26]/65">
                <a href={phoneHref} className="rounded-full bg-[#F5F1EA] px-4 py-2">{phone}</a>
                <a href={whatsappHref} className="rounded-full bg-[#F5F1EA] px-4 py-2">WhatsApp</a>
                <a href={`mailto:${email}`} className="rounded-full bg-[#F5F1EA] px-4 py-2">{email}</a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-xl">
            <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#2D2A26] p-8 text-center text-white">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-35"
                style={{ backgroundImage: "url('https://denitsa.ru/wp-content/themes/clean_by_saxap/images/dennica_baza.jpg')" }}
              />
              <div className="relative z-10 max-w-2xl">
                <MapPin className="mx-auto mb-6 h-12 w-12 text-[#B38A5A]" />
                <h3 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Денница на Яндекс.Картах</h3>
                <p className="mt-5 text-lg leading-8 text-white/75">В предпросмотре внешняя карта может блокироваться доступом к сети. На рабочем сайте можно вернуть iframe, а сейчас используем прямые ссылки.</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a href={yandexMapUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white px-6 py-4 font-medium text-[#2D2A26] hover:bg-[#E7DFD3]">
                    Открыть в Яндекс.Картах
                  </a>
                  <a href={yandexRouteUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-6 py-4 font-medium text-white hover:bg-white/10">
                    Построить маршрут
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="px-5 pb-24 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#2D2A26] text-white"><div className="grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:p-16"><div><p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#B38A5A]">Бронирование</p><h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Подберем номер под ваши даты</h2><p className="mt-6 max-w-xl text-lg leading-8 text-white/65">Оставьте заявку — администратор свяжется с вами, уточнит даты и предложит подходящий номер или домик. Заезд с 15:00, выезд до 12:00.</p></div><form className="grid gap-3"><input className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/40" placeholder="Ваше имя" /><input className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/40" placeholder="Телефон" /><input className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/40" placeholder="Даты поездки" /><input className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 outline-none placeholder:text-white/40" placeholder="Количество гостей" /><button className="rounded-2xl bg-white px-6 py-4 font-medium text-[#2D2A26] hover:bg-[#E7DFD3]">Проверить свободные номера</button><a href={whatsappHref} className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-4 font-medium text-white hover:bg-white/10"><MessageCircle className="h-4 w-4" /> Написать в WhatsApp</a></form></div></div></section>

      <footer id="contacts" className="border-t border-[#2D2A26]/10 px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-[#2D2A26]/60 md:flex-row md:items-center">
          <div className="space-y-3"><DenitsaLogo variant="dark" /><div>{address}</div></div>
          <div className="flex flex-wrap gap-4"><a href={phoneHref}>{phone}</a><a href="#booking">Бронирование</a><a href={`mailto:${email}`}>{email}</a></div>
        </div>
      </footer>

      {selectedImage ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedImage(null)}>
          <button type="button" aria-label="Закрыть фото" className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#2D2A26]" onClick={() => setSelectedImage(null)}>
            Закрыть
          </button>
          <img src={selectedImage} alt="Просмотр фото" onError={handleImageError} className="max-h-[90vh] max-w-[95vw] rounded-[2rem] object-contain shadow-2xl" />
        </div>
      ) : null}

      <div className="fixed bottom-5 left-5 right-5 z-50 grid grid-cols-2 gap-3 md:hidden">
        <a href={whatsappHref} className="rounded-full bg-[#7A8B6F] px-4 py-4 text-center text-sm font-medium text-white shadow-2xl">WhatsApp</a>
        <a href="#booking" className="rounded-full bg-[#2D2A26] px-4 py-4 text-center text-sm font-medium text-white shadow-2xl">Забронировать</a>
      </div>
    </main>
  );
}
