export function onRequest(context) {
  const cf = (context.request && context.request.cf) || {};
  const country = (cf.country || "").toUpperCase();
  let currency = (cf.currency || "").toUpperCase();
  if (country === "IN") currency = "INR";
  if (!/^[A-Z]{3}$/.test(currency)) currency = country === "IN" ? "INR" : "";
  return new Response(JSON.stringify({ country: country, currency: currency }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=86400"
    }
  });
}
