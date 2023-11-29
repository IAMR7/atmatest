import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { api } from "../../api";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const token = useSelector((state) => state.token);
  const [respDashboard, setRespDashboard] = useState("");
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };

  const getDashboard = async () => {
    let apipath = `dashboard`;

    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setRespDashboard(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="page-content">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="min-h-screen mt-16 w-full">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <Sidebar />
          {/* START CONTENT */}
          <div className="drawer-content">
            <div className="px-4 py-6">
              <label className="block lg:hidden mb-4" htmlFor="my-drawer">
                <div className="btn btn-sm">
                  <i className="bx bx-fw bx-left-arrow-alt"></i> Buka Menu
                </div>
              </label>
              <p className="text-lg font-semibold mb-4">{respDashboard}</p>
              <Link to={"/profile"} className="btn btn-sm btn-primary">
                Edit Profile Here
              </Link>
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    </div>
  );
}
