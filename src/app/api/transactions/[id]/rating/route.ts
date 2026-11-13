import { NextResponse } from "next/server";
import { getTransactionById, submitRating } from "@/services/transaction.service";

export const dynamic = "force-dynamic";

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const body = (await request.json()) as { rating?: unknown; comment?: unknown };

    const transaction = getTransactionById(id);
    if (!transaction) {
      return NextResponse.json(
        { success: false, message: `Transaksi ${id} tidak ditemukan` },
        { status: 404 }
      );
    }

    // Duplicate submission check
    if (transaction.rating !== undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating sudah pernah diberikan untuk transaksi ini.",
        },
        { status: 400 }
      );
    }

    // Validation
    if (
      typeof body.rating !== "number" ||
      !Number.isInteger(body.rating) ||
      body.rating < 1 ||
      body.rating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating harus berupa angka bulat antara 1 hingga 5 bintang.",
        },
        { status: 400 }
      );
    }

    const comment =
      typeof body.comment === "string" && body.comment.trim().length > 0
        ? body.comment.trim()
        : undefined;

    const updated = submitRating(id, body.rating, comment);

    return NextResponse.json(
      {
        success: true,
        message: "Rating berhasil disimpan. Terima kasih atas ulasan Anda!",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan rating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
