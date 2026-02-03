import { countryNames, isLMICCountry } from "@/data/countries";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  showLMICBadge?: boolean;
}

const CountrySelect = ({
  value,
  onChange,
  required = true,
  showLMICBadge = true
}: CountrySelectProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
      >
        <option value="">Select Country</option>
        {countryNames.map((country) => (
          <option key={country} value={country}>
            {country} {isLMICCountry(country) ? "(LMIC)" : ""}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {showLMICBadge && value && isLMICCountry(value) && (
        <span className="absolute -top-2 right-0 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
          LMIC Rate Applicable
        </span>
      )}
    </div>
  );
};

export default CountrySelect;
