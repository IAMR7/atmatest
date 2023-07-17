import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { api } from "../../../api";
import { config } from "../../../config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserPage() {
  const [users, setUsers] = useState(null);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getUsers = async () => {
    let apipath = `admin/users`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setUsers(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const deleteUser = async (userId) => {
    let apipath = `admin/user/delete/${userId}`;
    return await api.delApi
      .delete(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          getUsers();
          toast.success(resp.message);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
    getUsers();
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
              <h1 className="text-lg font-bold mb-4">Manajemen Pengguna</h1>
              <div className="tabs tabs-boxed mb-4 w-fit">
                <a className="tab tab-active">Pengguna</a>
                <a className="tab">Admin</a>
              </div>

              {/* START USERS TABLE */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Jurusan/Prodi</th>
                      <th>Tombol Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users !== null &&
                      users.data.length > 0 &&
                      users.data.map((user) => {
                        return (
                          user.role.level !== 1 && (
                            <tr key={user.id}>
                              <td>
                                <div className="flex items-center space-x-3">
                                  <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                      {user.avatar === null ? (
                                        <img
                                          src={`/images/${
                                            user.gender === "Laki-laki"
                                              ? "male-profile.png"
                                              : "female-profile.png"
                                          }`}
                                          alt="profile-picture"
                                        />
                                      ) : (
                                        <img
                                          src={`${config.API_IMG_URL}/avatars/${user.avatar}`}
                                          alt="profile-picture"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {user.name}{" "}
                                      {user.verified === 1 && (
                                        <i className="bx bx-fw bxs-badge-check text-success"></i>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p>{user.status.status}</p>
                              </td>
                              <td>
                                <div className="flex flex-row items-center gap-2">
                                  <p>
                                    {user.status !== null &&
                                      (user.status.status === "Mahasiswa" ||
                                        user.status.status === "Alumni" ||
                                        user.status.status === "Dosen") &&
                                      user.major.major}
                                  </p>
                                  {user.status !== null &&
                                    (user.status.status === "Mahasiswa" ||
                                      user.status.status === "Alumni") && (
                                      <div className="badge badge-ghost">
                                        2018
                                      </div>
                                    )}
                                </div>
                              </td>
                              <th>
                                <div className="flex flex-row gap-2 items-center">
                                  <i className="bx bx-fw bx-info-circle text-primary"></i>
                                  <i
                                    className="bx bx-fw bx-trash text-error"
                                    onClick={() => deleteUser(user.id)}
                                  ></i>
                                </div>
                              </th>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* END USERS TABLE */}
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    </div>
  );
}
