"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import type { Restaurant } from "@/types";

const categoryLabels = {
  sushi: "Ресторани",
  pharmacy: "Аптека",
  grocery: "Продукти",
  cafe: "Кафе",
  autoparts: "Автозапчастини",
  flowers: "Квіти"
} as const;

type RestaurantsMapProps = {
  restaurants: Restaurant[];
  compact?: boolean;
  framed?: boolean;
};

function projectRestaurants(restaurants: Restaurant[]) {
  const latitudes = restaurants.map((restaurant) => restaurant.latitude);
  const longitudes = restaurants.map((restaurant) => restaurant.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  return restaurants.map((restaurant, index) => {
    const xRatio = (restaurant.longitude - minLongitude) / Math.max(maxLongitude - minLongitude, 0.0001);
    const yRatio = (restaurant.latitude - minLatitude) / Math.max(maxLatitude - minLatitude, 0.0001);

    return {
      ...restaurant,
      index,
      left: 14 + xRatio * 68,
      top: 18 + (1 - yRatio) * 56
    };
  });
}

declare global {
  interface Window {
    __voronGoogleMapsPromise?: Promise<any>;
    __voronGoogleMapsInit?: () => void;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function loadGoogleMapsApi(apiKey: string) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only be loaded in the browser."));
  }

  if ((window as any).google?.maps) {
    return Promise.resolve((window as any).google);
  }

  if (window.__voronGoogleMapsPromise) {
    return window.__voronGoogleMapsPromise;
  }

  window.__voronGoogleMapsPromise = new Promise((resolve, reject) => {
    window.__voronGoogleMapsInit = () => {
      resolve((window as any).google);
      delete window.__voronGoogleMapsInit;
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__voronGoogleMapsInit&loading=async`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Не вдалося завантажити Google Maps."));
    document.head.appendChild(script);
  });

  return window.__voronGoogleMapsPromise;
}

export function RestaurantsMap({ restaurants, compact = false, framed = true }: RestaurantsMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(
    GOOGLE_MAPS_API_KEY ? null : "Показуємо внутрішню карту з точками. Google Maps можна підключити пізніше."
  );

  const activeRestaurants = useMemo(() => restaurants.filter((restaurant) => restaurant.active), [restaurants]);
  const projectedRestaurants = useMemo(() => projectRestaurants(activeRestaurants), [activeRestaurants]);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      return;
    }

    if (!mapRef.current || activeRestaurants.length === 0) {
      return;
    }

    let cancelled = false;

    loadGoogleMapsApi(GOOGLE_MAPS_API_KEY)
      .then((google) => {
        if (cancelled || !mapRef.current) {
          return;
        }

        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: activeRestaurants[0].latitude,
            lng: activeRestaurants[0].longitude
          },
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
          styles: [
            { featureType: "poi.business", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] }
          ]
        });

        const bounds = new google.maps.LatLngBounds();
        const infoWindow = new google.maps.InfoWindow();

        activeRestaurants.forEach((restaurant) => {
          const marker = new google.maps.Marker({
            position: { lat: restaurant.latitude, lng: restaurant.longitude },
            map,
            title: restaurant.name,
            animation: google.maps.Animation.DROP
          });

          marker.addListener("click", () => {
            infoWindow.setContent(`
              <div style="padding:8px 10px;max-width:220px;font-family:Segoe UI,Arial,sans-serif;">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6D6D6D;">
                  ${categoryLabels[restaurant.category]}
                </div>
                <div style="margin-top:6px;font-size:16px;font-weight:800;color:#171717;">
                  ${restaurant.name}
                </div>
                <div style="margin-top:6px;font-size:13px;line-height:1.5;color:#6D6D6D;">
                  ${restaurant.settlement}, ${restaurant.address}
                </div>
                <a href="/restaurants/${restaurant.slug}" style="display:inline-block;margin-top:10px;font-size:13px;font-weight:700;color:#171717;text-decoration:none;">
                  Перейти до закладу
                </a>
              </div>
            `);
            infoWindow.open({ anchor: marker, map });
          });

          bounds.extend(marker.getPosition()!);
        });

        if (activeRestaurants.length === 1) {
          map.setZoom(14);
        } else {
          map.fitBounds(bounds, 60);
        }

        setMapReady(true);
        setMapError(null);
      })
      .catch(() => {
        if (!cancelled) {
          setMapError("Google Maps поки недоступна. Показуємо внутрішню карту з точками закладів.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeRestaurants]);

  return (
    <div className={`${framed ? "card-white rounded-[32px] p-5 sm:p-6" : "flex h-full flex-col"}`}>
      <div className={`mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${compact ? "lg:mb-3" : ""}`}>
        <div>
          <div className="theme-text text-sm font-bold uppercase tracking-[0.18em]">Карта закладів</div>
          <p className={`theme-text-muted mt-2 max-w-2xl text-sm leading-6 ${compact ? "lg:max-w-xl" : ""}`}>
            {compact
              ? "Google Maps з позначеними закладами."
              : "Реальна карта Google Maps з позначеними закладами. Натисніть на точку, щоб побачити коротку інформацію і перейти до сторінки закладу."}
          </p>
        </div>
        <div className="theme-text-muted text-sm">{activeRestaurants.length} точок</div>
      </div>

      <div
        className={`theme-surface-muted overflow-hidden rounded-[28px] ${
          compact ? "min-h-[320px] lg:min-h-[360px]" : "min-h-[520px]"
        }`}
      >
        {mapReady ? (
          <div ref={mapRef} className={`w-full ${compact ? "h-[320px] lg:h-[360px]" : "h-full min-h-[420px]"}`} />
        ) : (
          <div className={`relative h-full w-full overflow-hidden ${compact ? "min-h-[320px] p-5 lg:min-h-[360px]" : "min-h-[420px] p-6"}`}>
            <div className="accent-grid absolute inset-0 opacity-35" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,196,0,0.16),transparent_24%),radial-gradient(circle_at_75%_35%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_42%_78%,rgba(255,196,0,0.12),transparent_20%)]" />
            <div className="theme-map-panel absolute left-[10%] top-[16%] h-16 w-16 rounded-full bg-white/60" />
            <div className="theme-map-panel absolute right-[14%] top-[22%] h-24 w-24 rounded-full bg-white/50" />
            <div className="theme-map-panel absolute bottom-[14%] left-[22%] h-20 w-20 rounded-full bg-white/50" />
            <div className="theme-map-panel absolute bottom-[10%] right-[18%] h-28 w-28 rounded-full bg-white/40" />

            {projectedRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/restaurants/${restaurant.slug}`}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${restaurant.left}%`, top: `${restaurant.top}%` }}
              >
                <div className="flex items-center gap-2 rounded-full bg-[#151515] px-3 py-2 text-xs font-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:-translate-y-1">
                  <span className="theme-accent-bg flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black">
                    {restaurant.index + 1}
                  </span>
                  <span className="hidden sm:inline">{restaurant.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {mapError ? (
        <div className="theme-surface-muted mt-4 rounded-[20px] px-4 py-4">
          <div className="theme-text text-sm font-bold">{mapReady ? "Google Maps активна" : "Карта працює у внутрішньому режимі"}</div>
          <p className="theme-text-muted mt-2 text-sm leading-6">{compact ? "Показуємо карту з точками закладів." : mapError}</p>
        </div>
      ) : null}

      <div className={`mt-4 grid gap-3 ${compact ? "hidden" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
        {activeRestaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            href={`/restaurants/${restaurant.slug}`}
            className={`theme-surface-muted rounded-[20px] ${compact ? "px-3 py-3" : "px-4 py-4"}`}
          >
            <div className="theme-text text-sm font-black">{restaurant.name}</div>
            <div className="theme-text-muted mt-1 text-xs font-semibold uppercase tracking-[0.12em]">
              {categoryLabels[restaurant.category]}
            </div>
            <div className={`theme-text-muted mt-2 ${compact ? "text-xs leading-5" : "text-sm leading-6"}`}>
              {restaurant.settlement}, {restaurant.address}
            </div>
          </Link>
        ))}
      </div>

      {compact ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-black/6 px-1 py-1 dark:border-white/8">
          <div className="theme-text-muted px-3 text-xs font-semibold uppercase tracking-[0.12em]">6 закладів на карті</div>
          <Link
            href="/restaurants"
            className="theme-outline-button inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold"
          >
            Усі заклади
          </Link>
        </div>
      ) : null}
    </div>
  );
}
