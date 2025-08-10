import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="items-center relative hidden sm:flex">
      <Search className="absolute left-2 size-5 text-gray-400" />
      <Input placeholder="Search..." className="text-sm pl-9" />
    </div>
  );
};

export default SearchBar;
