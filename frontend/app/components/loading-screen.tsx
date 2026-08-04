import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

interface LoadingScreenProps {
  label?: string;
  fullScreen?: boolean;
}

export function LoadingScreen({
  label = "Đang tải…",
  fullScreen = false,
}: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 bg-canvas ${
        fullScreen ? "min-h-screen" : "min-h-[60vh] w-full"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {fullScreen && (
          <p className="font-display text-2xl font-bold lowercase text-ink">
            mentee
          </p>
        )}
        <CircleNotch
          size={36}
          weight="bold"
          className="animate-spin text-primary"
        />
        <p className="text-sm font-medium text-charcoal">{label}</p>
      </div>
    </div>
  );
}
