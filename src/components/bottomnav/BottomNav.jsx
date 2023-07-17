import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="btm-nav z-20">
      <NavLink
        to={"/home"}
        className={({ isActive, isPending }) =>
          isPending
            ? "text-base-content"
            : isActive
            ? "active text-primary"
            : "text-base-content"
        }
      >
        <i className="bx bx-fw bx-home"></i>
        <span className="btm-nav-label text-sm">Beranda</span>
      </NavLink>
      <NavLink
        to={"/search"}
        className={({ isActive, isPending }) =>
          isPending
            ? "text-base-content"
            : isActive
            ? "active text-primary"
            : "text-base-content"
        }
      >
        <i className="bx bx-fw bx-search"></i>
        <span className="btm-nav-label text-sm">Cari</span>
      </NavLink>
      {/* <NavLink
        to={"/friends"}
        className={({ isActive, isPending }) =>
          isPending
            ? "text-base-content"
            : isActive
            ? "active text-primary"
            : "text-base-content"
        }
      >
        <i className="bx bx-fw bx-group"></i>
        <span className="btm-nav-label text-sm">Teman</span>
      </NavLink> */}
      <NavLink
        to={"/notifications"}
        className={({ isActive, isPending }) =>
          isPending
            ? "text-base-content"
            : isActive
            ? "active text-primary"
            : "text-base-content"
        }
      >
        <i className="bx bx-fw bx-bell"></i>
        <span className="btm-nav-label text-sm">Notifikasi</span>
      </NavLink>
      <NavLink
        to={"/me"}
        className={({ isActive, isPending }) =>
          isPending
            ? "text-base-content"
            : isActive
            ? "active text-primary"
            : "text-base-content"
        }
      >
        <i className="bx bx-fw bx-user"></i>
        <span className="btm-nav-label text-sm">Saya</span>
      </NavLink>
    </div>
  );
}
