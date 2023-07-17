import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../../api";
import { setUser } from "../../../redux/slices/userSlice";
import { config } from "../../../config";

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone !== null ? user.phone : "");
  const [gender, setGender] = useState(user.gender);
  const [avatar, setAvatar] = useState(user.avatar);
  const [cover, setCover] = useState(user.cover);
  const [major, setMajor] = useState(parseInt(user.major_id));
  const [status, setStatus] = useState(parseInt(user.status_id));
  const [year, setYear] = useState(user.year_generation);
  const [bio, setBio] = useState(user.bio !== null ? user.bio : "");
  const [majors, setMajors] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const dispatch = useDispatch();

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
      .get(apipath, apiheader)
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

  const handleUpdateProfile = async () => {
    let apipath = `profile/edit/${user.id}`;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("gender", gender);
    formData.append("major_id", parseInt(major));
    formData.append("status_id", parseInt(status));
    formData.append("year_generation", year);
    formData.append("avatar", avatar !== null ? avatar : null);
    formData.append("cover", cover !== null ? cover : null);
    return await api.putFileApi
      .post(apipath, formData, apiheader)
      .then((response) => {
        if (response.status === 201) {
          let { message, user } = response.data;
          dispatch(setUser({ user }));
          toast.success({ message });
          navigate("/profile");
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
          <div className="profile_pic_edit px-3 flex flex-col gap-2">
            <p className="text-sm font-bold">Edit Foto Profil</p>
            <div className="flex flex-row items-center gap-2">
              <div className="relative w-12 p-12">
                {user.avatar === null ? (
                  <img
                    className="absolute top-0 left-0 rounded-full object-cover w-full h-full"
                    src={`/images/${
                      user.gender === "Laki-laki"
                        ? "male-profile.png"
                        : "female-profile.png"
                    }`}
                    alt="post-picture"
                  />
                ) : (
                  <img
                    className="absolute top-0 left-0 rounded-full object-cover w-full h-full"
                    src={`${config.API_IMG_URL}/avatars/${user.avatar}`}
                    alt="post-picture"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-sm w-full"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <p className="text-xs">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, adipisci.
                </p>
              </div>
            </div>
          </div>
          <div className="cover_pic_edit px-3 flex flex-col gap-2">
            <p className="text-sm font-bold">Edit Foto Sampul</p>
            <div className="relative p-20">
              {user.cover === null ? (
                <img
                  className="absolute top-0 left-0 rounded-lg object-cover w-full h-full"
                  src={"/images/cover-default.jpg"}
                  alt="post-picture"
                />
              ) : (
                <img
                  className="absolute top-0 left-0 rounded-lg object-cover w-full h-full"
                  src={`${config.API_IMG_URL}/covers/${user.cover}`}
                  alt="post-picture"
                />
              )}
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Nama</span>
            </label>
            <input
              type="text"
              placeholder="Isikan namamu ..."
              className="input input-bordered w-full text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <span className="label-text font-bold">Username</span>
            </label>
            <input
              type="text"
              placeholder="Isikan username ..."
              className="input input-bordered w-full text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Nomor Telepon</span>
            </label>
            <input
              type="text"
              placeholder="Isikan nomor telepon ..."
              className="input input-bordered w-full text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Jenis Kelamin</span>
            </label>
            <div className="flex flex-row items-center gap-2">
              <div
                onClick={() => setGender("Laki-laki")}
                className={
                  gender === "Laki-laki"
                    ? "btn btn-sm btn-primary"
                    : "btn btn-sm"
                }
              >
                Laki-Laki
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
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Jurusan/Prodi</span>
            </label>
            <select
              className="select select-bordered w-full"
              onChange={(e) => setMajor(parseInt(e.target.value))}
              value={major !== null ? major : 0}
            >
              <option disabled value={0}>
                Pilih jurusan ...
              </option>
              {majors.length > 0 &&
                majors.map((maj) => {
                  return (
                    <option key={maj.id} value={maj.id}>
                      {maj.major}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Status</span>
            </label>
            <select
              value={status !== null ? status : 0}
              className="select select-bordered w-full"
              onChange={(e) => setStatus(parseInt(e.target.value))}
            >
              <option disabled value={0}>
                Pilih status ...
              </option>
              {statuses.length > 0 &&
                statuses.map((stat) => {
                  return (
                    <option key={stat.id} value={stat.id}>
                      {stat.status}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Angkatan</span>
            </label>
            <select
              value={year !== null ? year : 0}
              className="select select-bordered w-full"
              onChange={(e) => setYear(e.target.value)}
            >
              <option disabled value={0}>
                Pilih angkatan ...
              </option>
              <option value={"2015"}>2015</option>
              <option value={"2016"}>2016</option>
              <option value={"2017"}>2017</option>
              <option value={"2018"}>2018</option>
              <option value={"2019"}>2019</option>
              <option value={"2020"}>2015</option>
              <option value={"2021"}>2021</option>
              <option value={"2022"}>2022</option>
            </select>
          </div>
          <div className="form-control px-3 w-full">
            <label className="label">
              <span className="label-text font-bold">Bio</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={bio}
              placeholder="Tulis bio ..."
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="px-3 flex flex-row items-center gap-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleUpdateProfile()}
            >
              Simpan
            </button>
            <button className="btn btn-sm">Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
}
