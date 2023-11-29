import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../redux/slices/userSlice";
import { api } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  // const stateToken = useSelector((state) => state.token);

  const handleLogin = async () => {
    let apipath = "auth/login";
    const postdata = {
      email: email,
      password: password,
    };
    return await api.postApi
      .post(apipath, postdata)
      .then((response) => {
        if (response.status === 200) {
          let token = response.data;
          // console.log(token);
          dispatch(setToken({ token }));
          handleUser(token.token);
          navigate("/dashboard");
        } else if (response.status === 203) {
          toast.error("Email atau password salah, coba lagi");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUser = async (token) => {
    const apiheader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let apipath = "users/me";

    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let user = response.data;
          dispatch(setUser({ user }));
        } else if (response.status === 203) {
          toast.error("Email atau password salah, coba lagi");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
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
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:px-40">
          <h1 className="text-5xl font-bold">Atmatest</h1>
          <p className="py-6 text-lg">
            Dashboard manajemen pengguna dan buku untuk tes rekrutmen Frontend
            Engineer
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-100">
          <div className="card-body">
            <div className="flex flex-row justify-center items-center">
              {/* <img src="/images/text-studentgram.png" alt="" className="w-36" /> */}
              <p className="text-2xl text-center font-bold">Book API</p>
            </div>
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: emailsaya@gmail.com"
                  className="input input-bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Input password"
                  className="input input-bordered"
                  autoComplete="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </form>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={() => handleLogin()}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
