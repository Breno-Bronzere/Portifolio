import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (resets on cold start)
// For production, consider Upstash Redis for persistent rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 3;        // max requests
const RATE_WINDOW = 120_000;  // per 60 seconds

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

function validateFields(name: string, email: string, message: string): string | null {
  if (!name || name.trim().length < 2) return "Nome deve ter pelo menos 2 caracteres.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido.";
  if (!message || message.trim().length < 10) return "Mensagem deve ter pelo menos 10 caracteres.";
  if (message.trim().length > 2000) return "Mensagem não pode ultrapassar 2000 caracteres.";
  return null;
}

export async function POST(req: NextRequest) {
  // Get IP for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed } = getRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um momento e tente novamente." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { name = "", email = "", message = "" } = body;

  const validationError = validateFields(name, email, message);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada.");
    return NextResponse.json(
      { error: "Erro de configuração do servidor." },
      { status: 500 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["brenobronzere@gmail.com"],
      subject: `Nova mensagem de ${name.trim()} — Portfolio`,
      reply_to: email.trim(),
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; color: #3D6479;">
          <h2 style="margin-bottom: 4px; font-size: 18px;">Nova mensagem do portfólio</h2>
          <p style="margin: 0 0 20px; color: #8FA9BE; font-size: 13px;">Recebida via formulário de contato</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #EDF1F5; color: #8FA9BE; width: 80px;">Nome</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #EDF1F5;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #EDF1F5; color: #8FA9BE;">E-mail</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #EDF1F5;">
                <a href="mailto:${email.trim()}" style="color: #5B85A3;">${email.trim()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8FA9BE; vertical-align: top;">Mensagem</td>
              <td style="padding: 10px 0; white-space: pre-wrap; line-height: 1.6;">${message.trim()}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #AABECB;">
            Você pode responder diretamente a este e-mail para contatar ${name.trim()}.
          </p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Resend error:", errorBody);
    return NextResponse.json(
      { error: "Falha ao enviar a mensagem. Tente novamente mais tarde." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
