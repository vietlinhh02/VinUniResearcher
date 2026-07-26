
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export function TextField({ label, icon, ...inputProps }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="relative flex items-center">
        {icon && (
          <span aria-hidden className="pointer-events-none absolute left-4 flex text-ash">
            {icon}
          </span>
        )}
        <input
          {...inputProps}
          className={`h-11 w-full rounded-full border border-hairline bg-surface-card text-base text-ink placeholder:text-ash focus:outline-hidden focus:ring-3 focus:ring-ring-focus ${
            icon ? "pl-11 pr-5" : "px-5"
          }`}
        />
      </span>
    </label>
  );
}
