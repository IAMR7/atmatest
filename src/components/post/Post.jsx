/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { api } from "../../api";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

export default function Post({
  postId,
  user,
  comment,
  like,
  content,
  image,
  date,
  likeFromMe,
  getPosts,
  getAllPosts,
  sayHello,
}) {
  const [writeComment, setWriteComment] = useState("");
  const [editContent, setEditContent] = useState(content);
  const userRedux = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const deletePost = async (postId) => {
    let apipath = `post/${postId}`;
    return await api.delApi
      .delete(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;

          if (typeof getPosts === "function") {
            getPosts();
          } else if (typeof getAllPosts === "function") {
            getAllPosts();
          }
          toast.success(resp.message);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const UpdatePost = async (idpost) => {
    let apipath = `post/${idpost}`;
    let postdata = {
      user_id: user.id,
      content: editContent,
      image: image,
    };
    return await api.putApi
      .put(apipath, postdata, apiheader)
      .then((response) => {
        if (response.status === 201) {
          let resp = response.data;
          if (typeof getPosts === "function") {
            getPosts();
          } else if (typeof getAllPosts === "function") {
            getAllPosts();
          }
          toast.success(resp.message);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const likePost = async (idpost) => {
    let apipath = `like`;
    let postdata = {
      user_id: userRedux.id,
      post_id: idpost,
    };
    try {
      const response = await api.postApi.post(apipath, postdata, apiheader);
      if (response.status === 201) {
        if (typeof getPosts === "function") {
          getPosts();
        } else if (typeof getAllPosts === "function") {
          getAllPosts();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Ada kesalahan teknis, silahkan coba lagi");
    }
  };

  const unlikePost = async (likeId) => {
    let apipath = `like/${likeId}`;
    try {
      const response = await api.delApi.delete(apipath, apiheader);
      if (response.status === 200) {
        if (typeof getPosts === "function") {
          getPosts();
        } else if (typeof getAllPosts === "function") {
          getAllPosts();
        }
      }
    } catch (error) {
      toast.error("Ada kesalahan teknis, silahkan coba lagi");
    }
  };

  const addComment = async (id) => {
    let apipath = `comment`;
    let postdata = {
      user_id: userRedux.id,
      post_id: id,
      content: writeComment,
      image: null,
    };
    return await api.postApi
      .post(apipath, postdata, apiheader)
      .then((response) => {
        if (response.status === 201) {
          let resp = response.data;
          if (typeof getPosts === "function") {
            getPosts();
          } else if (typeof getAllPosts === "function") {
            getAllPosts();
          }
          toast.success(resp.message);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const updateComment = async (commentId) => {
    let apipath = `comment/${commentId}`;
    let postdata = {
      user_id: userRedux.id,
      post_id: postId,
      content: writeComment,
      image: null,
    };
    return await api.putApi
      .put(apipath, postdata, apiheader)
      .then((response) => {
        if (response.status === 201) {
          let resp = response.data;
          if (typeof getPosts === "function") {
            getPosts();
          } else if (typeof getAllPosts === "function") {
            getAllPosts();
          }
          toast.success(resp.message);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const deleteComment = async (commentId) => {
    let apipath = `comment/${commentId}`;
    return await api.delApi
      .delete(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          if (typeof getPosts === "function") {
            getPosts();
          } else if (typeof getAllPosts === "function") {
            getAllPosts();
          }
          toast.success(resp.message);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  return (
    <div className="post rounded-lg border border-base-300 p-1">
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
      <div className="flex flex-row justify-between items-center">
        <div className="post_head py-1">
          <div className="flex flex-row items-center">
            {user.avatar === null ? (
              <img
                width={36}
                height={36}
                className="rounded-full m-2"
                src={`/images/${
                  user.gender === "Laki-laki"
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
                src={`${config.API_IMG_URL}/avatars/${user.avatar}`}
                alt="profile-picture"
              />
            )}

            <div className="flex flex-col">
              <p
                className="font-medium"
                onClick={() =>
                  navigate(
                    user.id !== userRedux.id ? `/friend/${user.id}` : `/profile`
                  )
                }
              >
                {user.name}{" "}
                {user.verified !== 0 && (
                  <i className="bx bx-fw bxs-badge-check text-success"></i>
                )}
              </p>
              <p className="text-xs">
                {user.status_id !== null && user.status.status}{" "}
                {user.major_id !== null && user.major.major}
                {user.major_id !== null &&
                  (user.status.status === "Mahasiswa" ||
                    user.status.status === "Alumni") &&
                  ` (${user.year_generation})`}
              </p>
            </div>
          </div>
        </div>
        {user.id === userRedux.id && (
          <div className="dropdown dropdown-end z-10">
            <i className="bx bx-fw bx-dots-vertical-rounded" tabIndex={0}></i>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-32"
            >
              <li>
                <label className="text-xs" htmlFor={`edit_post_${postId}`}>
                  Edit
                </label>
              </li>
              <li>
                <a
                  className="text-xs text-error"
                  onClick={() => deletePost(postId)}
                >
                  Hapus
                </a>
              </li>
            </ul>
          </div>
        )}
        <input
          type="checkbox"
          id={`edit_post_${postId}`}
          className="modal-toggle"
          onChange={(e) =>
            e.target.checked === true
              ? setEditContent(content)
              : setEditContent("")
          }
        />

        {/* MODAL EDIT POST */}
        <div
          id={`edit_post_${postId}`}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="flex flex-row justify-between items-center">
              <p>Edit Caption Postingan</p>
              <label
                htmlFor={`edit_post_${postId}`}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>
            <div className="py-4 overflow-y-hidden">
              <div className="w-full">
                <textarea
                  placeholder="Tulis sesuatu untuk diceritakan ..."
                  className="textarea textarea-bordered textarea-md w-full font-sm"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end items-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      UpdatePost(postId);
                      setEditContent("");
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END MODAL EDIT POST */}
      </div>
      {image !== null ? (
        <div className="relative w-full h-0" style={{ paddingBottom: "100%" }}>
          <img
            className="absolute z-0 top-0 left-0 rounded-lg object-cover w-full h-full"
            src={`${config.API_IMG_URL}/posts/${image}`}
            alt="post-picture"
          />
        </div>
      ) : (
        <p className="px-3 text-sm font-semibold" onClick={() => sayHello()}>
          {content}
        </p>
      )}
      <div className="px-3 py-2">
        <div className="flex flex-row items-center gap-1 py-2">
          <div
            onClick={() =>
              likeFromMe ? unlikePost(likeFromMe.id) : likePost(postId)
            }
            className={likeFromMe ? "btn btn-sm btn-primary" : "btn btn-sm"}
          >
            <i className="bx bx-sm bxs-heart-circle"></i>
            {like.length}
          </div>
          <label
            htmlFor={`modal_comment_post_${postId}`}
            className="btn btn-sm"
          >
            <i className="bx bx-sm bx-message-square-dots"></i>
            {comment.length}
          </label>
        </div>
        {like.length > 0 && (
          <p className="text-xs mb-4">
            {like.length} orang menyukai ini.{" "}
            <label htmlFor={`modal_like_post_${postId}`}>
              <span className="text-primary">Lihat disini</span>
            </label>
          </p>
        )}
        {image !== null && <p className="text-sm">{content}</p>}
        <p className="text-xs italic mt-4">
          {moment(date).fromNow()} <br />
          {moment(date).format("LLLL")}
        </p>
      </div>

      <input
        type="checkbox"
        id={`modal_comment_post_${postId}`}
        className="modal-toggle"
      />

      {/* MODAL COMMENTS */}
      <div
        id={`modal_comment_post_${postId}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box h-full">
          <div className="flex flex-row justify-between items-center">
            <p>Komentar ({comment.length})</p>
            <label
              htmlFor={`modal_comment_post_${postId}`}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>
          <div className="py-4 overflow-y-hidden h-full">
            <div className="w-full">
              <textarea
                placeholder="Tulis komentar ..."
                className="textarea textarea-bordered textarea-md w-full font-sm"
                onChange={(e) => setWriteComment(e.target.value)}
                value={writeComment}
              ></textarea>
              <div className="flex justify-end items-center">
                {/* <button className="btn btn-sm">Upload Gambar</button> */}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    addComment(postId);
                    setWriteComment("");
                  }}
                >
                  Komentar
                </button>
              </div>
            </div>
            <div className="divider text-base-300 mt-6 h-1 text-sm">
              Komentar
            </div>
            <div className="comment_list flex flex-col gap-6">
              {comment.length > 0 ? (
                comment.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex flex-row justify-between items-center"
                    >
                      <div className="flex flex-row items-center">
                        {item.user.avatar === null ? (
                          <img
                            width={36}
                            className="rounded-full m-2"
                            src={`/images/${
                              item.user.gender === "Laki-laki"
                                ? "male-profile.png"
                                : "female-profile.png"
                            }`}
                            alt="profile-picture"
                          />
                        ) : (
                          <img
                            width={36}
                            className="rounded-full m-2"
                            src={`${config.API_IMG_URL}/avatars/${userRedux.avatar}`}
                            alt="profile-picture"
                          />
                        )}
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">
                            {item.user.name}{" "}
                            {item.user.verified === 1 && (
                              <i className="bx bx-fw bxs-badge-check text-success"></i>
                            )}
                          </p>
                          <p className="text-xs">{item.content}</p>
                        </div>
                      </div>
                      {item.user.id === userRedux.id && (
                        <div className="dropdown dropdown-end">
                          <i
                            className="bx bx-fw bx-dots-vertical-rounded"
                            tabIndex={0}
                          ></i>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-1 shadow bg-base-100 z-50 rounded-box w-32"
                          >
                            <li>
                              <label
                                className="text-xs"
                                htmlFor={`edit_comment_${item.id}`}
                              >
                                Edit
                              </label>
                            </li>

                            <li>
                              <a
                                className="text-xs text-error"
                                onClick={() => deleteComment(item.id)}
                              >
                                Hapus
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                      <input
                        type="checkbox"
                        id={`edit_comment_${item.id}`}
                        className="modal-toggle"
                        onChange={(e) =>
                          e.target.checked === true
                            ? setWriteComment(item.content)
                            : setWriteComment("")
                        }
                      />

                      {/* MODAL EDIT COMMENTS */}
                      <div
                        id={`edit_comment_${item.id}`}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <div className="flex flex-row justify-between items-center">
                            <p>Edit Komentar</p>
                            <label
                              htmlFor={`edit_comment_${item.id}`}
                              className="btn btn-sm btn-circle btn-ghost"
                            >
                              ✕
                            </label>
                          </div>
                          <div className="py-4 overflow-y-hidden">
                            <div className="w-full">
                              <textarea
                                placeholder="Tulis sesuatu untuk diceritakan ..."
                                className="textarea textarea-bordered textarea-md w-full font-sm"
                                value={writeComment}
                                onChange={(e) =>
                                  setWriteComment(e.target.value)
                                }
                              ></textarea>
                              <div className="flex justify-end items-center">
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => {
                                    updateComment(item.id);
                                    setWriteComment("");
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* END MODAL EDIT COMMENTS */}
                    </div>
                  );
                })
              ) : (
                <h1>Tidak ada komentar</h1>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* END MODAL COMMENTS */}
      <input
        type="checkbox"
        id={`modal_like_post_${postId}`}
        className="modal-toggle"
      />

      {/* MODAL LIKES */}
      <div
        id={`modal_like_post_${postId}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box h-full">
          <div className="flex flex-row justify-between items-center">
            <p>Like ({like?.length})</p>
            <label
              htmlFor={`modal_like_post_${postId}`}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>
          <div className="py-4 overflow-y-auto">
            <div className="like_list flex flex-col gap-6">
              {like.length > 0 &&
                like.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="like flex flex-row justify-between items-center"
                    >
                      <div className="flex flex-row items-center">
                        {item.user.avatar === null ? (
                          <img
                            width={40}
                            tabIndex={0}
                            className="rounded-full m-2"
                            src={`/images/${
                              item.user.gender === "Laki-laki"
                                ? "male-profile.png"
                                : "female-profile.png"
                            }`}
                            alt="profile-picture"
                          />
                        ) : (
                          <img
                            width={40}
                            tabIndex={0}
                            className="rounded-full m-2"
                            src={`${config.API_IMG_URL}/avatars/${userRedux.avatar}`}
                            alt="profile-picture"
                          />
                        )}
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">
                            {item.user.name}{" "}
                            {item.user.verified === 1 && (
                              <i className="bx bx-fw bxs-badge-check text-success"></i>
                            )}
                          </p>
                          <p className="text-xs">
                            {moment(item.created_at).format("LLLL")}
                          </p>
                        </div>
                      </div>
                      <i className="bx bx-fw bxs-heart text-primary"></i>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {/* END MODAL LIKES */}
    </div>
  );
}
