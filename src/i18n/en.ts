/**
 * English translation dictionary.
 * Keep keys identical between en.ts and id.ts.
 */
const en = {
  // ---- App / Global ----
  "app.name": "topremit",
  "app.tagline": "MONEY TRANSFER",
  "app.simulation_notice":
    "Prototype Simulation: No real funds are deducted from your account or transferred to any overseas bank.",

  // ---- Navigation ----
  "nav.send_money": "Send Money",
  "nav.history": "Transaction History",
  "nav.help": "Help",
  "nav.user_placeholder": "Guest",

  // ---- Language Switcher ----
  "lang.en": "English",
  "lang.id": "Bahasa Indonesia",
  "lang.select": "Language",

  // ---- Calculator Page ----
  "calc.title": "How much are you sending?",
  "calc.subtitle":
    "Enter the amount you want to send, select the destination country and transfer service.",
  "calc.sender_label": "Kamu mengirim",
  "calc.receiver_label": "Penerima menerima",
  "calc.rate_label": "Rate",
  "calc.service_speed_label": "Transfer Service & Speed",
  "calc.change": "Change",
  "calc.instant": "Instant",
  "calc.regular": "Regular",
  "calc.bank_transfer": "Bank Transfer",
  "calc.e_wallet": "E-Wallet",
  "calc.fee": "Transfer Fee",
  "calc.total": "Total Payment",
  "calc.continue": "Continue",
  "calc.single_recipient": "Single recipient",
  "calc.multi_recipient": "Multiple recipients",
  "calc.select_country": "Select destination country",
  "calc.search_country": "Search country or currency",
  "calc.local_transfer": "Local Transfer",
  "calc.international_transfer": "International Transfer",
  "calc.close": "Close",

  // ---- Stepper ----
  "step.calculator": "Calculator",
  "step.recipient": "Recipient",
  "step.review": "Review",
  "step.success": "Done",

  // ---- Recipient Page ----
  "recipient.title": "Who are you sending to?",
  "recipient.subtitle":
    "Enter the recipient's bank account details in the destination country carefully.",
  "recipient.back": "Back to Calculator",
  "recipient.bank_name": "Destination Bank",
  "recipient.bank_placeholder": "Select bank",
  "recipient.account_number": "Account Number",
  "recipient.account_number_placeholder": "e.g. 0192837465",
  "recipient.full_name": "Full Name",
  "recipient.full_name_placeholder": "As on official bank document",
  "recipient.transfer_purpose": "Transfer Purpose",
  "recipient.transfer_purpose_placeholder": "Select purpose",
  "recipient.email": "Email (Optional)",
  "recipient.email_placeholder": "recipient@example.com",
  "recipient.note": "Note (Optional)",
  "recipient.note_placeholder": "Additional information for the recipient...",
  "recipient.continue": "Continue to Review",
  "recipient.select_bank": "Select Bank",
  "recipient.search_bank": "Search bank name...",
  "recipient.no_bank_found": "No bank found",
  "recipient.purpose.family_support": "Family Support",
  "recipient.purpose.education": "Education",
  "recipient.purpose.business_payment": "Business Payment",
  "recipient.purpose.personal_expenses": "Personal Expenses",
  "recipient.purpose.other": "Other",

  // ---- Review Page ----
  "review.title": "Check before you send",
  "review.subtitle": "Review your transaction summary before confirming the fund transfer.",
  "review.back": "Back to Recipient",
  "review.send_details": "Transfer Details & Rate",
  "review.recipient_info": "Recipient Information",
  "review.payment_method": "Payment Method",
  "review.payment_bank_label": "Transfer Funds via",
  "review.promo_code": "Promo Code",
  "review.promo_placeholder": "Enter promo code",
  "review.promo_apply": "Apply",
  "review.promo_remove": "Remove",
  "review.promo_applied": "Promo applied!",
  "review.promo_invalid": "Invalid or expired promo code.",
  "review.promo_inactive": "This promo code is no longer active.",
  "review.promo_min_amount": "Minimum transfer of IDR {min} required for this promo.",
  "review.confirm_button": "Confirm Transfer",
  "review.total_payment": "Total Payment",
  "review.transfer_fee": "Transfer Fee",
  "review.discount": "Promo Discount",
  "review.send_amount": "Send Amount",
  "review.receive_amount": "Recipient Receives",
  "review.rate": "Exchange Rate",
  "review.service": "Service & Speed",

  // ---- Confirm Dialog ----
  "confirm.title": "Confirm Transfer",
  "confirm.subtitle": "Please verify the following before proceeding.",
  "confirm.recipient": "Recipient",
  "confirm.destination": "Destination",
  "confirm.send_amount": "Send Amount",
  "confirm.fee": "Fee",
  "confirm.total": "Total",
  "confirm.button": "Yes, Confirm Transfer",
  "confirm.cancel": "Cancel, Review Again",
  "confirm.disclaimer": "This is a prototype simulation. No real funds will be transferred.",

  // ---- Success Page ----
  "success.title": "Money's on the way",
  "success.subtitle":
    "Your simulated international money transfer has been successfully created and is being processed.",
  "success.heading": "Transfer Successfully Submitted",
  "success.ref": "Reference No.",
  "success.copy": "Copy",
  "success.copied": "Copied!",
  "success.send_again": "Send Again",
  "success.view_history": "View Transaction History",
  "success.summary": "Transaction Summary",
  "success.recipient_name": "Recipient",
  "success.bank_account": "Bank & Account",
  "success.destination_country": "Destination Country",
  "success.transfer_purpose": "Transfer Purpose",
  "success.send_amount": "Send Amount",
  "success.receive_amount": "Recipient Receives",
  "success.rate": "Exchange Rate",
  "success.fee_speed": "Fee & Speed",
  "success.total_payment": "Total Payment",
  "success.created_at": "Transaction Time",

  // ---- Rating ----
  "rating.title": "How was your experience?",
  "rating.subtitle": "Help us improve the Topremit transfer simulation quality.",
  "rating.submit": "Submit Review",
  "rating.comment_label": "Comments or Feedback (Optional)",
  "rating.comment_placeholder": "Tell us about your experience using the Topremit prototype...",
  "rating.thank_you_title": "Thank You for Your Review!",
  "rating.1": "Very Unsatisfied",
  "rating.2": "Unsatisfied",
  "rating.3": "Neutral",
  "rating.4": "Satisfied",
  "rating.5": "Very Satisfied! ⭐",
  "rating.select_error": "Please select a star rating (1–5) first.",
  "rating.already_rated": "Rating already submitted for this transaction.",
  "rating.failed": "Failed to save review. Please try again.",

  // ---- History Page ----
  "history.title": "Your past transfers",
  "history.subtitle": "Track the status and details of your international money transfers.",
  "history.send_money": "Send Money",
  "history.search_placeholder": "Search by reference, name or country...",
  "history.tab.all": "All",
  "history.tab.processing": "Processing",
  "history.tab.completed": "Completed",
  "history.tab.pending": "Pending",
  "history.empty_title": "No Transaction History",
  "history.empty_description":
    "You haven't made any transfer simulations yet. Start now to experience easy international money transfers.",
  "history.empty_cta": "Send Money Now",
  "history.search_empty_title": "No Transactions Found",
  "history.search_empty_description": 'No transactions match your search "{query}" on this filter.',
  "history.search_empty_cta": "Reset Search & Filter",
  "history.loading": "Loading transaction history...",
  "history.error_title": "Failed to Load History",
  "history.retry": "Retry",

  // ---- Transaction Detail ----
  "detail.back": "Back to History",
  "detail.ref": "Transaction Reference",
  "detail.payment_details": "Payment Details & Rate",
  "detail.recipient_info": "Recipient Information",
  "detail.payment_account": "Simulated Payment Destination Account",
  "detail.payment_account_note":
    "In a real system, payment is transferred to the following virtual account:",
  "detail.send_again": "Send Again",
  "detail.not_found_title": "Transaction Not Found",
  "detail.not_found_description": "Reference or ID {id} was not found in this simulation system.",

  // ---- Status Labels ----
  "status.pending": "Awaiting Payment",
  "status.processing": "Processing",
  "status.completed": "Successfully Transferred",
  "status.failed": "Failed",
  "status.cancelled": "Cancelled",

  // ---- Error / Empty States ----
  "error.generic_title": "Something Went Wrong",
  "error.retry": "Try Again",
  "empty.generic_title": "No Data",

  // ---- Misc ----
  "misc.note": "Note",
  "misc.email": "Email",
  "misc.or": "or",
  "misc.regular_days": "3 bank business days",
  "misc.instant_time": "15–60 minutes",
  "misc.business_days": "Mon–Fri",
};

export type TranslationKey = keyof typeof en;
export type TranslationDict = typeof en;

export default en;
