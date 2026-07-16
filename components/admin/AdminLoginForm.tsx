"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Не вдалося виконати вхід.");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Сталася помилка під час входу.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg rounded-[32px] bg-white p-6 shadow-sm">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-2xl border border-black/10 px-4 py-4"
          autoComplete="email"
          placeholder="Email"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-2xl border border-black/10 px-4 py-4"
          autoComplete="current-password"
          placeholder="Пароль"
        />
        {errorMessage ? (
          <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        ) : null}
        <button type="submit" className="rounded-2xl bg-neutral-950 px-5 py-4 font-bold text-white" disabled={isSubmitting}>
          {isSubmitting ? "Входимо..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}
