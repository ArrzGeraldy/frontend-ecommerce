import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput = ({
  value,
  onChange,
  placeholder,
  className = "",
}: SearchInputProps) => {
  return (
    <div className={cn("w-1/2 lg:w-1/4 relative", className)}>
      <Input
        value={value}
        onChange={(e) => onChange("search", e.target.value)}
        placeholder={placeholder || "Search..."}
        className="text-sm bg-card"
      />
      <Search
        size={18}
        className="text-muted-foreground absolute top-2 right-3"
      />
    </div>
  );
};

export default SearchInput;
