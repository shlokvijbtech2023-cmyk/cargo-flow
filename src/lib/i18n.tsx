import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

/**
 * First-class language layer. Every screen reads labels from here, so a new
 * screen cannot silently ship English-only strings.
 */
const en = {
  "app.name": "CargoCopilot",
  "app.tagline": "AI operations copilot for UAE freight forwarders",

  "nav.dashboard": "Dashboard",
  "nav.new": "New Shipment",
  "nav.cash": "Cash Flow",
  "nav.impact": "Impact",
  "nav.estimator": "Route Estimator",
  "nav.newCta": "New Shipment",

  "status.booked": "Booked",
  "status.in_transit": "In Transit",
  "status.out_for_delivery": "Out for Delivery",
  "status.delivered": "Delivered",
  "status.failed": "Failed",

  "mode.air": "Air",
  "mode.sea": "Sea",
  "mode.land": "Road",

  "dash.title": "Operations Hub",
  "dash.timeSaved": "Operational Efficiency",
  "dash.hoursSaved": "hours saved this month",
  "dash.vsLast": "+12% vs last month",
  "dash.cashTitle": "Cash Flow Alert",
  "dash.cashGap": "Projected shortfall around {date}",
  "dash.cashOk": "No projected shortfall in the next 90 days",
  "dash.cashView": "Open cash flow",
  "dash.ingestTitle": "Ingest a shipment",
  "dash.ingestCta": "Process email / PDF",
  "dash.ingestNote": "AI extraction active",
  "dash.recent": "Active shipments",
  "dash.all": "All",
  "dash.empty": "No shipments match this filter.",
  "dash.cod": "COD",
  "dash.docsOk": "Documents complete",
  "dash.docsMissing": "{n} document(s) missing",
  "dash.customerLang": "Customer language",
  "dash.attention": "Need attention",
  "dash.inTransit": "In transit",
  "dash.pulse": "Operational pulse",

  "new.title": "New shipment ingestion",
  "new.subtitle":
    "Paste a booking email or attach a document. The copilot extracts, validates, summarises and logs it.",
  "new.paste": "Shipment email or booking text",
  "new.placeholder": "Paste the raw shipment email here...",
  "new.sample": "Load sample email",
  "new.upload": "Attach PDF (invoice, packing list, booking confirmation)",
  "new.uploaded": "Attached: {name}",
  "new.process": "Process shipment",
  "new.processing": "Processing...",
  "new.step1": "Extracting shipment data",
  "new.step2": "Validating documents",
  "new.step3": "Generating summary",
  "new.step4": "Logging shipment",
  "new.review": "Review extracted fields",
  "new.reviewNote": "Correct anything the copilot got wrong before saving.",
  "new.save": "Save shipment",
  "new.saved": "Shipment saved",
  "new.costs": "Third-party cost breakdown",
  "new.costsNote": "Add warehousing, broker and trucking charges tagged to this shipment.",
  "new.addLine": "Add line item",
  "new.item": "Description",
  "new.amount": "Amount (AED)",
  "new.category": "Category",

  "field.customer_name": "Customer",
  "field.customer_phone": "Customer phone",
  "field.customer_language": "Customer language",
  "field.shipper": "Shipper",
  "field.consignee": "Consignee",
  "field.cargo_type": "Cargo type",
  "field.weight": "Weight",
  "field.origin": "Origin",
  "field.destination": "Destination",
  "field.mode": "Mode",
  "field.booking_date": "Booking date",
  "field.cod_amount": "COD amount (AED)",

  "cat.warehousing": "Warehousing",
  "cat.broker": "Customs broker",
  "cat.trucking": "Trucking",
  "cat.service_fee": "Our service fee",

  "detail.back": "Back to dashboard",
  "detail.summary": "AI shipment summary",
  "detail.docs": "Document checklist",
  "detail.docsWarning": "Missing documents may delay clearance.",
  "detail.docsOk": "All required documents received.",
  "detail.statusControl": "Update status",
  "detail.waLog": "Customer WhatsApp log",
  "detail.waNote": "Simulated for demo — production connects via Meta WhatsApp Cloud API.",
  "detail.partners": "Partner coordination",
  "detail.partnersNote": "Internal thread — not visible to the customer.",
  "detail.costs": "Cost breakdown",
  "detail.internalView": "Internal view",
  "detail.clientView": "Client view",
  "detail.margin": "Margin",
  "detail.total": "Total",
  "detail.export": "Export to CSV",
  "detail.exported": "Export ready — CSV generated for this shipment.",
  "detail.generating": "Generating message...",
  "detail.fields": "Shipment record",
  "detail.notFound": "Shipment not found.",

  "doc.commercial_invoice": "Commercial invoice",
  "doc.packing_list": "Packing list",
  "doc.bill_of_lading": "Bill of lading / airway bill",
  "doc.certificate_of_origin": "Certificate of origin",

  "wa.reschedule": "Reschedule",
  "wa.confirm": "Confirm",
  "wa.driver": "Contact driver",

  "impact.title": "Impact & metrics",
  "impact.note":
    "Illustrative assumptions based on UAE industry benchmarks — not measured results.",
  "impact.before": "Before",
  "impact.after": "After",
  "impact.redelivery": "Redelivery rate",
  "impact.support": "Support calls",
  "impact.cod": "Failed COD delivery attempts",
  "impact.docs": "Manual document processing time",
  "impact.chart": "Hours saved per week",

  "cash.title": "Cash flow",
  "cash.note": "Estimate based on entered invoices and payments — not a guarantee.",
  "cash.in": "Money coming in",
  "cash.out": "Money going out",
  "cash.projection": "Projected cash position",
  "cash.warning":
    "You may be short by {amount} around {date}, based on current outstanding invoices vs. upcoming payments.",
  "cash.safe": "Projected position stays positive across the next 90 days.",
  "cash.30": "30 days",
  "cash.60": "60 days",
  "cash.90": "90 days",
  "cash.ledger": "All invoices & payments",
  "cash.party": "Party",
  "cash.due": "Due",
  "cash.amount": "Amount",
  "cash.type": "Type",
  "cash.receivable": "Receivable",
  "cash.payable": "Payable",
  "cash.overdue": "Overdue",
  "cash.pending": "Pending",
  "cash.paid": "Paid",
  "cash.netIn": "Expected in",
  "cash.netOut": "Expected out",
  "cash.sortDue": "Sorted by due date",

  "est.title": "Route estimator",
  "est.note":
    "Estimated — for planning purposes only, not a booked rate. No customs or compliance guidance.",
  "est.origin": "Origin",
  "est.destination": "Destination",
  "est.go": "Compare routes",
  "est.transit": "Transit time",
  "est.cost": "Rough cost band",
  "est.days": "{min}–{max} days",
  "est.pick": "Enter an origin and destination to compare options.",

  "common.days": "days",
  "common.kg": "kg",
  "common.language": "Language",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.none": "None",
};

const ar: Record<keyof typeof en, string> = {
  "app.name": "كارجو كوبايلوت",
  "app.tagline": "مساعد العمليات الذكي لشركات الشحن في الإمارات",

  "nav.dashboard": "لوحة التحكم",
  "nav.new": "شحنة جديدة",
  "nav.cash": "التدفق النقدي",
  "nav.impact": "الأثر",
  "nav.estimator": "مقدّر المسارات",
  "nav.newCta": "شحنة جديدة",

  "status.booked": "محجوزة",
  "status.in_transit": "قيد النقل",
  "status.out_for_delivery": "خارجة للتسليم",
  "status.delivered": "تم التسليم",
  "status.failed": "فشل التسليم",

  "mode.air": "جوي",
  "mode.sea": "بحري",
  "mode.land": "بري",

  "dash.title": "مركز العمليات",
  "dash.timeSaved": "كفاءة التشغيل",
  "dash.hoursSaved": "ساعة تم توفيرها هذا الشهر",
  "dash.vsLast": "+١٢٪ مقارنة بالشهر الماضي",
  "dash.cashTitle": "تنبيه التدفق النقدي",
  "dash.cashGap": "عجز متوقع حوالي {date}",
  "dash.cashOk": "لا يوجد عجز متوقع خلال ٩٠ يومًا",
  "dash.cashView": "فتح التدفق النقدي",
  "dash.ingestTitle": "إدخال شحنة",
  "dash.ingestCta": "معالجة بريد / ملف PDF",
  "dash.ingestNote": "الاستخراج الذكي مُفعّل",
  "dash.recent": "الشحنات النشطة",
  "dash.all": "الكل",
  "dash.empty": "لا توجد شحنات مطابقة لهذا التصنيف.",
  "dash.cod": "الدفع عند الاستلام",
  "dash.docsOk": "المستندات مكتملة",
  "dash.docsMissing": "{n} مستند ناقص",
  "dash.customerLang": "لغة العميل",
  "dash.attention": "تحتاج متابعة",
  "dash.inTransit": "قيد النقل",
  "dash.pulse": "مؤشر العمليات",

  "new.title": "إدخال شحنة جديدة",
  "new.subtitle":
    "الصق بريد الحجز أو أرفق مستندًا. يقوم المساعد بالاستخراج والتحقق والتلخيص والتسجيل.",
  "new.paste": "بريد الشحنة أو نص الحجز",
  "new.placeholder": "الصق نص بريد الشحنة هنا...",
  "new.sample": "تحميل بريد تجريبي",
  "new.upload": "إرفاق ملف PDF (فاتورة، قائمة تعبئة، تأكيد حجز)",
  "new.uploaded": "تم الإرفاق: {name}",
  "new.process": "معالجة الشحنة",
  "new.processing": "جارٍ المعالجة...",
  "new.step1": "استخراج بيانات الشحنة",
  "new.step2": "التحقق من المستندات",
  "new.step3": "إنشاء الملخص",
  "new.step4": "تسجيل الشحنة",
  "new.review": "مراجعة الحقول المستخرجة",
  "new.reviewNote": "صحّح أي بيانات غير دقيقة قبل الحفظ.",
  "new.save": "حفظ الشحنة",
  "new.saved": "تم حفظ الشحنة",
  "new.costs": "تفصيل تكاليف الأطراف الثالثة",
  "new.costsNote": "أضف رسوم التخزين والتخليص والنقل المرتبطة بهذه الشحنة.",
  "new.addLine": "إضافة بند",
  "new.item": "الوصف",
  "new.amount": "المبلغ (درهم)",
  "new.category": "التصنيف",

  "field.customer_name": "العميل",
  "field.customer_phone": "هاتف العميل",
  "field.customer_language": "لغة العميل",
  "field.shipper": "المُرسِل",
  "field.consignee": "المُرسَل إليه",
  "field.cargo_type": "نوع البضاعة",
  "field.weight": "الوزن",
  "field.origin": "المنشأ",
  "field.destination": "الوجهة",
  "field.mode": "وسيلة الشحن",
  "field.booking_date": "تاريخ الحجز",
  "field.cod_amount": "مبلغ الدفع عند الاستلام (درهم)",

  "cat.warehousing": "التخزين",
  "cat.broker": "مخلّص جمركي",
  "cat.trucking": "النقل البري",
  "cat.service_fee": "رسوم خدمتنا",

  "detail.back": "العودة إلى لوحة التحكم",
  "detail.summary": "ملخص الشحنة الذكي",
  "detail.docs": "قائمة المستندات",
  "detail.docsWarning": "المستندات الناقصة قد تؤخر التخليص.",
  "detail.docsOk": "تم استلام جميع المستندات المطلوبة.",
  "detail.statusControl": "تحديث الحالة",
  "detail.waLog": "سجل واتساب مع العميل",
  "detail.waNote": "محاكاة للعرض التوضيحي — النسخة الإنتاجية تتصل عبر واجهة واتساب من ميتا.",
  "detail.partners": "تنسيق الشركاء",
  "detail.partnersNote": "محادثة داخلية — غير ظاهرة للعميل.",
  "detail.costs": "تفصيل التكاليف",
  "detail.internalView": "عرض داخلي",
  "detail.clientView": "عرض العميل",
  "detail.margin": "هامش الربح",
  "detail.total": "الإجمالي",
  "detail.export": "تصدير إلى CSV",
  "detail.exported": "تم التصدير — أُنشئ ملف CSV لهذه الشحنة.",
  "detail.generating": "جارٍ إنشاء الرسالة...",
  "detail.fields": "سجل الشحنة",
  "detail.notFound": "الشحنة غير موجودة.",

  "doc.commercial_invoice": "الفاتورة التجارية",
  "doc.packing_list": "قائمة التعبئة",
  "doc.bill_of_lading": "بوليصة الشحن / بوليصة الشحن الجوي",
  "doc.certificate_of_origin": "شهادة المنشأ",

  "wa.reschedule": "إعادة الجدولة",
  "wa.confirm": "تأكيد",
  "wa.driver": "التواصل مع السائق",

  "impact.title": "الأثر والمؤشرات",
  "impact.note": "افتراضات توضيحية مبنية على معايير القطاع في الإمارات — وليست نتائج مُقاسة.",
  "impact.before": "قبل",
  "impact.after": "بعد",
  "impact.redelivery": "نسبة إعادة التسليم",
  "impact.support": "مكالمات الدعم",
  "impact.cod": "محاولات التسليم الفاشلة للدفع عند الاستلام",
  "impact.docs": "زمن معالجة المستندات يدويًا",
  "impact.chart": "الساعات الموفَّرة أسبوعيًا",

  "cash.title": "التدفق النقدي",
  "cash.note": "تقدير مبني على الفواتير والمدفوعات المُدخلة — وليس ضمانًا.",
  "cash.in": "المبالغ الواردة",
  "cash.out": "المبالغ الصادرة",
  "cash.projection": "الوضع النقدي المتوقع",
  "cash.warning":
    "قد يكون لديك عجز بمقدار {amount} حوالي {date}، بناءً على الفواتير المستحقة والمدفوعات القادمة.",
  "cash.safe": "الوضع المتوقع يبقى إيجابيًا خلال التسعين يومًا القادمة.",
  "cash.30": "٣٠ يومًا",
  "cash.60": "٦٠ يومًا",
  "cash.90": "٩٠ يومًا",
  "cash.ledger": "كل الفواتير والمدفوعات",
  "cash.party": "الطرف",
  "cash.due": "تاريخ الاستحقاق",
  "cash.amount": "المبلغ",
  "cash.type": "النوع",
  "cash.receivable": "مستحق لنا",
  "cash.payable": "مستحق علينا",
  "cash.overdue": "متأخرة",
  "cash.pending": "قيد الانتظار",
  "cash.paid": "مدفوعة",
  "cash.netIn": "المتوقع وارد",
  "cash.netOut": "المتوقع صادر",
  "cash.sortDue": "مرتبة حسب تاريخ الاستحقاق",

  "est.title": "مقدّر المسارات",
  "est.note":
    "تقديري — لأغراض التخطيط فقط، وليس سعرًا مؤكدًا. لا يتضمن أي إرشادات جمركية أو قانونية.",
  "est.origin": "المنشأ",
  "est.destination": "الوجهة",
  "est.go": "مقارنة المسارات",
  "est.transit": "مدة النقل",
  "est.cost": "نطاق التكلفة التقريبي",
  "est.days": "{min}–{max} يوم",
  "est.pick": "أدخل المنشأ والوجهة لمقارنة الخيارات.",

  "common.days": "يوم",
  "common.kg": "كجم",
  "common.language": "اللغة",
  "common.save": "حفظ",
  "common.cancel": "إلغاء",
  "common.none": "لا شيء",
};

export type TKey = keyof typeof en;
const dicts: Record<Lang, Record<string, string>> = { en, ar };

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: TKey, vars?: Record<string, string | number>) => string;
  money: (n: number) => string;
  num: (n: number, digits?: number) => string;
  date: (iso: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("cc-lang");
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("cc-lang", l);
  }, []);

  const value = useMemo<Ctx>(() => {
    const locale = lang === "ar" ? "ar-AE" : "en-AE";
    const t = (key: TKey, vars?: Record<string, string | number>) => {
      let s = dicts[lang][key] ?? dicts.en[key] ?? String(key);
      if (vars)
        for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      return s;
    };
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      t,
      money: (n: number) =>
        new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "AED",
          maximumFractionDigits: 0,
        }).format(n),
      num: (n: number, digits = 0) =>
        new Intl.NumberFormat(locale, {
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        }).format(n),
      date: (iso: string) =>
        new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(iso)),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
