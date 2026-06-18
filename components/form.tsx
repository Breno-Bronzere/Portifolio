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
    "w-full rounded-xl border border-[#C3D0DD] bg-white px-4 py-3 " +
    "text-[13px] text-[#3D6479] placeholder-[#AABECB] " +
    "outline-none transition-all duration-150 " +
    "focus:border-[#5B85A3] focus:ring-2 focus:ring-[#5B85A3]/10 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const isDisabled = status === "sending" || status === "success";

  return (

      <div className="relative z-10 mx-auto">
        {/* header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-[#AABECB]" />
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#8FA9BE]">
              Contato
            </span>
          </div>
          <h1 className="mb-3 text-[36px] font-medium leading-tight tracking-tight text-[#3D6479]">
            Vamos conversar.
          </h1>
          <p className="text-[14px] leading-relaxed text-[#8FA9BE]">
            Tem um projeto em mente ou quer trocar uma ideia? Me manda uma
            mensagem <br/> respondo em até 24h.
          </p>
        </div>

        {/* success state */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#C3D0DD] bg-white px-8 py-12 text-center shadow-sm">
            <CheckCircle size={36} className="text-[#5B85A3]" />
            <div>
              <p className="mb-1 text-[15px] font-medium text-[#3D6479]">
                Mensagem enviada!
              </p>
              <p className="text-[13px] text-[#8FA9BE]">
                Obrigado pelo contato. Retorno em breve.
              </p>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-[12px] text-[#8FA9BE] underline underline-offset-2 hover:text-[#5B85A3] transition-colors"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 rounded-2xl border border-[#C3D0DD] bg-white p-6 shadow-sm"
          >
            {/* name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-[11px] uppercase tracking-[0.09em] text-[#8FA9BE]"
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
                className="text-[11px] uppercase tracking-[0.09em] text-[#8FA9BE]"
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
                className="text-[11px] uppercase tracking-[0.09em] text-[#8FA9BE]"
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
              <span className="self-end text-[11px] text-[#AABECB]">
                {form.message.length}/2000
              </span>
            </div>

            {/* error */}
            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
                <AlertCircle size={14} className="shrink-0 text-red-400" />
                <p className="text-[12px] text-red-500">{errorMsg}</p>
              </div>
            )}

            {/* submit */}
            <button
              type="submit"
              disabled={isDisabled}
              className="
                mt-1 inline-flex h-11 items-center justify-center gap-2
                rounded-xl bg-[#3D6479] px-6
                text-[13px] font-medium text-white
                transition-opacity hover:opacity-90
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {status === "sending" ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
