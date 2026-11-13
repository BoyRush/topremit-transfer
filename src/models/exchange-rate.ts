export interface ExchangeRateApiResponse {
  result: string;
  provider: string;
  base_code: string;
  time_last_update_utc: string;
  time_next_update_utc: string;
  rates: Record<string, number>;
}

export interface ExchangeRateData {
  baseCurrency: "IDR";
  targetCurrency: string;
  rate: number; // 1 IDR = X Target Currency
  inverseRate: number; // 1 Target Currency = Y IDR
  lastUpdated: string;
  isAvailable: boolean;
}
