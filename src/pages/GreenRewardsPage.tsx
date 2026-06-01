import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import { useQuery } from "@tanstack/react-query";
import { getRewardsBalance, type RewardTransaction } from "@/services/rewardsApi";
import { Leaf, TrendingUp, TrendingDown, Clock, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { getStoredGreenPointsCheckoutSummary } from "@/lib/greenPointsCheckout";

const GreenRewardsPageContent = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["rewards-balance"],
    queryFn: getRewardsBalance,
    staleTime: 30000,
    retry: 2,
  });
  const checkoutSummary = getStoredGreenPointsCheckoutSummary();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const pointsToRupeeRate = data && data.pointsBalance > 0
    ? data.redeemableValue / data.pointsBalance
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
      <section className="max-w-3xl mx-auto px-4 md:px-6 pt-[104px] pb-16 space-y-6">
        <div className="flex items-center gap-3">
          <Leaf size={28} className="text-[#388e3c]" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Green Rewards</h1>
            <p className="text-sm text-muted-foreground">Earn points on every order. Redeem for discounts.</p>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="border border-red-200 bg-red-50 rounded-xl p-5 text-center">
            <p className="text-red-700 font-medium">Failed to load rewards.</p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {data && (
          <>
            {/* Balance card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#064734] to-[#2f7a63] text-white p-6 space-y-3 shadow-md">
              <p className="text-sm font-medium opacity-80">Available Balance</p>
              <p className="text-5xl font-bold">{data.pointsBalance.toLocaleString()}</p>
              <p className="text-sm opacity-80">Green Points</p>
              <div className="border-t border-white/20 pt-3 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Gift size={14} />
                  Worth <span className="font-bold ml-1">₹{data.redeemableValue.toFixed(0)}</span>
                </span>
                <span className="opacity-70">1 pt = ₹{pointsToRupeeRate.toFixed(2)}</span>
                <span className="opacity-70">Min. {data.minPointsForRedemption} pts to redeem</span>
              </div>
              {data.pointsToNextRedemption > 0 && (
                <p className="text-xs opacity-70">
                  {data.pointsToNextRedemption} more points to next redemption tier
                </p>
              )}
            </div>

            {checkoutSummary && (
              <div className="rounded-2xl border border-[#d7ead4] bg-[#f4fbf2] p-5 space-y-2">
                <h2 className="font-semibold text-[#064734]">Last checkout redemption</h2>
                <p className="text-sm text-muted-foreground">
                  Used {checkoutSummary.pointsUsed} pts for ₹{checkoutSummary.redeemedValue.toFixed(2)}.
                </p>
                <p className="text-sm text-muted-foreground">
                  Remaining after redemption: {checkoutSummary.remainingPoints} pts = ₹{checkoutSummary.remainingRedeemableValue.toFixed(2)}.
                </p>
                <p className="text-xs text-muted-foreground">
                  Snapshot updated {new Date(checkoutSummary.updatedAt).toLocaleString("en-IN")}
                </p>
              </div>
            )}

            {/* Expiring points */}
            {data.expiringPoints && data.expiringPoints.length > 0 && (
              <div className="border border-orange-200 bg-orange-50 rounded-xl p-4 space-y-2">
                <h2 className="font-semibold text-orange-800 flex items-center gap-2">
                  <Clock size={16} />
                  Expiring Soon
                </h2>
                {data.expiringPoints.map((ep) => (
                  <div key={ep.id} className="flex justify-between text-sm text-orange-700">
                    <span>{ep.remainingPoints} pts (source: {ep.sourceType})</span>
                    <span>Expires {formatDate(ep.expiresAt)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* How it works */}
            <div className="border border-border rounded-xl p-5 bg-card space-y-2">
              <h2 className="font-semibold text-foreground">How Green Rewards Work</h2>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Earn points automatically on every confirmed order</li>
                <li>1 point = ₹{pointsToRupeeRate.toFixed(2)} — redeem at checkout for instant discounts</li>
                <li>Minimum {data.minPointsForRedemption} points required to redeem</li>
                <li>
                  {data.nearestExpiry
                    ? `Nearest points expiry: ${formatDate(data.nearestExpiry)}`
                    : "No upcoming point expiries"}
                </li>
              </ul>
              <Link
                to="/order-review"
                className="inline-block mt-2 text-sm text-primary underline font-semibold"
              >
                Use points at checkout →
              </Link>
            </div>

            {/* Recent transactions */}
            <div className="border border-border rounded-xl p-5 bg-card space-y-4">
              <h2 className="font-semibold text-foreground">Recent Transactions</h2>
              {data.recentTransactions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No transactions yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.recentTransactions.map((tx: RewardTransaction) => (
                    <div
                      key={tx.id}
                      className="flex items-start justify-between gap-3 text-sm border-b border-border pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`mt-0.5 p-1 rounded-full ${
                            tx.direction === "CREDIT"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {tx.direction === "CREDIT" ? (
                            <TrendingUp size={12} />
                          ) : (
                            <TrendingDown size={12} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{tx.remarks}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(tx.createdAt)} · {tx.transactionNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span
                          className={`font-bold ${
                            tx.direction === "CREDIT" ? "text-[#388e3c]" : "text-red-500"
                          }`}
                        >
                          {tx.direction === "CREDIT" ? "+" : "-"}{tx.points} pts
                        </span>
                        {tx.rupeeValue != null && (
                          <p className="text-xs text-muted-foreground">₹{tx.rupeeValue.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
      </main>
      <Footer />
    </div>
  );
};

const GreenRewardsPage = () => (
  <RequireAuth>
    <GreenRewardsPageContent />
  </RequireAuth>
);

export default GreenRewardsPage;
