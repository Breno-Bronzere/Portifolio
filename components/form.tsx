"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function Contato() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Algo deu errado. Tente novamente.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Erro de conexão. Verifique sua internet e tente novamente.");
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded-md border border-input bg-background/60 px-4 py-3 " +
    "text-sm text-foreground placeholder:text-muted-foreground/60 " +
    "outline-none transition-all duration-150 " +
    "focus:border-ring focus:ring-[3px] focus:ring-ring/25 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const isDisabled = status === "sending" || status === "success";

  return (

      <div className="relative z-10 mx-auto">
        {/* header */}
        <div className="mb-10">
          <h1 className="mb-3 text-display text-5xl leading-tight text-foreground">
            Contato
          </h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Conta o que você precisa: um site, um sistema, um bot, ajuda com
            um servidor. Eu respondo no e-mail que você deixar, em até um dia.
          </p>
        </div>

        {/* success state */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 rounded-md bg-card/90 px-8 py-12 text-center">
            <CheckCircle size={36} className="text-success" />
            <div>
              <p className="mb-1 text-[15px] font-medium text-foreground">
                Mensagem enviada!
              </p>
              <p className="text-[13px] text-muted-foreground">
                Obrigado pelo contato. Retorno em breve.
              </p>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-[12px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 rounded-md bg-card/90 p-6 sm:p-7"
          >
            {/* name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm text-muted-foreground"
              >
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange}
                disabled={isDisabled}
                required
                className={inputBase}
              />
            </div>

            {/* email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm text-muted-foreground"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                disabled={isDisabled}
                required
                className={inputBase}
              />
            </div>

            {/* message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm text-muted-foreground"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Descreva seu projeto ou deixe uma mensagem..."
                value={form.message}
                onChange={handleChange}
                disabled={isDisabled}
                required
                className={`${inputBase} resize-none`}
              />
              <span className="self-end text-[11px] text-muted-foreground">
                {form.message.length}/2000
              </span>
            </div>

            {/* error */}
            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5">
                <AlertCircle size={14} className="shrink-0 text-destructive" />
                <p className="text-[12px] text-destructive">{errorMsg}</p>
              </div>
            )}

            {/* submit */}
            <button
              type="submit"
              disabled={isDisabled}
              className="
                mt-1 inline-flex h-11 items-center justify-center gap-2
                rounded-md bg-primary px-6
                text-sm font-medium text-primary-foreground
                transition-opacity hover:opacity-90
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {status === "sending" ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  Enviando…
                </>
              ) : (
                <>
                  <Send size={14} />
                  Enviar mensagem
                </>
              )}
            </button>
          </form>
        )}
      </div>
  );
}
