import { NextResponse } from "next/server";

import {
  createAdminSession,
  getAdminSessionCookieName,
  getAdminSessionMaxAge,
  isAdminAuthConfigured,
  shouldUseSecureAdminCookie,
  validateAdminCredentials
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Адмін-авторизація ще не налаштована на сервері." },
        { status: 503 }
      );
    }

    if (!email?.trim() || !password) {
      return NextResponse.json({ ok: false, error: "Вкажіть email і пароль." }, { status: 400 });
    }

    if (!validateAdminCredentials(email, password)) {
      return NextResponse.json({ ok: false, error: "Невірний email або пароль." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getAdminSessionCookieName(),
      value: createAdminSession(email),
      httpOnly: true,
      sameSite: "lax",
      secure: shouldUseSecureAdminCookie(),
      path: "/",
      maxAge: getAdminSessionMaxAge()
    });

    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Не вдалося виконати вхід." }, { status: 500 });
  }
}
