import Navbar from "../../components/navbar/Navbar";
import BottomNav from "../../components/bottomnav/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import { config } from "../../config";
import Post from "../../components/post/Post";
import { useSelector } from "react-redux";

export default function FriendPage() {
  let id = useParams();
  let parse = parseInt(id.id);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [countLikes, setCountLikes] = useState(0);
  const [likeFromMe, setLikeFromMe] = useState();
  const [checkMe, setCheckMe] = useState();
  const [checkMeforDelete, setCheckMeForDelete] = useState();
  const userRedux = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getUser = async () => {
    let apipath = `user/${parseInt(parse)}`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setUser(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const getFriends = useCallback(async () => {
    let apipath = `friendships/${parseInt(parse)}`;
    try {
      const response = await api.getApi.get(apipath, apiheader);
      if (response.status === 200) {
        let resp = response.data;
        let friends = [];
        let checkme = [];
        resp.map((friend) => {
          if (friend.user.id !== parse) {
            friends.push(friend.user);
          } else {
            friends.push(friend.friend_user);
          }
          //check saya
          if (friend.user.id === userRedux.id) {
            checkme.push(friend);
          }
        });
        setFriends(friends);
        let check = friends.find((me) => {
          return me.id === userRedux.id;
        });
        setCheckMe(check);
        setCheckMeForDelete(checkme[0]);
      }
    } catch {
      toast.error("Ada kesalahan teknis, silahkan refresh ulang");
    }
  }, []);

  const addFriend = async () => {
    let apipath = `friendship`;
    let postData = {
      user_id: userRedux.id,
      friend_user_id: parseInt(parse),
      status: "Menunggu Konfirmasi",
    };
    return await api.postApi
      .post(apipath, postData, apiheader)
      .then((response) => {
        if (response.status === 201) {
          getFriends();
          getUser();
          getPosts();
          toast.success("Permintaan pertemanan terkirim, menunggu konfirmasi");
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const deleteFriend = async (friendshipId) => {
    let apipath = `friendship/${friendshipId}`;
    try {
      const response = await api.delApi.delete(apipath, apiheader);
      if (response.status === 200) {
        let resp = response.data;
        toast.success(resp.message);
        getFriends();
        getUser();
        getPosts();
      }
    } catch {
      toast.error("Ada kesalahan teknis, silahkan refresh ulang");
    }
  };

  const getPosts = async () => {
    let apipath = `posts/${parseInt(parse)}`;
    try {
      const response = await api.getApi.get(apipath, apiheader);
      if (response.status === 200) {
        let resp = response.data;
        let getlike = resp.map((post) => {
          return post.like.find((me) => {
            return me.user.id === userRedux.id;
          });
        });
        let countlike = resp.reduce(
          (total, post) => total + post.like.length,
          0
        );
        setPosts(resp);
        setLikeFromMe(getlike);
        setCountLikes(countlike);
      }
    } catch {
      toast.error("Ada kesalahan teknis, silahkan refresh ulang");
    }
  };

  useEffect(() => {
    getFriends();
    getUser();
    getPosts();
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
      <div className="min-h-screen mt-16 xl:px-72 lg:px-64 px-4 py-6 w-full mb-32">
        <div
          className="flex flex-row items-center gap-2 mb-4 text-base-content"
          onClick={() => navigate(-1)}
        >
          <i className="bx bx-sm bx-left-arrow-alt"></i>
          <p className="font-semibold">Kembali</p>
        </div>
        <div className="border border-base-300 rounded-lg p-1">
          <div className="cover_profile h-40 w-full relative">
            {user?.cover === null ? (
              <img
                className="absolute top-0 left-0 rounded-lg object-cover w-full h-full"
                src={"/images/cover-default.jpg"}
                alt="post-picture"
              />
            ) : (
              <img
                className="absolute top-0 left-0 rounded-lg object-cover w-full h-full"
                src={`${config.API_IMG_URL}covers/${user?.cover}`}
                alt="post-picture"
              />
            )}

            <div className="pic_profile absolute -bottom-10 left-3 z-0">
              {user?.avatar === null ? (
                <img
                  className="rounded-full"
                  width={100}
                  height={100}
                  src={`/images/${
                    user?.gender === "Laki-laki"
                      ? "male-profile.png"
                      : "female-profile.png"
                  }`}
                  alt="profile-picture"
                />
              ) : (
                <img
                  width={100}
                  height={100}
                  className="rounded-full"
                  src={`${config.API_IMG_URL}avatars/${user?.avatar}`}
                  alt="profile-picture"
                />
              )}
            </div>
          </div>
          <div className="mt-12 px-3 py-2">
            <div className="head-profile">
              <h1 className="font-bold text-md">
                {user?.name?.toUpperCase()}{" "}
                {user?.verified !== 0 && (
                  <i className="bx bx-fw bxs-badge-check text-success"></i>
                )}
              </h1>
              <p className="text-xs">
                {user?.status_id !== null && user?.status?.status}{" "}
                {user?.major_id !== null && user?.major?.major}
                {user?.major_id !== null &&
                  (user?.status?.status === "Mahasiswa" ||
                    user?.status?.status === "Alumni") &&
                  ` (${user?.year_generation})`}
              </p>
              <div className="flex flex-row justify-start items-center gap-2 mt-2">
                <p className="text-xs">
                  <span className="font-bold">Teman:</span> {friends?.length}
                </p>
                <p className="text-xs">
                  <span className="font-bold">Postingan:</span> {posts?.length}
                </p>
                <p className="text-xs">
                  <span className="font-bold">Disukai:</span> {countLikes}
                </p>
              </div>
              <p className="text-xs mt-2">
                <span className="font-bold">Bio:</span> {user?.bio}
              </p>
              <div className="flex flex-row items-center gap-1 mt-2">
                {checkMe ? (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => deleteFriend(checkMeforDelete.id)}
                  >
                    Berteman <i className="bx bx-xs bx-check"></i>
                  </button>
                ) : (
                  <button className="btn btn-sm" onClick={() => addFriend()}>
                    Tambah Teman
                  </button>
                )}
                <button
                  className="btn btn-sm"
                  onClick={() => window.modal_friends.showModal()}
                >
                  Daftar Teman
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content lg:px-40 mt-4">
          <div className="list-post flex flex-col gap-3">
            {posts ? (
              posts.map((post, index) => {
                return (
                  <Post
                    key={post.id}
                    postId={post.id}
                    user={post.user}
                    comment={post.comment}
                    like={post.like}
                    image={post.image}
                    content={post.content}
                    date={post.created_at}
                    likeFromMe={likeFromMe[index]}
                    getPosts={getPosts}
                  />
                );
              })
            ) : (
              <h1>Tunggu sebentar ...</h1>
            )}
          </div>
        </div>
        {/* start modal friends */}
        <dialog
          id="modal_friends"
          className="modal modal-bottom sm:modal-middle"
        >
          <form method="dialog" className="modal-box h-full">
            <div className="flex flex-row justify-between items-center">
              <p>Total Teman ({friends?.length})</p>
              <button
                htmlFor="modal_friends"
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>
            <div className="form-control mt-3">
              <input
                type="text"
                placeholder="Cari teman/saudara ..."
                className="input input-bordered w-full h-12 text-sm"
              />
            </div>
            <div className="py-4 overflow-y-auto flex flex-col gap-4">
              {friends?.map((friend) => {
                return (
                  <div key={friend.id} className="py-1">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center">
                        {friend.avatar === null ? (
                          <img
                            width={36}
                            height={36}
                            className="rounded-full m-2"
                            src={`/images/${
                              friend.gender === "Laki-laki"
                                ? "male-profile.png"
                                : "female-profile.png"
                            }`}
                            alt="profile-picture"
                          />
                        ) : (
                          <img
                            width={36}
                            height={36}
                            className="rounded-full m-2"
                            src={`/images/${"female-profile.png"}`}
                            alt="profile-picture"
                          />
                        )}
                        <div className="flex flex-col">
                          <p className="font-medium">
                            {friend.name}{" "}
                            {friend.verified === 1 && (
                              <i className="bx bx-fw bxs-badge-check text-success"></i>
                            )}
                          </p>
                          <p className="text-xs">
                            {friend.status_id !== null && friend.status.status}{" "}
                            {friend.major_id !== null && friend.major.major}
                            {friend.major_id !== null &&
                              (friend.status.status === "Mahasiswa" ||
                                friend.status.status === "Alumni") &&
                              ` (${friend.year_generation})`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </dialog>
        {/* end modal friends */}
      </div>
      <BottomNav />
    </div>
  );
}
