export interface PaymentBank {
  id: string;
  code: string;
  name: string;
  accountNumber: string;
  accountName: string;
  instructions: string;
  isPopular?: boolean;
}
