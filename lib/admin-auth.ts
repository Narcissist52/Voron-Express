import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_SESSION_COOKIE = "voron_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getAdminConfig() {
  return {
    email: process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "",
    password: process.env.ADMIN_PASSWORD ?? "",
    secret: process.env.ADMIN_SESSION_SECRET ?? ""
  };
}

function base64urlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64urlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminAuthConfigured() {
  const config = getAdminConfig();
  return Boolean(config.email && config.password && config.secret);
}

export function createAdminSession(email: string) {
  const { secret } = getAdminConfig();
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const normalizedEmail = email.trim().toLowerCase();
  const payload = `${normalizedEmail}|${expiresAt}`;
  const encodedPayload = base64urlEncode(payload);
  const signature = signPayload(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSession(sessionValue: string | undefined) {
  const config = getAdminConfig();

  if (!sessionValue || !config.secret || !config.email) {
    return null;
  }

  const [encodedPayload, signature] = sessionValue.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload, config.secret);

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const [email, rawExpiresAt] = base64urlDecode(encodedPayload).split("|");
    const expiresAt = Number(rawExpiresAt);

    if (!email || !Number.isFinite(expiresAt) || expiresAt < Date.now()) {
      return null;
    }

    if (email !== config.email) {
      return null;
    }

    return {
      email,
      expiresAt
    };
  } catch {
    return null;
  }
}

export function validateAdminCredentials(email: string, password: string) {
  const config = getAdminConfig();
  const normalizedEmail = email.trim().toLowerCase();

  if (!config.email || !config.password || !config.secret) {
    return false;
  }

  return safeCompare(normalizedEmail, config.email) && safeCompare(password, config.password);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSession(sessionValue);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export function getAdminSessionMaxAge() {
  return SESSION_MAX_AGE;
}

export function shouldUseSecureAdminCookie() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  if (siteUrl.startsWith("https://")) {
    return true;
  }

  return false;
}
