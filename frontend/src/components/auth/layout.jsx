import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-full w-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
