import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  Images,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "features",
    label: "Featured Images",
    path: "/admin/features",
    icon: <Images />,
  }
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const isActive = (path) => {
    if (window.location.pathname === path) {
      return true;
    }
  }

  return (
    <nav className="flex flex-col gap-2 mt-8 ">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className= {`${
            isActive(menuItem.path) ? "bg-purple-700" : ""
          } flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-purple-700 text-white`}
          style={
            isActive(menuItem.path)
              ? { backgroundColor: "#7e22ce" }
              : { backgroundColor: "transparent" }
          }
        >
          
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <Fragment >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-gray-900 border-r border-purple-600">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b border-purple-600">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} color="white"/>
                <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
            
          <Button
            onClick={handleLogout}
            className="inline-flex items-center w-full gap-2 py-2 mt-auto mb-1 text-sm font-medium bg-purple-700 rounded-md shadow hover:bg-purple-800"
          >
            <LogOut />
            Logout
          </Button>
        
          </div>
          
        </SheetContent>
      </Sheet>
      <aside className="fixed top-0 bottom-0 left-0 z-0 flex-col hidden w-64 p-6 bg-gray-900 border-r border-purple-600 shadow-lg lg:flex backdrop-blur-md bg-opacity-70 hover:bg-opacity-100">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
        
          <Button
            onClick={handleLogout}
            className="inline-flex items-center w-full gap-2 py-2 mt-auto mb-1 text-sm font-medium bg-purple-700 rounded-md shadow hover:bg-purple-800"
          >
            <LogOut />
            Logout
          </Button>
        
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
