import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import BottomNav from "../../components/bottomnav/BottomNav";

export default function HomePage() {
  const user = useSelector((state) => state.user);

  const [posts, setPosts] = useState();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [likeFromMe, setLikeFromMe] = useState();
  const inputFileRef = useRef(null);
  const token = useSelector((state) => state.token);
  const apiheader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getAllPosts = async () => {
    let apipath = `posts/all/${user.id}`;
    try {
      const response = await api.getApi.get(apipath, apiheader);
      if (response.status === 200) {
        let resp = response.data;
        let getlike = resp.map((post) => {
          return post.like.find((me) => {
            return me.user.id === user.id;
          });
        });
        setLikeFromMe(getlike);
        setPosts(resp);
      }
    } catch (error) {
      toast.error("Ada kesalahan teknis, silahkan coba lagi");
      console.log(error);
    }
  };

  const addPost = async () => {
    let apipath = `post`;
    let formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("content", content);
    formData.append("image", image);

    return await api.postFileApi
      .post(apipath, formData, apiheader)
      .then((response) => {
        if (response.status === 201) {
          let resp = response.data;
          setContent("");
          setImage(null);
          toast.success(resp.message);
          getAllPosts();
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  useEffect(() => {
    getAllPosts();
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
      <section className="min-h-screen mt-16 xl:px-72 lg:px-64 px-4 py-6 w-full mb-72">
        <div className="px-0 xl:px-60 min-h-screen rounded-xl">
          <p className="text-lg mb-6">
            Selamat datang, <span className="font-bold">{user.name}</span>
          </p>
          <div className="w-full mb-6">
            <textarea
              placeholder="Tulis sesuatu untuk diceritakan ..."
              className="textarea textarea-bordered textarea-md w-full font-sm"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <div className="flex justify-between items-center">
              <button
                className="btn btn-sm"
                onClick={() => inputFileRef.current.click()}
              >
                Upload Gambar
              </button>
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <button
                className="btn btn-sm btn-primary"
                onClick={() => addPost()}
              >
                Posting
              </button>
            </div>
          </div>
          {image !== null && (
            <div className="indicator">
              <span
                className="indicator-item rounded-full pl-1 bg-primary-content"
                onClick={() => setImage(null)}
              >
                <i className="bx bx-fw bx-x text-primary"></i>
              </span>
              <img
                className="rounded-md mb-5"
                width={100}
                height={100}
                src={URL.createObjectURL(image)}
                alt="profile-picture"
              />
            </div>
          )}
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
                    getAllPosts={getAllPosts}
                  />
                );
              })
            ) : (
              <h1>Tunggu sebentar ...</h1>
            )}
          </div>
        </div>
      </section>
      <BottomNav />
    </div>
  );
}
