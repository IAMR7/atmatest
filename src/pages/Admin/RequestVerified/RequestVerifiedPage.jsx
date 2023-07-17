import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import moment from "moment/moment";
import { config } from "../../../config";
import { useSelector } from "react-redux";

export default function RequestVerifiedPage() {
  const [verifieds, setVerifieds] = useState(null);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getVerifieds = async () => {
    let apipath = `request/verifieds`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setVerifieds(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const acceptVerified = async (userId) => {
    let apipath = `request/verified/response/${userId}`;
    let postData = {
      verified: 1,
    };
    return await api.putApi
      .put(apipath, postData, apiheader)
      .then((response) => {
        if (response.status === 201) {
          getVerifieds();
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
    getVerifieds();
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
              <h1 className="text-lg font-bold mb-4">Permintaan Verified</h1>

              {/* START REQUEST VERIFIED TABLE */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Pengguna</th>
                      <th>Dokumen</th>
                      <th>Catatan</th>
                      <th>Tanggal Dibuat</th>
                      <th>Tombol Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifieds !== null &&
                      verifieds.data.length > 0 &&
                      verifieds.data.map((verified) => {
                        return (
                          <tr key={verified.id}>
                            <td>
                              <p className="font-semibold">
                                {verified.user.name}{" "}
                                {verified.user.verified === 1 && (
                                  <i className="bx bx-fw bxs-badge-check text-success"></i>
                                )}
                              </p>
                            </td>
                            <td>
                              {verified.image === null ? (
                                <img
                                  src={`/images/${"male-profile.png"}`}
                                  alt="profile-picture"
                                />
                              ) : (
                                <img
                                  className="w-24 rounded-md"
                                  src={`${config.API_IMG_URL}/request_verifieds/${verified.image}`}
                                  alt="profile-picture"
                                />
                              )}
                            </td>
                            <td>
                              <p>{verified.note}</p>
                            </td>
                            <td>
                              <p>
                                {moment(verified.created_at).format("LLLL")}
                              </p>
                            </td>
                            <td>
                              {verified.user.verified !== 1 ? (
                                <div className="flex flex-row gap-2 items-center">
                                  <div
                                    className="btn btn-sm btn-success text-base-100"
                                    onClick={() =>
                                      acceptVerified(verified.user.id)
                                    }
                                  >
                                    Terima
                                  </div>
                                  <div className="btn btn-sm btn-error text-base-100">
                                    Tolak
                                  </div>
                                </div>
                              ) : (
                                <div className="btn btn-sm">Diterima</div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* END REQUEST VERIFIED TABLE */}
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    </div>
  );
}
