import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { setUser } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PasswordEditPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Password tidak sama, ilangi lagi");
      // return alert("anjing");
    } else {
      let apipath = `profile/edit/password/${user.id}`;
      let postData = {
        password: password,
      };
      return await api.putApi
        .put(apipath, postData, apiheader)
        .then((response) => {
          if (response.status === 201) {
            let { message, user } = response.data;
            dispatch(setUser({ user }));
            toast.success(message);
            setPassword("");
            setConfirmPassword("");
          } else {
            toast.error("Terjadi kesalahan, coba ulangi");
          }
        })
        .catch(() => {
          toast.error("Ada kesalahan teknis, silahkan refresh ulang");
        });
    }
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
        <div className="mb-32">
          <form action="" method="post" className="flex flex-col gap-4">
            <div className="form-control px-3 w-full">
              <label className="label">
                <span
                  className="label-text font-bold"
                  onClick={() => toast.success("anjing")}
                >
                  Password baru
                </span>
              </label>
              <input
                type="password"
                placeholder="Isikan password baru ..."
                className="input input-bordered w-full text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete=""
              />
            </div>
            <div className="form-control px-3 w-full">
              <label className="label">
                <span className="label-text font-bold">
                  Konfirmasi Password Baru
                </span>
              </label>
              <input
                type="password"
                placeholder="Isikan ulang password baru ..."
                className="input input-bordered w-full text-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                autoComplete=""
              />
            </div>

            <div className="px-3 flex flex-row items-center gap-3">
              <span
                className="btn btn-sm btn-primary"
                onClick={() => handleUpdatePassword()}
              >
                Simpan
              </span>
              <span className="btn btn-sm" onClick={() => navigate(-1)}>
                Batal
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
