import { countryCodes, getDialCode } from "@/data/countries";

interface PhoneInputWithCodeProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneChange: (phone: string) => void;
  selectedCountry?: string;
  required?: boolean;
}

const PhoneInputWithCode = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneChange,
  selectedCountry,
  required = true
}: PhoneInputWithCodeProps) => {
  // Auto-set country code when country is selected
  const effectiveCode = selectedCountry ? getDialCode(selectedCountry) : countryCode;

  return (
    <div className="flex gap-2">
      <select
        value={effectiveCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        className="w-28 px-2 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        required={required}
      >
        {countryCodes.map((country) => (
          <option key={country.code} value={country.dial}>
            {country.dial} ({country.code})
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => onPhoneChange(e.target.value)}
        required={required}
        placeholder="Mobile Number"
        className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
};

export default PhoneInputWithCode;
