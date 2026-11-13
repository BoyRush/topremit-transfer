import { NextResponse } from "next/server";
import { createTransaction, getAllTransactions } from "@/services/transaction.service";
import type { CreateTransactionPayload } from "@/models/transaction";

export const dynamic = "force-dynamic";

export async function GET() {
  const transactions = getAllTransactions();
  return NextResponse.json({
    success: true,
    count: transactions.length,
    data: transactions,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateTransactionPayload>;

    // 1. Validate destinationCountry
    if (
      !body.destinationCountry ||
      !body.destinationCountry.code ||
      !body.destinationCountry.name
    ) {
      return NextResponse.json(
        { success: false, message: "Negara tujuan transfer tidak valid atau tidak lengkap" },
        { status: 400 }
      );
    }

    // 2. Validate currency and amounts
    if (!body.destinationCurrency || typeof body.destinationCurrency !== "string") {
      return NextResponse.json(
        { success: false, message: "Mata uang tujuan tidak valid" },
        { status: 400 }
      );
    }

    if (typeof body.sendAmount !== "number" || body.sendAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Nominal pengiriman (IDR) harus lebih besar dari 0" },
        { status: 400 }
      );
    }

    if (typeof body.receiveAmount !== "number" || body.receiveAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Nominal penerimaan harus lebih besar dari 0" },
        { status: 400 }
      );
    }

    if (typeof body.exchangeRate !== "number" || body.exchangeRate <= 0) {
      return NextResponse.json(
        { success: false, message: "Nilai tukar tidak valid" },
        { status: 400 }
      );
    }

    // 3. Validate service and speed
    if (body.service !== "BANK_TRANSFER" && body.service !== "E_WALLET") {
      return NextResponse.json(
        { success: false, message: "Jenis layanan harus BANK_TRANSFER atau E_WALLET" },
        { status: 400 }
      );
    }

    if (body.speed !== "REGULAR" && body.speed !== "INSTANT") {
      return NextResponse.json(
        { success: false, message: "Kecepatan transfer harus REGULAR atau INSTANT" },
        { status: 400 }
      );
    }

    // 4. Validate paymentBank
    if (!body.paymentBank || !body.paymentBank.name || !body.paymentBank.accountNumber) {
      return NextResponse.json(
        { success: false, message: "Bank pembayaran dan rekening tujuan simulasi tidak lengkap" },
        { status: 400 }
      );
    }

    // 5. Validate recipient
    if (!body.recipient) {
      return NextResponse.json(
        { success: false, message: "Data penerima wajib diisi" },
        { status: 400 }
      );
    }

    const { bankName, accountNumber, fullName, transferPurpose } = body.recipient;
    if (!bankName || typeof bankName !== "string" || bankName.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Nama bank penerima wajib diisi" },
        { status: 400 }
      );
    }

    if (
      !accountNumber ||
      typeof accountNumber !== "string" ||
      !/^\d+$/.test(accountNumber.trim())
    ) {
      return NextResponse.json(
        { success: false, message: "Nomor rekening harus berupa deretan angka" },
        { status: 400 }
      );
    }

    if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap penerima wajib diisi" },
        { status: 400 }
      );
    }

    if (!transferPurpose || typeof transferPurpose !== "string") {
      return NextResponse.json(
        { success: false, message: "Tujuan transfer wajib dipilih" },
        { status: 400 }
      );
    }

    // Sanitized payload
    const validatedPayload: CreateTransactionPayload = {
      destinationCountry: {
        code: body.destinationCountry.code.trim().toUpperCase(),
        name: body.destinationCountry.name.trim(),
        flagEmoji: body.destinationCountry.flagEmoji || "🌐",
      },
      destinationCurrency: body.destinationCurrency.trim().toUpperCase(),
      sendAmount: Math.round(body.sendAmount),
      receiveAmount: Number(body.receiveAmount.toFixed(4)),
      exchangeRate: body.exchangeRate,
      service: body.service,
      speed: body.speed,
      transferFee: typeof body.transferFee === "number" ? body.transferFee : 0,
      totalPayment:
        typeof body.totalPayment === "number"
          ? body.totalPayment
          : Math.round(body.sendAmount + (body.transferFee || 0)),
      paymentBank: body.paymentBank,
      recipient: {
        bankCode: body.recipient.bankCode || "OTHER",
        bankName: body.recipient.bankName.trim(),
        accountNumber: body.recipient.accountNumber.trim(),
        fullName: body.recipient.fullName.trim(),
        transferPurpose: body.recipient.transferPurpose.trim(),
        email: body.recipient.email?.trim() || undefined,
        note: body.recipient.note?.trim() || undefined,
      },
    };

    const newTransaction = createTransaction(validatedPayload);

    return NextResponse.json(
      {
        success: true,
        message: "Transaksi simulasi berhasil dibuat",
        data: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memproses transaksi simulasi",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
