import type {
  AdminOrder,
  DeliveryZone,
  MenuCategory,
  Product,
  Restaurant
} from "@/types";

export const deliveryZones: DeliveryZone[] = [
  {
    id: "zone-1",
    title: "Зона 1",
    distance: "до 2 км",
    eta: "15-25 хв",
    priceLabel: "від 69 грн",
    accent: "#f4c430",
    description: "Центр міста, швидкий виїзд кур'єра та найкоротші маршрути."
  },
  {
    id: "zone-2",
    title: "Зона 2",
    distance: "2-5 км",
    eta: "25-40 хв",
    priceLabel: "від 89 грн",
    accent: "#f1b71b",
    description: "Щільна міська забудова та стабільне покриття протягом дня."
  },
  {
    id: "zone-3",
    title: "Зона 3",
    distance: "5-8 км",
    eta: "40-55 хв",
    priceLabel: "від 119 грн",
    accent: "#dd9d11",
    description: "Околиці та приватний сектор з точковою доставкою за графіком."
  },
  {
    id: "zone-4",
    title: "Зона 4",
    distance: "8+ км",
    eta: "55-75 хв",
    priceLabel: "за погодженням",
    accent: "#c88608",
    description: "Індивідуальний тариф для дальніх адрес та об'ємних замовлень."
  }
];

export const restaurants: Restaurant[] = [
  {
    id: "rest-osama",
    slug: "osama",
    name: "OSAMA",
    shortDescription: "Суші та роли з вечірньою піковою доставкою.",
    description: "Локальний суші-бар із фокусом на ролах, сетах та гарячих позиціях.",
    category: "sushi",
    address: "вул. Соборна, 15",
    phone: "+380 67 555 22 11",
    hours: "11:00 - 22:30",
    isOpenNow: true,
    etaMinutes: 35,
    settlement: "Вороньків",
    minOrderCents: 35000,
    coverLabel: "OSAMA / суші-бар",
    tags: ["Суші", "Роли", "Сети"],
    latitude: 49.2331,
    longitude: 28.4682,
    googlePlaceId: "mock-osama-place",
    active: true
  },
  {
    id: "rest-pharma",
    slug: "misceva-apteka",
    name: "Місцева аптека",
    shortDescription: "Термінова доставка базових аптечних товарів.",
    description: "Швидка локальна аптека для замовлень першої необхідності та догляду.",
    category: "pharmacy",
    address: "просп. Коцюбинського, 48",
    phone: "+380 93 204 01 77",
    hours: "08:00 - 21:00",
    isOpenNow: true,
    etaMinutes: 28,
    settlement: "Вороньків",
    minOrderCents: 20000,
    coverLabel: "Аптека / швидка допомога",
    tags: ["Ліки", "Догляд", "Першочергове"],
    latitude: 49.2284,
    longitude: 28.4517,
    googlePlaceId: "mock-pharma-place",
    active: true
  },
  {
    id: "rest-grocery",
    slug: "produkty-bilia-domu",
    name: "Продукти біля дому",
    shortDescription: "Щоденні покупки, снеки та напої в один клік.",
    description: "Невеликий продуктовий магазин для швидких побутових замовлень.",
    category: "grocery",
    address: "вул. Келецька, 89",
    phone: "+380 98 443 80 52",
    hours: "09:00 - 23:00",
    isOpenNow: false,
    etaMinutes: 42,
    settlement: "Старе",
    minOrderCents: 30000,
    coverLabel: "Маркет / щоденні покупки",
    tags: ["Продукти", "Напої", "Побутове"],
    latitude: 49.2212,
    longitude: 28.4246,
    googlePlaceId: "mock-grocery-place",
    active: true
  },
  {
    id: "rest-cafe",
    slug: "rannia-kava",
    name: "Рання кава",
    shortDescription: "Сніданки, десерти та кава поруч із домом.",
    description: "Локальна кав'ярня зі сніданками, сендвічами та десертами для швидких щоденних замовлень.",
    category: "cafe",
    address: "вул. Центральна, 7",
    phone: "+380 96 114 00 71",
    hours: "08:00 - 20:00",
    isOpenNow: true,
    etaMinutes: 24,
    settlement: "Вороньків",
    minOrderCents: 25000,
    coverLabel: "Кафе / сніданки",
    tags: ["Кава", "Сніданки", "Десерти"],
    latitude: 50.2241,
    longitude: 30.8954,
    googlePlaceId: "mock-cafe-place",
    active: true
  },
  {
    id: "rest-autoparts",
    slug: "auto-format",
    name: "АвтоФормат",
    shortDescription: "Автозапчастини та витратні матеріали з доставкою.",
    description: "Магазин базових автотоварів, мастил, фільтрів та дрібних запчастин у межах району.",
    category: "autoparts",
    address: "траса Бориспіль - Дніпро, 2 км",
    phone: "+380 95 445 33 10",
    hours: "09:00 - 18:30",
    isOpenNow: true,
    etaMinutes: 49,
    settlement: "Бориспільський район",
    minOrderCents: 50000,
    coverLabel: "Автозапчастини / сервіс",
    tags: ["Мастила", "Фільтри", "Догляд"],
    latitude: 50.2712,
    longitude: 30.9131,
    googlePlaceId: "mock-autoparts-place",
    active: true
  },
  {
    id: "rest-flowers",
    slug: "pivoniia",
    name: "Півонія",
    shortDescription: "Квіти, букети та подарункові композиції.",
    description: "Флористична майстерня для замовлень квітів, букетів та невеликих подарунків з доставкою.",
    category: "flowers",
    address: "вул. Шевченка, 21",
    phone: "+380 67 318 44 90",
    hours: "09:00 - 19:00",
    isOpenNow: false,
    etaMinutes: 31,
    settlement: "Щасливе",
    minOrderCents: 45000,
    coverLabel: "Квіти / подарунки",
    tags: ["Букети", "Подарунки", "Композиції"],
    latitude: 50.2087,
    longitude: 30.8893,
    googlePlaceId: "mock-flowers-place",
    active: true
  }
];

export const menuCategories: MenuCategory[] = [
  { id: "cat-signature", restaurantId: "rest-osama", name: "Фірмові роли", description: "Хіти закладу." },
  { id: "cat-hot", restaurantId: "rest-osama", name: "Гарячі роли", description: "Теплі та насичені." },
  { id: "cat-sets", restaurantId: "rest-osama", name: "Сети", description: "Для компанії або вечора." }
];

export const products: Product[] = [
  {
    id: "prod-1",
    restaurantId: "rest-osama",
    categoryId: "cat-signature",
    name: "Філадельфія лосось",
    description: "Лосось, сир, огірок, рис і ніжний соус.",
    price: 32900,
    weight: "280 г",
    badge: "Топ",
    imageLabel: "Рол / salmon"
  },
  {
    id: "prod-2",
    restaurantId: "rest-osama",
    categoryId: "cat-signature",
    name: "Каліфорнія креветка",
    description: "Креветка, авокадо, ікра масаго та кунжут.",
    price: 28900,
    weight: "260 г",
    imageLabel: "Рол / shrimp"
  },
  {
    id: "prod-3",
    restaurantId: "rest-osama",
    categoryId: "cat-signature",
    name: "Дракон з вугрем",
    description: "Вугор, крем-сир, огірок, унагі соус.",
    price: 35900,
    weight: "290 г",
    badge: "Нове",
    imageLabel: "Рол / вугор"
  },
  {
    id: "prod-4",
    restaurantId: "rest-osama",
    categoryId: "cat-hot",
    name: "Темпура рол лосось",
    description: "Хрустка паніровка, лосось, вершковий сир.",
    price: 30900,
    weight: "300 г",
    imageLabel: "Гарячий рол / лосось"
  },
  {
    id: "prod-5",
    restaurantId: "rest-osama",
    categoryId: "cat-hot",
    name: "Темпура рол тунець",
    description: "Тунець, чилі-майо, свіжий огірок.",
    price: 29900,
    weight: "290 г",
    imageLabel: "Гарячий рол / тунець"
  },
  {
    id: "prod-6",
    restaurantId: "rest-osama",
    categoryId: "cat-hot",
    name: "Запечений рол краб",
    description: "Краб-мікс, вершковий сир, сирна шапка.",
    price: 27900,
    weight: "285 г",
    imageLabel: "Запечений рол / краб"
  },
  {
    id: "prod-7",
    restaurantId: "rest-osama",
    categoryId: "cat-sets",
    name: "Сет Токіо Ніч",
    description: "24 шматочки з трьох популярних ролів.",
    price: 68900,
    weight: "760 г",
    badge: "Компанія",
    imageLabel: "Сет / вечір"
  },
  {
    id: "prod-8",
    restaurantId: "rest-osama",
    categoryId: "cat-sets",
    name: "Сет Осака Мікс",
    description: "32 шматочки: фірмові та гарячі роли.",
    price: 85900,
    weight: "980 г",
    imageLabel: "Сет / мікс"
  },
  {
    id: "prod-9",
    restaurantId: "rest-osama",
    categoryId: "cat-sets",
    name: "Сет Сімейний",
    description: "40 шматочків для великої компанії.",
    price: 104900,
    weight: "1200 г",
    imageLabel: "Сет / сімейний"
  },
  {
    id: "prod-10",
    restaurantId: "rest-osama",
    categoryId: "cat-signature",
    name: "Рол з тунцем та манго",
    description: "Тунець, манго, сир і соус юдзу.",
    price: 31900,
    weight: "270 г",
    imageLabel: "Рол / манго"
  }
];

export const adminOrders: AdminOrder[] = [
  { id: "VE-1001", customerName: "Анна М.", restaurantName: "OSAMA", total: 97800, createdAt: "14:05", status: "new" },
  { id: "VE-1002", customerName: "Ігор К.", restaurantName: "Місцева аптека", total: 41200, createdAt: "13:42", status: "confirmed" },
  { id: "VE-1003", customerName: "Марія П.", restaurantName: "Продукти біля дому", total: 56300, createdAt: "13:16", status: "on_the_way" },
  { id: "VE-1004", customerName: "Олег С.", restaurantName: "OSAMA", total: 118900, createdAt: "12:58", status: "completed" }
];

export const getRestaurantBySlug = (slug: string) => restaurants.find((restaurant) => restaurant.slug === slug);

export const getRestaurantProducts = (restaurantId: string) =>
  products.filter((product) => product.restaurantId === restaurantId);

export const getRestaurantCategories = (restaurantId: string) =>
  menuCategories.filter((category) => category.restaurantId === restaurantId);
