import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { api } from "../../api";
import moment from "moment";

export default function UserPage() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState(false);

  const token = useSelector((state) => state.token);
  const userlogin = useSelector((state) => state.user);

  const apiheader = {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };

  const getUsers = async () => {
    let apipath = `users`;

    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          let users = resp.data;
          // let filter = users.filter
          // setUsers(users);
          let filter = users.filter((user) => {
            return user._id !== userlogin._id;
          });
          setUsers(filter);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const updateUser = async (userid) => {
    let apipath = `users/${userid}`;
    let postData = {
      username: username,
      email: email,
      role: role,
      active: active,
    };
    return await api.putApi
      .put(apipath, postData, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let newuser = response.data;

          toast.success(`Successfuly update ${newuser.username}`);
          document.getElementById("modal_user").close();
          setClearUser();
          setUser();
          getUsers();
        }
      })
      .catch((e) => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
        console.log(e);
      });
  };

  const addUser = async () => {
    let apipath = `users`;
    let postData = {
      username: username,
      password: password,
      confirm: confirm,
      email: email,
      role: role,
      active: active,
    };
    return await api.postApi
      .post(apipath, postData, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let newuser = response.data;
          toast.success(`Successfuly added ${newuser.username}`);
          document.getElementById("modal_add_user").close();
          getUsers();
        }
      })
      .catch((e) => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
        console.log(e);
      });
  };

  const setDetailUser = (user) => {
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setActive(user.active);
  };

  const setClearUser = () => {
    setUsername("");
    setEmail("");
    setRole("");
    setActive(false);
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
                  <i className="bx bx-fw bx-left-arrow-alt"></i> Open Menu
                </div>
              </label>
              <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="text-lg font-bold">USERS MANAGEMENT</h1>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    document.getElementById("modal_add_user").showModal();
                  }}
                >
                  Add User
                </button>
              </div>

              {/* START USERS TABLE */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created at</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.length > 0 &&
                      users.map((user, idx) => {
                        return (
                          <tr key={idx}>
                            <td>
                              <p className="font-bold">{user.username}</p>
                            </td>
                            <td>
                              <p>{user.email}</p>
                            </td>
                            <td>
                              <p>{user.role}</p>
                            </td>
                            <td>
                              <p>
                                {user.active === true ? "Active" : "Inactive"}
                              </p>
                            </td>
                            <td>
                              <p>
                                {moment(user.created).format("DD MMMM YYYY")}
                              </p>
                            </td>
                            <td>
                              <div className="flex flex-row gap-2 items-center">
                                <button
                                  onClick={() => {
                                    setDetailUser(user);
                                    setUser(user);
                                    document
                                      .getElementById("modal_user")
                                      .showModal();
                                  }}
                                  className="btn btn-sm btn-primary"
                                >
                                  Detail
                                </button>
                              </div>
                            </td>
                          </tr>
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
        {/* MODAL EDIT USER */}
        <dialog id="modal_user" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="flex flex-row justify-between items-center">
              <p>Edit User</p>
              <label
                onClick={() => {
                  setClearUser();
                  setUser();
                  document.getElementById("modal_user").close();
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>
            <div className="flex flex-col gap-5 py-4 overflow-y-hidden">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Input username"
                  className="input border-slate-300 w-full text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Input email"
                  className="input border-slate-300 w-full text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Role</span>
                </label>
                <select
                  className="select border-slate-300 w-full"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option disabled>Select role</option>
                  <option value={"admin"}>Admin</option>
                  <option value={"member"}>Member</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Active</span>
                </label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={active === true ? true : false}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </div>
              <div className="flex flex-row">
                <button
                  className="btn btn-sm btn-primary"
                  type="submit"
                  onClick={() => updateUser(user._id)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </dialog>
        {/* END MODAL EDIT USER */}

        {/* MODAL TAMBAH USER */}
        <dialog
          id="modal_add_user"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="flex flex-row justify-between items-center">
              <p>Add User</p>
              <label
                onClick={() => {
                  document.getElementById("modal_add_user").close();
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>
            <div className="flex flex-col gap-5 py-4 overflow-y-hidden">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Input username"
                  className="input border-slate-300 w-full text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Input email"
                  className="input border-slate-300 w-full text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Input username"
                  className="input border-slate-300 w-full text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirmation Password"
                  className="input border-slate-300 w-full text-sm"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Role</span>
                </label>
                <select
                  className="select border-slate-300 w-full"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option disabled value={""}>
                    Select role
                  </option>
                  <option value={"admin"}>Admin</option>
                  <option value={"member"}>Member</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Active</span>
                </label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={active === true ? true : false}
                  onChange={(e) => setActive(e.target.checked)}
                />
              </div>
              <div className="flex flex-row">
                <button
                  className="btn btn-sm btn-primary"
                  type="submit"
                  onClick={() => addUser()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </dialog>
        {/* END MODAL TAMBAH USER */}
      </div>
    </div>
  );
}
