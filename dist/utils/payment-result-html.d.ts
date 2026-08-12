/** Branded HTML fallback when Stripe/SSL redirects hit the API instead of the Next app. */
export declare function paymentResultHtml(opts: {
    variant: "success" | "cancel" | "fail";
    title: string;
    subtitle: string;
    bookingId?: string;
    statusLine?: string;
    primaryHref?: string;
    primaryLabel?: string;
    secondaryHref?: string;
    secondaryLabel?: string;
}): string;
//# sourceMappingURL=payment-result-html.d.ts.map