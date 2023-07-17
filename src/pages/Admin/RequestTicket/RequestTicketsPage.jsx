import { useEffect, useState } from "react";
import { api } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import moment from "moment/moment";
import { useSelector } from "react-redux";

export default function RequestTicketsPage() {
  const [tickets, setTickets] = useState(null);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getTickets = async () => {
    let apipath = `tickets`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setTickets(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
    getTickets();
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
              <h1 className="text-lg font-bold mb-4">Manajemen Ticketing</h1>

              {/* START REQUEST VERIFIED TABLE */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Pengguna</th>
                      <th>Judul</th>
                      <th>Pesan</th>
                      <th>Status</th>
                      <th>Tanggal Dibuat</th>
                      <th>Tombol Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets !== null &&
                      tickets.data.length > 0 &&
                      tickets.data.map((ticket) => {
                        return (
                          <tr key={ticket.id}>
                            <td>
                              <p>{ticket.user.name}</p>
                            </td>
                            <td>
                              <p>{ticket.title}</p>
                            </td>
                            <td>
                              <p>{ticket.message}</p>
                            </td>
                            <td>
                              <p className="badge badge-ghost text-xs rounded-full">
                                {ticket.status}
                              </p>
                            </td>
                            <td>
                              <p>{moment(ticket.created_at).format("LLLL")}</p>
                            </td>
                            <td>
                              <div className="flex flex-row gap-2 items-center">
                                <div className="btn btn-sm btn-primary text-base-100">
                                  Baca
                                </div>
                                <div className="btn btn-sm btn-error text-base-100">
                                  Hapus
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* END REQUEST VERIFIED TABLE */}
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    </div>
  );
}
