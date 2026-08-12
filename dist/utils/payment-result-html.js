/** Branded HTML fallback when Stripe/SSL redirects hit the API instead of the Next app. */
export function paymentResultHtml(opts) {
    const accent = opts.variant === "success"
        ? { bg: "#ecfdf5", fg: "#047857", icon: "✓" }
        : opts.variant === "cancel"
            ? { bg: "#fff7ed", fg: "#c2410c", icon: "✕" }
            : { bg: "#fef2f2", fg: "#b91c1c", icon: "!" };
    const booking = opts.bookingId
        ? `<p style="margin:0;font-size:13px;color:#64748b;font-family:ui-monospace,monospace">Booking ${escapeHtml(opts.bookingId)}</p>`
        : "";
    const status = opts.statusLine
        ? `<p style="margin:8px 0 0;font-size:14px;color:#334155;font-weight:600">${escapeHtml(opts.statusLine)}</p>`
        : "";
    const primary = opts.primaryHref && opts.primaryLabel
        ? `<a href="${escapeAttr(opts.primaryHref)}" style="display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 22px;border-radius:999px;background:#4338ca;color:#fff;text-decoration:none;font-weight:600;font-size:14px">${escapeHtml(opts.primaryLabel)}</a>`
        : "";
    const secondary = opts.secondaryHref && opts.secondaryLabel
        ? `<a href="${escapeAttr(opts.secondaryHref)}" style="display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 22px;border-radius:999px;border:1px solid #e2e8f0;color:#0f172a;text-decoration:none;font-weight:600;font-size:14px;background:#fff">${escapeHtml(opts.secondaryLabel)}</a>`
        : "";
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)} · FixItNow</title>
</head>
<body style="margin:0;min-height:100vh;font-family:Inter,Segoe UI,system-ui,sans-serif;background:radial-gradient(ellipse at top,${accent.bg} 0%,#f8fafc 55%);color:#0f172a">
  <main style="max-width:480px;margin:0 auto;padding:64px 24px;text-align:center">
    <p style="margin:0 0 40px;font-weight:700;letter-spacing:-0.02em;color:#4338ca">FixItNow</p>
    <div style="width:80px;height:80px;border-radius:999px;background:${accent.bg};color:${accent.fg};display:inline-flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;margin-bottom:28px">${accent.icon}</div>
    <h1 style="margin:0 0 12px;font-size:32px;line-height:1.15;letter-spacing:-0.03em">${escapeHtml(opts.title)}</h1>
    <p style="margin:0 auto;max-width:36ch;font-size:15px;line-height:1.6;color:#64748b">${escapeHtml(opts.subtitle)}</p>
    <div style="margin:28px 0 32px">${booking}${status}</div>
    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">${primary}${secondary}</div>
  </main>
</body>
</html>`;
}
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
}
//# sourceMappingURL=payment-result-html.js.map