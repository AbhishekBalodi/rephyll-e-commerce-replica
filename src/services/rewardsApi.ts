const BASE_URL =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") || "";

function authHeaders() {
  const token = localStorage.getItem("rephyl_token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export interface ExpiringPoint {
  id: number;
  points: number;
  remainingPoints: number;
  sourceType: string;
  sourceId: number;
  expiresAt: string;
  status: string;
}

export interface RewardTransaction {
  id: number;
  transactionNumber: string;
  transactionType: string;
  direction: "CREDIT" | "DEBIT";
  points: number;
  rupeeValue: number | null;
  referenceType: string;
  referenceId: number;
  createdAt: string;
  remarks: string;
}

export interface RewardsBalance {
  pointsBalance: number;
  redeemableValue: number;
  pointsToNextRedemption: number;
  minPointsForRedemption: number;
  nearestExpiry: string | null;
  expiringPoints: ExpiringPoint[];
  recentTransactions: RewardTransaction[];
}

export async function getRewardsBalance(): Promise<RewardsBalance> {
  const res = await fetch(`${BASE_URL}/api/customer-account/rewards/balance`, {
    headers: authHeaders(),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message || `Failed to fetch rewards: ${res.status}`);
  }
  return (json?.data ?? json) as RewardsBalance;
}

export default { getRewardsBalance };
