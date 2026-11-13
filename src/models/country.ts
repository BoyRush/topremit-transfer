export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Country {
  code: string; // ISO 3166-1 alpha-2 (e.g. US, SG, MY)
  name: string; // Common English name
  localName?: string; // Indonesian or native name
  currency: Currency;
  flagUrl?: string;
  flagEmoji: string;
  isPopular?: boolean;
}

export interface RestCountryApiItem {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  currencies?: Record<
    string,
    {
      name: string;
      symbol?: string;
    }
  >;
  flags?: {
    png?: string;
    svg?: string;
  };
}
