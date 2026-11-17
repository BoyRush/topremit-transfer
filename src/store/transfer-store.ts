import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TransferServiceType = "BANK_TRANSFER" | "E_WALLET";
export type TransferSpeedType = "REGULAR" | "INSTANT";

export interface RecipientDraft {
  bankCode: string;
  bankName: string;
  accountNumber: string;
  fullName: string;
  transferPurpose: string;
  email?: string;
  note?: string;
}

export interface TransferDraftState {
  // Calculator state
  sourceCurrency: "IDR";
  destinationCountryCode: string;
  destinationCountryName: string;
  destinationCurrency: string;
  destinationFlag: string;
  sendAmountIdr: number;
  receiveAmountFx: number;
  exchangeRate: number;
  serviceType: TransferServiceType;
  speed: TransferSpeedType;
  transferFeeIdr: number;
  discountIdr: number;
  appliedPromoCode: string | null;
  paymentBank: string | null;

  // Recipient state
  recipient: RecipientDraft | null;

  // Step progression
  currentStep: number;
  maxCompletedStep: number;

  // Actions
  setAmounts: (sendAmountIdr: number, receiveAmountFx: number) => void;
  setDestination: (
    countryCode: string,
    countryName: string,
    currency: string,
    flag: string,
    rate: number
  ) => void;
  setServiceAndSpeed: (
    serviceType: TransferServiceType,
    speed: TransferSpeedType,
    fee: number
  ) => void;
  setRecipient: (recipient: RecipientDraft) => void;
  setPaymentBank: (bank: string) => void;
  applyPromo: (code: string, discount: number) => void;
  removePromo: () => void;
  setStep: (step: number) => void;
  /**
   * Reset only the transfer draft fields.
   * Does NOT erase transaction history (which lives in the global server store).
   */
  resetDraft: () => void;
}

const initialDraft = {
  sourceCurrency: "IDR" as const,
  destinationCountryCode: "US",
  destinationCountryName: "Amerika Serikat",
  destinationCurrency: "USD",
  destinationFlag: "🇺🇸",
  sendAmountIdr: 1000000,
  receiveAmountFx: 0,
  exchangeRate: 0.00006116,
  serviceType: "BANK_TRANSFER" as TransferServiceType,
  speed: "REGULAR" as TransferSpeedType,
  transferFeeIdr: 75000,
  discountIdr: 0,
  appliedPromoCode: null,
  paymentBank: null,
  // NOTE: recipient is intentionally NOT persisted – see partialize below.
  recipient: null,
  currentStep: 1,
  maxCompletedStep: 1,
};

export const useTransferStore = create<TransferDraftState>()(
  persist(
    (set) => ({
      ...initialDraft,
      setAmounts: (sendAmountIdr, receiveAmountFx) => set({ sendAmountIdr, receiveAmountFx }),
      setDestination: (
        destinationCountryCode,
        destinationCountryName,
        destinationCurrency,
        destinationFlag,
        exchangeRate
      ) =>
        set({
          destinationCountryCode,
          destinationCountryName,
          destinationCurrency,
          destinationFlag,
          exchangeRate,
        }),
      setServiceAndSpeed: (serviceType, speed, transferFeeIdr) =>
        set({ serviceType, speed, transferFeeIdr }),
      setRecipient: (recipient) =>
        set((state) => ({
          recipient,
          maxCompletedStep: Math.max(state.maxCompletedStep, 2),
        })),
      setPaymentBank: (paymentBank) => set({ paymentBank }),
      applyPromo: (code, discount) => set({ appliedPromoCode: code, discountIdr: discount }),
      removePromo: () => set({ appliedPromoCode: null, discountIdr: 0 }),
      setStep: (step) =>
        set((state) => ({
          currentStep: step,
          maxCompletedStep: Math.max(state.maxCompletedStep, step),
        })),
      resetDraft: () => set(initialDraft),
    }),
    {
      name: "topremit-transfer-draft-v2",
      version: 2,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      /**
       * Migration from v1 → v2.
       * v1 persisted recipient data; v2 intentionally drops it for privacy.
       * Any unknown stored version is treated as a fresh draft.
       */
      migrate: (persistedState, version) => {
        if (version < 2) {
          // Drop recipient from persisted state to respect privacy policy.
          const s = persistedState as Partial<TransferDraftState>;
          return {
            ...initialDraft,
            destinationCountryCode: s.destinationCountryCode ?? initialDraft.destinationCountryCode,
            destinationCountryName: s.destinationCountryName ?? initialDraft.destinationCountryName,
            destinationCurrency: s.destinationCurrency ?? initialDraft.destinationCurrency,
            destinationFlag: s.destinationFlag ?? initialDraft.destinationFlag,
            sendAmountIdr: s.sendAmountIdr ?? initialDraft.sendAmountIdr,
            receiveAmountFx: s.receiveAmountFx ?? initialDraft.receiveAmountFx,
            serviceType: s.serviceType ?? initialDraft.serviceType,
            speed: s.speed ?? initialDraft.speed,
            transferFeeIdr: s.transferFeeIdr ?? initialDraft.transferFeeIdr,
            appliedPromoCode: null,
            discountIdr: 0,
            paymentBank: null,
            recipient: null,
            currentStep: 1,
            maxCompletedStep: 1,
          };
        }
        return persistedState as TransferDraftState;
      },
      partialize: (state) => ({
        // Financial calculator state — safe to persist (non-sensitive)
        destinationCountryCode: state.destinationCountryCode,
        destinationCountryName: state.destinationCountryName,
        destinationCurrency: state.destinationCurrency,
        destinationFlag: state.destinationFlag,
        sendAmountIdr: state.sendAmountIdr,
        receiveAmountFx: state.receiveAmountFx,
        exchangeRate: state.exchangeRate,
        serviceType: state.serviceType,
        speed: state.speed,
        transferFeeIdr: state.transferFeeIdr,
        // Promo code is non-sensitive (public codes)
        appliedPromoCode: state.appliedPromoCode,
        discountIdr: state.discountIdr,
        // paymentBank is a bank ID string (non-sensitive)
        paymentBank: state.paymentBank,
        // Step progression — needed for route guard on page refresh
        currentStep: state.currentStep,
        maxCompletedStep: state.maxCompletedStep,
        // NOTE: `recipient` is intentionally EXCLUDED from persistence.
        // Personal banking details (account number, full name) should not be
        // written to localStorage in a production system. Users must re-enter
        // recipient details after a page refresh. This is the correct privacy posture.
      }),
    }
  )
);
