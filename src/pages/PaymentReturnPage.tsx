import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentReturnPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const merchantOrderId =
      searchParams.get("merchantOrderId") ||
      searchParams.get("order_id") ||
      searchParams.get("orderId");

    if (!merchantOrderId) {
      navigate("/checkout", { replace: true });
      return;
    }

    navigate(
      `/payment/confirmation?merchantOrderId=${encodeURIComponent(merchantOrderId)}`,
      { replace: true }
    );
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <main className="flex items-center justify-center w-full">
      <div className="text-center">
        <p className="text-base font-semibold">Redirecting after payment...</p>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we verify your payment status.</p>
      </div>
      </main>
    </div>
  );
};

export default PaymentReturnPage;
