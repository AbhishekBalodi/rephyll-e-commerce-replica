import { Check } from "lucide-react";

const STEPS = ["Shipping", "Order Review", "Payment"];

interface CheckoutProgressBarProps {
  /** 1-based index of the active step */
  currentStep: 1 | 2 | 3;
  /** Show checkmarks on completed steps (used for final success state) */
  showCompletedChecks?: boolean;
  /** Force all steps to show as completed */
  allStepsCompleted?: boolean;
}

const CheckoutProgressBar = ({
  currentStep,
  showCompletedChecks = false,
  allStepsCompleted = false,
}: CheckoutProgressBarProps) => (
  <div className="mb-8">
    <div className="px-3 md:px-6">
      <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-start gap-x-2 md:gap-x-3">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = allStepsCompleted || stepNumber < currentStep;
          const isActive = !allStepsCompleted && stepNumber === currentStep;
          const showTick = showCompletedChecks && (allStepsCompleted || isCompleted);

          return (
            <div key={label} className="contents">
              <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${
                    isCompleted || isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {showTick ? <Check size={13} strokeWidth={3} /> : stepNumber}
                </span>
                <p
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isCompleted || isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </p>
              </div>

              {index < STEPS.length - 1 && (
                <span
                  className={`mt-[14px] block h-[2px] w-full rounded-full transition-colors duration-500 ${
                    allStepsCompleted || stepNumber < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
        </div>
    </div>
  </div>
);

export default CheckoutProgressBar;
