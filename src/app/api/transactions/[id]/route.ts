import { NextResponse } from "next/server";
import { getTransactionById, updateTransactionRating } from "@/services/transaction.service";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const transaction = getTransactionById(id);

  if (!transaction) {
    return NextResponse.json(
      { success: false, message: `Transaksi dengan ID ${id} tidak ditemukan` },
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

    const updated = updateTransactionRating(id, body.rating, body.comment);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

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
