export const formatMoney = (value: number) =>
  new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0
  }).format(value / 100);
