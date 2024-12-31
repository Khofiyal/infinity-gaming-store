import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      {/* admin sidebar */}
      <div className="flex flex-col border-r border-purple-600 bg:-gray-900 lg:w-64">
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      </div>
      <div className="flex flex-col flex-1">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="overflow-auto flex-1p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
