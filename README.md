# VORON EXPRESS

Фронтенд-шаблон локальної служби доставки на `Next.js App Router + TypeScript + Tailwind CSS`.

## Запуск

```bash
npm install
npm run dev
```

Продакшн-перевірки:

```bash
npm run lint
npm run typecheck
npm run build
```

## Реалізовані сторінки

- `/`
- `/delivery-zone`
- `/restaurants`
- `/restaurants/[slug]`
- `/cart`
- `/checkout`
- `/admin/login`
- `/admin`
- `/admin/orders`
- `/admin/restaurants`
- `/admin/restaurants/new`
- `/admin/restaurants/[id]`
- `/admin/restaurants/[id]/menu`

## Де лежать мокові дані

- Основні мокові структури: [data/mock-data.ts](./data/mock-data.ts)
- Загальні типи: [types/index.ts](./types/index.ts)

## Що ще треба підключити після уточнення ТЗ

- серверний API для закладів, меню, замовлень і статусів
- реальну авторизацію адмінки
- Google Maps / Places
- онлайн-оплату
- систему підтвердження та відправки замовлення
- реальні медіа/зображення

## Потенційні env-змінні для наступного етапу

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`
- `NEXT_PUBLIC_API_BASE_URL`
- `ADMIN_AUTH_SECRET`
- `PAYMENT_PROVIDER_KEY`
