import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="drawer-side mt-16 lg:mt-0 z-10">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="px-4 py-6 w-56 flex flex-col gap-4 border-r border-base-300 h-full bg-base-100 text-base-content">
        <p className="text-lg font-bold text-center mb-4">ADMIN</p>
        <NavLink
          to={"/admin/dashboard"}
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
        <NavLink
          to={"/admin/users"}
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
            <p>Pengguna</p>
          </div>
        </NavLink>
        <NavLink
          to={"/admin/posts"}
          className={({ isActive, isPending }) =>
            isPending
              ? "p-3 rounded-md text-sm"
              : isActive
              ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
              : "p-3 rounded-md text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <i className="bx bx-xs bx-edit-alt"></i>
            <p>Postingan</p>
          </div>
        </NavLink>
        <NavLink
          to={"/admin/majors"}
          className={({ isActive, isPending }) =>
            isPending
              ? "p-3 rounded-md text-sm"
              : isActive
              ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
              : "p-3 rounded-md text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <i className="bx bx-xs bx-bookmarks"></i>
            <p>Program Studi</p>
          </div>
        </NavLink>
        <NavLink
          to={"/admin/statuses"}
          className={({ isActive, isPending }) =>
            isPending
              ? "p-3 rounded-md text-sm"
              : isActive
              ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
              : "p-3 rounded-md text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <i className="bx bx-xs bx-user-pin"></i>
            <p>Status Pengguna</p>
          </div>
        </NavLink>
        <NavLink
          to={"/admin/verifieds"}
          className={({ isActive, isPending }) =>
            isPending
              ? "p-3 rounded-md text-sm"
              : isActive
              ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
              : "p-3 rounded-md text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <i className="bx bx-xs bx-check-circle"></i>
            <p>Permintaan Verified</p>
          </div>
        </NavLink>
        <NavLink
          to={"/admin/tickets"}
          className={({ isActive, isPending }) =>
            isPending
              ? "p-3 rounded-md text-sm"
              : isActive
              ? "bg-primary p-3 font-semibold text-base-100 rounded-md text-sm"
              : "p-3 rounded-md text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <i className="bx bx-xs bx-envelope"></i>
            <p>Tiket Masuk</p>
          </div>
        </NavLink>
      </ul>
    </div>
  );
}
