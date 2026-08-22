export type Lang = "en" | "ar";
export type ShipmentStatus =
  | "booked"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed";
export type Mode = "air" | "sea" | "land";
export type DocKey =
  | "commercial_invoice"
  | "packing_list"
  | "bill_of_lading"
  | "certificate_of_origin";
export type CostCategory = "warehousing" | "broker" | "trucking" | "service_fee";

export const ALL_DOCS: DocKey[] = [
  "commercial_invoice",
  "packing_list",
  "bill_of_lading",
  "certificate_of_origin",
];

export const ALL_STATUSES: ShipmentStatus[] = [
  "booked",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "failed",
];

export type CostLine = {
  id: string;
  item: string;
  amount: number;
  category: CostCategory;
};

export type WaMessage = {
  id: string;
  direction: "out" | "in";
  text: string;
  timestamp: string;
  buttons?: string[];
};

export type PartnerEvent = {
  id: string;
  party: string;
  role: "origin_agent" | "customs_broker" | "last_mile";
  text: string;
  timestamp: string;
};

export type Shipment = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_language: Lang;
  shipper: string;
  consignee: string;
  cargo_type: string;
  weight: number;
  origin: string;
  destination: string;
  mode: Mode;
  booking_date: string;
  status: ShipmentStatus;
  cod_amount: number;
  missing_docs: DocKey[];
  ai_summary: { en: string; ar: string };
  whatsapp_log: WaMessage[];
  cost_breakdown: CostLine[];
  partner_coordination_log: PartnerEvent[];
  created_at: string;
};

export type CashEntry = {
  id: string;
  shipment_id: string | null;
  type: "receivable" | "payable";
  party_name: string;
  amount: number;
  due_date: string;
  status: "pending" | "paid";
};
