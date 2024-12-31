import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-purple-600 shadow-lg bg-opacity-70 backdrop-blur-md lg:hidden">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </header>
  );
}

export default AdminHeader;
