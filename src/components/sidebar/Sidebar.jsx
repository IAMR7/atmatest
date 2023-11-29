import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  return (
    <div className="drawer-side mt-16 lg:mt-0 z-10">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="px-4 py-6 w-56 flex flex-col gap-4 border-r border-base-300 h-full bg-base-100 text-base-content">
        <p className="text-lg font-bold text-center mb-4">Book API</p>
        <NavLink
          to={"/dashboard"}
          className={({ isActive, isPending }) =>
            isPending
              ? "p-3 rounded-md text-sm"
              : isActive
              ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
              : "p-3 rounded-md text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <i className="bx bx-xs bx-grid-alt"></i>
            <p>Dashboard</p>
          </div>
        </NavLink>
        {user.role === "admin" && (
          <NavLink
            to={"/users"}
            className={({ isActive, isPending }) =>
              isPending
                ? "p-3 rounded-md text-sm"
                : isActive
                ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
                : "p-3 rounded-md text-sm"
            }
          >
            <div className="flex flex-row items-center gap-2">
              <i className="bx bx-xs bx-group"></i>
              <p>Users</p>
            </div>
          </NavLink>
        )}
        <NavLink
          to={"/books"}
          className={({ isActive, isPending }) =>
            isPending
              ? "p-3 rounded-md text-sm"
              : isActive
              ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
              : "p-3 rounded-md text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <i className="bx bx-xs bx-book-open"></i>
            <p>Books</p>
          </div>
        </NavLink>
      </ul>
    </div>
  );
}
