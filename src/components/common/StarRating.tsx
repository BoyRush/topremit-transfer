"use client";

import * as React from "react";
import { Box, Flex, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { CheckCircle2, MessageSquare, Star } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { useSubmitRating } from "@/hooks/useSubmitRating";

export interface StarRatingProps {
  transactionId: string;
  initialRating?: number;
  initialComment?: string;
  onRatingSubmitted?: (rating: number, comment?: string) => void;
}

export function StarRating({
  transactionId,
  initialRating,
  initialComment,
  onRatingSubmitted,
}: StarRatingProps) {
  const [rating, setRating] = React.useState<number>(initialRating || 0);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [comment, setComment] = React.useState<string>(initialComment || "");
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(Boolean(initialRating));
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const { mutateAsync: submitRatingMutation, isPending } = useSubmitRating();

  const isReadOnly = hasSubmitted || Boolean(initialRating);
  const activeRating = hoverRating !== null ? hoverRating : rating;

  const handleSelectRating = (value: number) => {
    if (isReadOnly) return;
    setRating(value);
    setErrorMessage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
    if (isReadOnly) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectRating(starValue);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(5, starValue + 1);
      handleSelectRating(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = Math.max(1, starValue - 1);
      handleSelectRating(prev);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly || rating === 0) {
      if (rating === 0) {
        setErrorMessage("Silakan pilih jumlah bintang (1-5) terlebih dahulu");
      }
      return;
    }

    setErrorMessage(null);

    try {
      await submitRatingMutation({
        transactionId,
        rating,
        comment: comment.trim() || undefined,
      });

      setHasSubmitted(true);
      if (onRatingSubmitted) {
        onRatingSubmitted(rating, comment.trim());
      }
    } catch (err) {
      console.error("Submit rating error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal menyimpan ulasan. Silakan coba kembali."
      );
    }
  };

  const ratingLabels: Record<number, string> = {
    1: "Sangat Kurang Puas",
    2: "Kurang Puas",
    3: "Cukup",
    4: "Puas",
    5: "Sangat Puas! ⭐",
  };

  return (
    <Box
      bg="#FFFFFF"
      p={{ base: 5, sm: 6 }}
      borderRadius="16px"
      border="1px solid #E7EDF5"
      boxShadow="0px 2px 8px rgba(15, 23, 42, 0.04)"
      textAlign="left"
    >
      <Flex align="center" gap={2} mb={1.5}>
        <MessageSquare size={18} color="#269FEF" />
        <Text fontSize="16px" fontWeight="700" color="#172B4D">
          Bagaimana Pengalaman Transfer Anda?
        </Text>
      </Flex>
      <Text fontSize="13px" color="#64748B" mb={4}>
        Bantu kami meningkatkan kualitas layanan simulasi transfer Topremit.
      </Text>

      {/* Confirmation banner if submitted */}
      {hasSubmitted ? (
        <Box bg="#DCFCE7" border="1px solid #86EFAC" p={4} borderRadius="12px" color="#166534">
          <HStack gap={2.5} align="center" mb={1}>
            <CheckCircle2 size={18} color="#16A34A" />
            <Text fontSize="14px" fontWeight="700">
              Terima Kasih Atas Ulasan Anda!
            </Text>
          </HStack>
          <HStack gap={1} my={2}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                fill={star <= rating ? "#F59E0B" : "none"}
                color={star <= rating ? "#F59E0B" : "#CBD5E1"}
              />
            ))}
            <Text fontSize="13px" fontWeight="700" color="#172B4D" ml={2}>
              {rating} / 5 ({ratingLabels[rating] || ""})
            </Text>
          </HStack>
          {comment && (
            <Text fontSize="13px" color="#334155" fontStyle="italic" mt={1}>
              &ldquo;{comment}&rdquo;
            </Text>
          )}
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            {/* Stars Selector */}
            <Box>
              <HStack
                gap={2}
                role="radiogroup"
                aria-label="Pilih rating 1 hingga 5 bintang"
                onMouseLeave={() => setHoverRating(null)}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= activeRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`${star} bintang`}
                      tabIndex={0}
                      onClick={() => handleSelectRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, star)}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: "6px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.15s ease",
                      }}
                    >
                      <Star
                        size={28}
                        fill={isFilled ? "#F59E0B" : "none"}
                        color={isFilled ? "#F59E0B" : "#CBD5E1"}
                        strokeWidth={2}
                      />
                    </button>
                  );
                })}
              </HStack>

              {activeRating > 0 && (
                <Text fontSize="13px" fontWeight="600" color="#D97706" mt={1.5}>
                  {ratingLabels[activeRating]}
                </Text>
              )}
            </Box>

            {/* Optional Comment */}
            <Box>
              <Text fontSize="13px" fontWeight="600" color="#334155" mb={1}>
                Komentar atau Masukan (Opsional)
              </Text>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 300))}
                placeholder="Ceritakan pengalaman Anda menggunakan prototipe Topremit..."
                rows={3}
                fontSize="13px"
                borderRadius="10px"
                borderColor="#E2E8F0"
                _focus={{
                  borderColor: "#269FEF",
                  boxShadow: "0 0 0 1px #269FEF",
                }}
              />
              <Flex justify="flex-end" mt={1}>
                <Text fontSize="11px" color="#94A3B8">
                  {comment.length}/300
                </Text>
              </Flex>
            </Box>

            {errorMessage && (
              <Box
                bg="#FEF2F2"
                border="1px solid #FECACA"
                p={3}
                borderRadius="8px"
                color="#DC2626"
                fontSize="12px"
              >
                {errorMessage}
              </Box>
            )}

            <Flex justify="flex-end">
              <PrimaryButton
                type="submit"
                isLoading={isPending}
                disabled={rating === 0 || isPending}
              >
                Kirim Ulasan
              </PrimaryButton>
            </Flex>
          </VStack>
        </form>
      )}
    </Box>
  );
}
