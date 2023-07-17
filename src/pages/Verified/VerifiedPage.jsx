import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api";

export default function VerifiedPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [note, setNote] = useState("");
  const [check, setCheck] = useState([]);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const checkUser = async () => {
    let apipath = `request/verified/user/${user.id}`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setCheck(resp);
        } else {
          toast.error("Terjadi kesalahan, coba ulangi");
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan refresh ulang");
      });
  };

  const handleRequestVerified = async () => {
    let apipath = `request/verified/add`;
    let formData = new FormData();
    formData.append("image", image);
    formData.append("note", note);
    formData.append("user_id", user.id);
    return await api.postFileApi
      .post(apipath, formData, apiheader)
      .then((response) => {
        if (response.status === 201) {
          let resp = response.data;
          setImage(null);
          setNote("");
          toast.success(resp.message);
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
    checkUser();
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
        {check.length > 0 ? (
          <div className="flex flex-col gap-3 text-center items-center mt-12">
            <img src="images/noresult.svg" alt="" />
            <h1 className="text-xl font-bold text-neutral">
              Permintaanmu akan segera diproses oleh Admin, Silahkan ditunggu
            </h1>
            <a onClick={() => navigate(-1)} className="btn btn-primary">
              <i className="bx bx-sm bx-left-arrow-alt"></i>
              Kembali
            </a>
          </div>
        ) : (
          <div>
            <div
              className="flex flex-row items-center gap-2 mb-4 text-base-content"
              onClick={() => navigate(-1)}
            >
              <i className="bx bx-sm bx-left-arrow-alt"></i>
              <p className="font-semibold">Kembali</p>
            </div>
            <div className="flex flex-col gap-4 mb-32 form-control w-full">
              <div className="flex flex-col gap-2">
                <label className="label">
                  <span className="label-text font-bold">
                    Upload Foto Dokumen
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-sm w-full"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <p className="text-xs">
                  Silahkan upload foto yang menyatakan bahwa &quot;ini adalah
                  saya&quot;. Contohnya bisa berupa foto KTM atau bisa tanda
                  bukti lain jika sebagai alumni/dosen/staff dll.
                </p>
                {image !== null && (
                  <div className="indicator mt-5 w-1/2">
                    <span
                      className="indicator-item rounded-full pl-1 bg-primary-content"
                      onClick={() => setImage(null)}
                    >
                      <i className="bx bx-fw bx-x text-primary"></i>
                    </span>
                    <img
                      className="rounded-md w-full"
                      src={URL.createObjectURL(image)}
                      alt="photo-document"
                    />
                  </div>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Catatan</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Tulis catatan"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-row items-center justify-end gap-3">
                <button className="btn btn-sm">Batal</button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleRequestVerified()}
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
