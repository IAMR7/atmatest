import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api";

export default function MajorPage() {
  const [majors, setMajors] = useState([]);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getMajors = async () => {
    let apipath = `majors`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setMajors(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
    getMajors();
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
              <h1 className="text-lg font-bold mb-4">
                Manajemen Program Studi/Jurusan
              </h1>

              {/* START MAJOR TABLE */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Program Studi/Jurusan</th>
                      <th>Tombol Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {majors.length > 0 &&
                      majors.map((major, idx) => {
                        return (
                          <tr key={major.id}>
                            <td>
                              <p>{idx + 1}</p>
                            </td>
                            <td>
                              <p>{major.major}</p>
                            </td>

                            <td>
                              <div className="flex flex-row gap-2 items-center">
                                <i className="bx bx-fw bx-info-circle text-primary"></i>
                                <i className="bx bx-fw bx-trash text-error"></i>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* END MAJOR TABLE */}
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    </div>
  );
}
