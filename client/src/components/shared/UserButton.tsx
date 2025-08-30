import { useAuthStore } from "@/stores/useAuthStore";
import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { useMutation } from "@tanstack/react-query";
import apiRequest from "@/lib/apiRequest";

const UserButton = () => {
  const { user, setUser } = useAuthStore((state) => state);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await apiRequest.post("/auth/logout");
    },

    onSuccess: () => {
      setUser(null);
    },
  });

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="flex items-center gap-2 rounded-full"
        >
          <UserAvatar seed={user.name} variant="initials" className="size-9" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[99999] w-60 rounded-xl border p-2 shadow-lg"
        align="end"
      >
        <DropdownMenuLabel className="text-sm font-semibold">
          Logged in as{" "}
          <span className="truncate font-semibold">{user.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
          <LogOutIcon className="text-destructive mr-2 size-4" />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
