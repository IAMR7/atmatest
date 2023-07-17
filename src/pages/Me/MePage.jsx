import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../../components/bottomnav/BottomNav";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";

export default function MePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(clearUser());
  };
  return (
    <div className="page-content">
      <Navbar />
      <div className="min-h-screen mt-16 xl:px-72 lg:px-64 px-4 py-6 w-full mb-10">
        <div className="flex flex-col gap-2">
          <Link to={"/profile"}>
            <div className="menu rounded-lg border border-base-300 px-4 py-2">
              <div className="flex flex-row gap-5 items-center">
                <i className="bx bx-sm bx-user-circle"></i>
                <div className="flex flex-col">
                  <p className="font-semibold">Profil</p>
                  <p className="text-sm">Melihat profil dan postingan anda</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to={"/profile/edit"}>
            <div className="menu rounded-lg border border-base-300 px-4 py-2">
              <div className="flex flex-row gap-5 items-center">
                <i className="bx bx-sm bx-cog"></i>
                <div className="flex flex-col">
                  <p className="font-semibold">Pengaturan Akun</p>
                  <p className="text-sm">Melakukan pengaturan profil</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to={"/verified"}>
            <div className="menu rounded-lg border border-base-300 px-4 py-2">
              <div className="flex flex-row gap-5 items-center">
                <i className="bx bx-sm bx-check-circle"></i>
                <div className="flex flex-col">
                  <p className="font-semibold">Pengajuan Verifikasi</p>
                  <p className="text-sm">Proses pengajuan centang hijau</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to={"/ticket"}>
            <div className="menu rounded-lg border border-base-300 px-4 py-2">
              <div className="flex flex-row gap-5 items-center">
                <i className="bx bx-sm bx-envelope"></i>
                <div className="flex flex-col">
                  <p className="font-semibold">Pengaduan Keluhan</p>
                  <p className="text-sm">Laporan pengaduan kepada Admin</p>
                </div>
              </div>
            </div>
          </Link>
          <div
            className="menu rounded-lg border border-error px-4 py-2"
            onClick={() => handleLogout()}
          >
            <div className="flex flex-row gap-5 items-center">
              <i className="bx bx-sm bx-arrow-from-right text-error"></i>
              <div className="flex flex-col text-error">
                <p className="font-semibold">Keluar</p>
                <p className="text-sm">Keluar dari akun</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
