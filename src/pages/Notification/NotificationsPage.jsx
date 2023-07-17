import { useSelector } from "react-redux";
import BottomNav from "../../components/bottomnav/BottomNav";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../api";
import { config } from "../../config";

export default function NotificationsPage() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [notifAccFriends, setNotifAccFriends] = useState([]);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getNotifAccFriends = async () => {
    let apipath = `friendships/pending/${user.id}`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setNotifAccFriends(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const accFriends = async (notif) => {
    let apipath = `friendship/${notif.id}`;
    let postdata = {
      user_id: notif.user.id,
      friend_user_id: notif.friend_user.id,
      status: "Diterima",
    };
    return await api.putApi
      .put(apipath, postdata, apiheader)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Berhasil menerima pertemanan");
          getNotifAccFriends();
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan refresh ulang");
      });
  };

  useEffect(() => {
    getNotifAccFriends();
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
        <p className="text-lg font-bold mb-4">
          Notifikasi ({notifAccFriends?.length})
        </p>
        <div className="mb-6">
          {notifAccFriends?.length > 0 ? (
            notifAccFriends.map((notif) => {
              return (
                <div
                  key={notif.id}
                  className="flex flex-row justify-between items-center border border-base-300 rounded-lg p-3"
                >
                  <div className="flex flex-row items-center gap-2">
                    {notif.user.avatar === null ? (
                      <img
                        width={36}
                        className="rounded-full m-2"
                        src={`/images/${
                          notif.user.gender === "Laki-laki"
                            ? "male-profile.png"
                            : "female-profile.png"
                        }`}
                        alt="profile-picture"
                      />
                    ) : (
                      <img
                        width={36}
                        className="rounded-full m-2"
                        src={`${config.API_IMG_URL}/avatars/${notif.user.avatar}`}
                        alt="profile-picture"
                      />
                    )}
                    <div className="flex flex-col">
                      <p className="font-medium">
                        {notif.user.name}{" "}
                        {notif.user.verified !== 0 && (
                          <i className="bx bx-fw bxs-badge-check text-success"></i>
                        )}
                      </p>
                      <p className="text-xs">Meminta pertemanan dengan anda</p>
                    </div>
                  </div>
                  {/* <i className="bx bx-fw bx-check text-primary"></i> */}
                  {/* <p className="text-sm">Terima</p> */}
                  <button
                    className="btn btn-sm"
                    onClick={() => accFriends(notif)}
                  >
                    Terima
                  </button>
                </div>
              );
            })
          ) : (
            <div className="mt-32 flex flex-col gap-3 tect-center items-center">
              <img src="images/noresult.svg" alt="" />
              <p className="text-xl font-bold">Tidak ada notifikasi baru</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
