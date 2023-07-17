import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

export default function TicketPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const addTicket = async () => {
    let apipath = `ticket/add`;
    let postData = {
      title: title,
      message: message,
      status: "Pending",
      user_id: user.id,
    };
    return await api.postApi
      .post(apipath, postData, apiheader)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Pesan berhasil terkirim, terimakasih atas laporannya");
          setTitle("");
          setMessage("");
        } else {
          toast.error("Terjadi kesalahan, coba ulangi");
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan refresh ulang");
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
        <div>
          <div
            className="flex flex-row items-center gap-2 mb-4 text-base-content"
            onClick={() => navigate(-1)}
          >
            <i className="bx bx-sm bx-left-arrow-alt"></i>
            <p className="font-semibold">Kembali</p>
          </div>
          <div className="flex flex-col gap-4 mb-32 form-control w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Judul Pesan</span>
              </label>
              <input
                type="text"
                placeholder="Tuliskan judul pesan"
                className="input input-bordered w-full text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Pesan untuk Admin</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                value={message}
                placeholder="Tulis pesan"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-row items-center justify-end gap-3">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => addTicket()}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
