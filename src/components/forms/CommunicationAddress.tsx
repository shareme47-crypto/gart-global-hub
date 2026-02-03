interface CommunicationAddressProps {
  address: string;
  city: string;
  state: string;
  pincode: string;
  onAddressChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onPincodeChange: (value: string) => void;
}

const CommunicationAddress = ({
  address,
  city,
  state,
  pincode,
  onAddressChange,
  onCityChange,
  onStateChange,
  onPincodeChange
}: CommunicationAddressProps) => {
  return (
    <div className="space-y-4">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-foreground mb-1">Communication Address *</label>
        <textarea
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          required
          rows={3}
          placeholder="Enter your full communication address (House/Flat No., Street, Area, Landmark)"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">City *</label>
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">State / Province *</label>
          <input
            type="text"
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">PIN / ZIP Code *</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => onPincodeChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
    </div>
  );
};

export default CommunicationAddress;
