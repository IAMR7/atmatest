import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../redux/slices/userSlice";
import { api } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setpassword] = useState();

  const handleLogin = async () => {
    let apipath = "login";
    const postdata = {
      email: email,
      password: password,
    };
    return await api.postApi
      .post(apipath, postdata)
      .then((response) => {
        if (response.status === 200) {
          let { user, token } = response.data;
          dispatch(setToken({ token }));
          dispatch(setUser({ user }));
          toast.success("Yeay! kamu berhasil login");
          if (user.role.level === 1) {
            navigate("/admin/dashboard");
          } else if (user.role.level === 2) {
            navigate("/home");
          }
        } else {
          toast.error("Email atau password!");
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
          <h1 className="text-5xl font-bold">Terhubung Bersama!</h1>
          <p className="py-6 text-lg">
            Sebarkan cerita menarikmu kepada teman-teman sekitarmu dan terhubung
            dengan mereka untuk saling berbagi keseruan lainnya
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-100">
          <div className="card-body">
            <div className="flex flex-row justify-center items-center">
              <img src="/images/text-studentgram.png" alt="" className="w-36" />
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
            <div className="form-control">
              <Link
                className="btn btn-ghost border border-primary text-primary hover:bg-base-200 hover:border hover:border-primary"
                to={"/register"}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
