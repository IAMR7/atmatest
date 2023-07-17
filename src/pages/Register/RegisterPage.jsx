import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [majors, setMajors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [major, setMajor] = useState(null);
  const [status, setStatus] = useState(null);
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    let apipath = `register`;
    let postdata = {
      email: email,
      password: password,
      name: name,
      username: username,
      gender: gender,
      major_id: major !== null ? major.id : null,
      status_id: status !== null ? status.id : null,
      year_generation: year !== "" ? year : null,
    };
    return await api.postApi
      .post(apipath, postdata)
      .then((response) => {
        if (response.status === 201) {
          let resp = response.data;
          toast.success(resp.success);
          navigate("/login");
        } else {
          toast.error("Terjadi kesalahan, coba ulangi");
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan refresh ulang");
      });
  };

  const getMajors = async () => {
    let apipath = `majors`;
    return await api.getApi
      .get(apipath)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setMajors(resp);
        } else {
          toast.error("Terjadi kesalahan, coba ulangi");
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan refresh ulang");
      });
  };

  const getStatuses = async () => {
    let apipath = `statuses`;
    return await api.getApi
      .get(apipath)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setStatuses(resp);
        } else {
          toast.error("Terjadi kesalahan, coba ulangi");
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan refresh ulang");
      });
  };

  useEffect(() => {
    getMajors();
    getStatuses();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex flex-row justify-center items-center px-6 pb-20 pt-10">
      <div className="card flex-shrink-0 w-full lg:w-1/3 shadow-sm bg-base-100 lg:mb-0 mb-72">
        <div className="card-body w-full">
          <div className="flex flex-row justify-center items-center">
            <img src="/images/text-studentgram.png" alt="" className="w-36" />
          </div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-row flex-wrap lg:flex-nowrap items-center gap-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Isikan email"
                  className="input input-bordered w-full text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Isikan password"
                  className="input input-bordered w-full text-sm"
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row flex-wrap lg:flex-nowrap items-center gap-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nama Lengkap</span>
                </label>
                <input
                  type="text"
                  placeholder="Isikan nama"
                  className="input input-bordered w-full text-sm"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Isikan username"
                  className="input input-bordered w-full text-sm"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Jenis Kelamin</span>
              </label>
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => setGender("Laki-laki")}
                  className={
                    gender === "Laki-laki"
                      ? "btn btn-sm btn-primary"
                      : "btn btn-sm"
                  }
                >
                  Laki-laki
                </div>
                <div
                  onClick={() => setGender("Perempuan")}
                  className={
                    gender === "Perempuan"
                      ? "btn btn-sm btn-primary"
                      : "btn btn-sm"
                  }
                >
                  Perempuan
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-wrap lg:flex-nowrap items-center gap-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  defaultValue={0}
                  className="select select-bordered w-full"
                  onChange={(e) => setStatus(JSON.parse(e.target.value))}
                >
                  <option disabled value={0}>
                    Pilih status
                  </option>
                  {statuses.length > 0 &&
                    statuses.map((status) => {
                      return (
                        <option key={status.id} value={JSON.stringify(status)}>
                          {status.status}
                        </option>
                      );
                    })}
                </select>
              </div>
              {status !== null &&
                (status.status === "Mahasiswa" ||
                  status.status === "Alumni" ||
                  status.status === "Dosen") && (
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Jurusan/Prodi</span>
                    </label>
                    <select
                      defaultValue={0}
                      className="select select-bordered w-full"
                      onChange={(e) => setMajor(JSON.parse(e.target.value))}
                    >
                      <option disabled value={0}>
                        Pilih prodi
                      </option>
                      {majors.length > 0 &&
                        majors.map((major) => {
                          return (
                            <option
                              key={major.id}
                              value={JSON.stringify(major)}
                            >
                              {major.major}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )}

              {status !== null &&
                (status.status === "Mahasiswa" ||
                  status.status === "Alumni") && (
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Angkatan</span>
                    </label>
                    <select
                      defaultValue={0}
                      className="select select-bordered w-full"
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option disabled value={0}>
                        Pilih angkatan ...
                      </option>
                      <option value={2015}>2015</option>
                      <option value={2016}>2016</option>
                      <option value={2017}>2017</option>
                      <option value={2018}>2018</option>
                      <option value={2019}>2019</option>
                      <option value={2020}>2020</option>
                      <option value={2021}>2021</option>
                      <option value={2022}>2022</option>
                    </select>
                  </div>
                )}
            </div>
          </form>
          <div className="flex flex-row justify-end items-center gap-3 mt-6">
            <div className="form-control">
              <Link className="btn" to={"/login"}>
                Sudah punya akun?
              </Link>
            </div>
            <div className="form-control">
              <button
                className="btn btn-primary"
                onClick={() => handleRegister()}
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
