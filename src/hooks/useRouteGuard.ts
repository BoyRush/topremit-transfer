"use client";

/**
 * useRouteGuard
 *
 * Client-side route protection for the transfer wizard.
 *
 * SECURITY NOTICE:
 * ─────────────────────────────────────────────────────────────────────────────
 * This is a CLIENT-SIDE-ONLY guard. It relies on Zustand state stored in
 * localStorage. A motivated user can bypass it by directly manipulating
 * localStorage. For a production system, server-side session validation and
 * API-level authorisation must enforce these access rules.
 *
 * This guard is appropriate for a frontend prototype where the goal is good
 * UX (preventing accidental broken states) rather than hard security.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Step mapping:
 *   1  → Calculator  (/)
 *   2  → Recipient   (/recipient)
 *   3  → Review      (/review)
 *   4  → Success     (/success/[id])
 *
 * Rules enforced:
 *   - /recipient requires maxCompletedStep >= 1 (calculator done: amount > 0 chosen)
 *   - /review    requires maxCompletedStep >= 2 (recipient submitted)
 *   - /success   requires a valid transactionId param (checked by the page itself)
 *   - /history   is ALWAYS accessible (no guard)
 *
 * Usage inside a page component:
 *   useRouteGuard({ requiredStep: 2, redirectTo: "/" });
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTransferStore } from "@/store/transfer-store";

interface UseRouteGuardOptions {
  /**
   * The minimum `maxCompletedStep` required to view this page.
   * - requiredStep 1 = any visitor (calculator step)
   * - requiredStep 2 = must have submitted the calculator (can visit recipient)
   * - requiredStep 3 = must have submitted recipient (can visit review)
   */
  requiredStep: number;
  /** Where to redirect if the guard fails. Defaults to "/" */
  redirectTo?: string;
}

/**
 * React 19 compliant hydration check.
 * We use a ref to track mounted state and derive `hydrated` during render
 * via useSyncExternalStore to avoid calling setState inside a useEffect
 * (which triggers react-hooks/set-state-in-effect).
 */
function useHydrated(): boolean {
  // useSyncExternalStore returns the client snapshot after hydration,
  // and the server snapshot during SSR. This avoids both hydration mismatches
  // and the setState-in-effect lint violation.
  return React.useSyncExternalStore(
    // subscribe: no external store to subscribe to
    (cb) => {
      // schedule a re-render after mount to pick up client value
      const id = setTimeout(cb, 0);
      return () => clearTimeout(id);
    },
    // client snapshot: always true after mount
    () => true,
    // server snapshot: false during SSR
    () => false
  );
}

export function useRouteGuard({ requiredStep, redirectTo = "/" }: UseRouteGuardOptions): {
  isAllowed: boolean;
  isChecking: boolean;
} {
  const router = useRouter();
  const maxCompletedStep = useTransferStore((s) => s.maxCompletedStep);
  const hydrated = useHydrated();

  const isAllowed = !hydrated ? true : maxCompletedStep >= requiredStep;

  React.useEffect(() => {
    if (hydrated && !isAllowed) {
      router.replace(redirectTo);
    }
  }, [hydrated, isAllowed, redirectTo, router]);

  return { isAllowed, isChecking: !hydrated };
}
