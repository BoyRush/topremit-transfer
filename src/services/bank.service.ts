import type { DestinationBank } from "@/models/bank";

export const MOCK_DESTINATION_BANKS: DestinationBank[] = [
  // United States (US)
  {
    id: "us-chase",
    name: "JPMorgan Chase Bank",
    code: "CHASE",
    countryCode: "US",
    swiftBic: "CHASUS33",
  },
  { id: "us-bofa", name: "Bank of America", code: "BOFA", countryCode: "US", swiftBic: "BOFAUS3N" },
  { id: "us-wf", name: "Wells Fargo Bank", code: "WF", countryCode: "US", swiftBic: "WFBIUS6S" },
  { id: "us-citi", name: "Citibank N.A.", code: "CITI", countryCode: "US", swiftBic: "CITIUS33" },

  // Singapore (SG)
  {
    id: "sg-dbs",
    name: "DBS Bank Singapore",
    code: "DBS",
    countryCode: "SG",
    swiftBic: "DBSSSGSG",
  },
  {
    id: "sg-ocbc",
    name: "OCBC Bank Singapore",
    code: "OCBC",
    countryCode: "SG",
    swiftBic: "OCBCSGSG",
  },
  {
    id: "sg-uob",
    name: "United Overseas Bank (UOB)",
    code: "UOB",
    countryCode: "SG",
    swiftBic: "UOVBSGSG",
  },
  {
    id: "sg-scb",
    name: "Standard Chartered Bank (Singapore)",
    code: "SCB_SG",
    countryCode: "SG",
    swiftBic: "SCBLSGSG",
  },

  // Malaysia (MY)
  {
    id: "my-maybank",
    name: "Malayan Banking Berhad (Maybank)",
    code: "MAYBANK",
    countryCode: "MY",
    swiftBic: "MBBEMYKL",
  },
  {
    id: "my-cimb",
    name: "CIMB Bank Berhad",
    code: "CIMB_MY",
    countryCode: "MY",
    swiftBic: "CIBBMYKL",
  },
  {
    id: "my-public",
    name: "Public Bank Berhad",
    code: "PUBLIC_MY",
    countryCode: "MY",
    swiftBic: "PBBEMYKL",
  },
  { id: "my-rhb", name: "RHB Bank", code: "RHB", countryCode: "MY", swiftBic: "RHBBMYKL" },

  // Australia (AU)
  {
    id: "au-cba",
    name: "Commonwealth Bank of Australia",
    code: "CBA",
    countryCode: "AU",
    swiftBic: "CTBAAU2S",
  },
  { id: "au-anz", name: "ANZ Bank", code: "ANZ", countryCode: "AU", swiftBic: "ANZBAU3M" },
  {
    id: "au-westpac",
    name: "Westpac Banking Corporation",
    code: "WESTPAC",
    countryCode: "AU",
    swiftBic: "WPACAU2S",
  },
  {
    id: "au-nab",
    name: "National Australia Bank (NAB)",
    code: "NAB",
    countryCode: "AU",
    swiftBic: "NATAAU3303M",
  },

  // United Kingdom (GB)
  { id: "gb-hsbc", name: "HSBC Bank UK", code: "HSBC_UK", countryCode: "GB", swiftBic: "HBUKGB4B" },
  {
    id: "gb-barclays",
    name: "Barclays Bank",
    code: "BARCLAYS",
    countryCode: "GB",
    swiftBic: "BARCGB22",
  },
  { id: "gb-lloyds", name: "Lloyds Bank", code: "LLOYDS", countryCode: "GB", swiftBic: "LOYDGB2L" },
  {
    id: "gb-scb",
    name: "Standard Chartered Bank",
    code: "SCB",
    countryCode: "GB",
    swiftBic: "SCBLGB2L",
  },

  // Japan (JP)
  { id: "jp-mufg", name: "MUFG Bank", code: "MUFG", countryCode: "JP", swiftBic: "BOTKJPJT" },
  {
    id: "jp-smbc",
    name: "Sumitomo Mitsui Banking Corporation",
    code: "SMBC",
    countryCode: "JP",
    swiftBic: "SMBCJPJT",
  },
  { id: "jp-mizuho", name: "Mizuho Bank", code: "MIZUHO", countryCode: "JP", swiftBic: "MHCBJPJT" },

  // Germany / Eurozone (DE / EU)
  { id: "de-db", name: "Deutsche Bank", code: "DB", countryCode: "DE", swiftBic: "DEUTDEDB" },
  {
    id: "de-commerz",
    name: "Commerzbank",
    code: "COMMERZ",
    countryCode: "DE",
    swiftBic: "COBADEDD",
  },

  // Global / Fallback Banks
  {
    id: "global-hsbc",
    name: "HSBC Global Bank",
    code: "HSBC_GLOBAL",
    countryCode: "GLOBAL",
    swiftBic: "HSBCGLOBAL",
  },
  {
    id: "global-citi",
    name: "Citibank International",
    code: "CITI_GLOBAL",
    countryCode: "GLOBAL",
    swiftBic: "CITIGLOBAL",
  },
  {
    id: "global-scb",
    name: "Standard Chartered International",
    code: "SCB_GLOBAL",
    countryCode: "GLOBAL",
    swiftBic: "SCBGLOBAL",
  },
];

export function getBanksForCountry(countryCode: string): DestinationBank[] {
  const code = countryCode.toUpperCase();
  const countryBanks = MOCK_DESTINATION_BANKS.filter((b) => b.countryCode === code);

  if (countryBanks.length > 0) {
    return countryBanks;
  }

  // Fallback to global international banks
  return MOCK_DESTINATION_BANKS.filter(
    (b) => b.countryCode === "GLOBAL" || ["US", "GB", "SG"].includes(b.countryCode)
  );
}
