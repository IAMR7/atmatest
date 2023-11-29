import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import { setUser } from "../../redux/slices/userSlice";
import { api } from "../../api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [active, setActive] = useState(user.active);

  const dispatch = useDispatch();

  const apiheader = {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };

  const updateUser = async () => {
    let apipath = `users/${user._id}`;
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
          let resp = response.data;
          dispatch(setUser({ user: resp }));
          toast.success(`Success update ${resp.username}`);
        }
      })
      .catch((e) => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
        console.log(e);
      });
  };

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
      <div className="min-h-screen mt-16 xl:px-72 lg:px-64 px-4 py-6 w-full mb-10">
        <div
          className="flex flex-row items-center gap-2 mb-4 text-base-content"
          onClick={() => navigate(-1)}
        >
          <i className="bx bx-sm bx-left-arrow-alt"></i>
          <p className="font-semibold">Kembali</p>
        </div>
        <div className="flex flex-col gap-4 mb-32 form-control w-full">
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Username</span>
            </label>
            <input
              type="text"
              placeholder="Input name"
              className="input input-bordered w-full text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Isikan email"
              className="input input-bordered w-full text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control px-3 w-full">
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
          <div className="form-control px-3 w-full">
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
          <div className="px-3 flex flex-row justify-end items-center gap-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => updateUser()}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
