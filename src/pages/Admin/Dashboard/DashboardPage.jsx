import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { config } from "../../../config";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [requestVerifieds, setRequestVerifieds] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [posts, setPosts] = useState([]);
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
          setUsers(resp.data);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const getRequestVerifieds = async () => {
    let apipath = `request/verifieds`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setRequestVerifieds(resp.data);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const getTickets = async () => {
    let apipath = `tickets`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setTickets(resp.data);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const getPosts = async () => {
    let apipath = `posts`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setPosts(resp.data);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
    getUsers();
    getRequestVerifieds();
    getTickets();
    getPosts();
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
              <h1 className="text-lg font-bold mb-4">Dashboard</h1>

              {/* START COUNTING CARD */}
              <div className="counting-card grid grid-cols-4 gap-3 mb-8">
                <div className="card w-full bg-base-100 shadow-lg">
                  <div className="card-body">
                    <p className="text-md">
                      <i className="bx bx-fw bx-group text-primary"></i> Total
                      Pengguna
                    </p>
                    <p className="text-4xl font-bold">{users.length}</p>
                  </div>
                </div>
                <div className="card w-full bg-base-100 shadow-lg">
                  <div className="card-body">
                    <p className="text-md">
                      <i className="bx bx-fw bx-check-circle text-success"></i>{" "}
                      Permintaan Verified
                    </p>
                    <p className="text-4xl font-bold">
                      {requestVerifieds.length}
                    </p>
                  </div>
                </div>
                <div className="card w-full bg-base-100 shadow-lg">
                  <div className="card-body">
                    <p className="text-md">
                      <i className="bx bx-fw bx-envelope text-warning"></i>{" "}
                      Tiket Pesan
                    </p>
                    <p className="text-4xl font-bold">{tickets.length}</p>
                  </div>
                </div>
                <div className="card w-full bg-base-100 shadow-lg">
                  <div className="card-body">
                    <p className="text-md">
                      <i className="bx bx-fw bx-edit-alt text-error"></i> Total
                      Postingan
                    </p>
                    <p className="text-4xl font-bold">{posts.length}</p>
                  </div>
                </div>
              </div>
              {/* END COUNTING CARD */}

              <div className="flex flex-row gap-12">
                {/* START USERS TABLE */}
                <div className="overflow-x-auto w-1/2">
                  <p className="text-md font-bold mb-4">
                    Pengguna Baru Bergabung
                  </p>
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
                      {users.length > 0 &&
                        users.map((user) => {
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
                                        {user.name}
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
                                          {user.year_generation}
                                        </div>
                                      )}
                                  </div>
                                </td>
                                <th>
                                  <button className="btn btn-xs btn-primary">
                                    detail
                                  </button>
                                </th>
                              </tr>
                            )
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {/* END USERS TABLE */}

                {/* START POST TABLE */}
                <div className="overflow-x-auto w-1/2">
                  <p className="text-md font-bold mb-4">Postingan Terbaru</p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Pengguna</th>
                        <th>Postingan</th>
                        <th>Tombol Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.length > 0 &&
                        posts.map((post) => {
                          return (
                            <tr key={post.id}>
                              <td>
                                <p>{post.user.name}</p>
                              </td>
                              <td>
                                <p className="truncate w-52">{post.content}</p>
                              </td>
                              <th>
                                <button className="btn btn-xs btn-primary">
                                  detail
                                </button>
                              </th>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {/* END POST TABLE */}
              </div>
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    </div>
  );
}
