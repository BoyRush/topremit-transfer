import { NextResponse } from "next/server";
import { getTransactionById, submitRating } from "@/services/transaction.service";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const transaction = getTransactionById(id);

  if (!transaction) {
    return NextResponse.json(
      { success: false, message: `Transaksi dengan referensi ${id} tidak ditemukan` },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: transaction });
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const body = (await request.json()) as { rating: number; comment?: string };

    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating harus berada di antara 1 dan 5 bintang" },
        { status: 400 }
      );
    }

    const existing = getTransactionById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

    if (existing.rating !== undefined) {
      return NextResponse.json(
        { success: false, message: "Rating sudah pernah diberikan untuk transaksi ini" },
        { status: 400 }
      );
    }

    const updated = submitRating(id, body.rating, body.comment);

    return NextResponse.json({
      success: true,
      message: "Rating berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui rating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
