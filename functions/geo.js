const CUR = {
  IN:"INR", US:"USD", GB:"GBP", DE:"EUR", FR:"EUR", ES:"EUR", IT:"EUR", NL:"EUR",
  PT:"EUR", BE:"EUR", AT:"EUR", IE:"EUR", FI:"EUR", GR:"EUR", SK:"EUR", SI:"EUR",
  LT:"EUR", LV:"EUR", EE:"EUR", LU:"EUR", CY:"EUR", MT:"EUR", HR:"EUR",
  JP:"JPY", KR:"KRW", CN:"CNY", TW:"TWD", HK:"HKD", SG:"SGD", MY:"MYR", TH:"THB",
  ID:"IDR", PH:"PHP", VN:"VND", BN:"BND", KH:"KHR", LA:"LAK", MM:"MMK",
  AU:"AUD", NZ:"NZD", CA:"CAD", CH:"CHF", SE:"SEK", NO:"NOK", DK:"DKK",
  IS:"ISK", PL:"PLN", CZ:"CZK", HU:"HUF", RO:"RON", BG:"BGN", RS:"RSD",
  UA:"UAH", RU:"RUB", TR:"TRY", IL:"ILS", SA:"SAR", AE:"AED", QA:"QAR",
  KW:"KWD", BH:"BHD", OM:"OMR", JO:"JOD", LBP:"LBP", IQ:"IQD", IR:"IRR",
  PK:"PKR", BD:"BDT", LK:"LKR", NP:"NPR", AF:"AFN", MN:"MNT",
  ZA:"ZAR", NG:"NGN", KE:"KES", GH:"GHS", EG:"EGP", TZ:"TZS", UG:"UGX",
  RW:"RWF", ET:"ETB", MA:"MAD", DZ:"DZD", TN:"TND", SN:"XOF", CI:"XOF",
  CM:"XAF", CD:"CDF", ZM:"ZMW", ZW:"ZWG", AO:"AOA", MZ:"MZN", NA:"NAD",
  BR:"BRL", MX:"MXN", AR:"ARS", CL:"CLP", CO:"COP", PEN:"PEN", UY:"UYU",
  VE:"VES", EC:"USD", BO:"BOB", PY:"PYG", GT:"GTQ", CR:"CRC", PA:"PAB",
  DO:"DOP", CU:"CUP", JM:"JMD", TT:"TTD", BS:"BSD", BB:"BBD", HT:"HTG",
  KK:"KZT", UZ:"UZB", GE:"GEL", AM:"AMD", AZ:"AZN", KG:"KGS", TJ:"TJS",
  TM:"TMT", MD:"MDL", BY:"BYN", BA:"BAM", MK:"MKD", AL:"ALL", ME:"EUR",
  LI:"CHF", MC:"EUR", AD:"EUR", SM:"EUR", MT:"EUR", GI:"GIP", FO:"DKK",
  GL:"DKK", SJ:"NOK", AX:"EUR", IM:"GBP", JE:"GBP", GG:"GBP",
  PG:"PGK", FJ:"FJD", NC:"XPF", PF:"XPF", WS:"WST", TO:"TOP", VU:"VUV",
  SB:"SBD", KI:"AUD", TV:"AUD", NR:"AUD", FM:"USD", MH:"USD", PW:"USD"
};

export function onRequest(context) {
  const cf = (context.request && context.request.cf) || {};
  const country = (cf.country || "").toUpperCase();
  let currency = (cf.currency || "").toUpperCase();
  if (country === "IN") currency = "INR";
  if (!/^[A-Z]{3}$/.test(currency)) currency = CUR[country] || "";
  if (country === "IN") currency = "INR";
  return new Response(JSON.stringify({ country: country, currency: currency }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=86400"
    }
  });
}
