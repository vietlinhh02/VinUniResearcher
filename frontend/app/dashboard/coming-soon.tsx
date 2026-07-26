import type { Icon } from "@phosphor-icons/react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

interface ComingSoonProps {
  icon: Icon;
  title: string;
  description: string;
  features: readonly string[];
}

export function ComingSoon({ icon: IconComponent, title, description, features }: ComingSoonProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-3xl font-bold leading-none tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <span className="rounded-full bg-surface-bone px-3 py-1 text-xs font-semibold text-charcoal">
          Đang phát triển
        </span>
      </div>
      <p className="mt-3 max-w-xl text-base text-body">{description}</p>

      <div className="mt-8 rounded-lg border border-hairline bg-surface-card p-8">
        <IconComponent size={44} weight="duotone" className="text-primary" />
        <p className="mt-4 font-display text-xl font-semibold text-ink">
          Dự kiến trong giai đoạn pilot
        </p>
        <ul className="mt-4 flex max-w-lg flex-col gap-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-body">
              <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
