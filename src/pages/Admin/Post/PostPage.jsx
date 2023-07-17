import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { api } from "../../../api";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { useSelector } from "react-redux";

export default function PostPage() {
  const [posts, setPosts] = useState(null);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getPosts = async () => {
    let apipath = `posts`;
    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setPosts(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const deletePost = async (postId) => {
    let apipath = `admin/post/delete/${postId}`;
    return await api.delApi
      .delete(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          getPosts();
          toast.success(resp.message);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
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
              <h1 className="text-lg font-bold mb-4">Manajemen Postingan</h1>

              {/* START POST TABLE */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Pengguna</th>
                      <th>Postingan</th>
                      <th>Tanggal Dibuat</th>
                      <th>Tombol Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts !== null &&
                      posts.data.length > 0 &&
                      posts.data.map((post) => {
                        return (
                          <tr key={post.id}>
                            <td>
                              <p>{post.user.name}</p>
                            </td>
                            <td>
                              <p className="truncate w-52">{post.content}</p>
                            </td>
                            <td>
                              <p>{moment(post.created_at).format("LLLL")}</p>
                            </td>
                            <td>
                              <div className="flex flex-row gap-2 items-center">
                                <i className="bx bx-fw bx-info-circle text-primary"></i>
                                <i
                                  className="bx bx-fw bx-trash text-error"
                                  onClick={() => deletePost(post.id)}
                                ></i>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* END POST TABLE */}
            </div>
          </div>
          {/* END CONTENT */}
        </div>
      </div>
    </div>
  );
}
