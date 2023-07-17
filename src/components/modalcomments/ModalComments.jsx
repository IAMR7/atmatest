import { useState } from "react";

/* eslint-disable react/prop-types */
export default function ModalComments({ comment, commentPostId }) {
  const [writeComment, setWriteComment] = useState("");
  const sayHi = async () => {
    console.log(commentPostId);
  };
  return (
    <div id="modal_comment" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box h-full">
        <div className="flex flex-row justify-between items-center">
          <p>Komentar ({comment?.length})</p>
          <label
            htmlFor="modal_comment"
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </label>
        </div>
        <div className="py-4 overflow-y-auto">
          <div className="w-full">
            <textarea
              placeholder="Tulis komentar ..."
              className="textarea textarea-bordered textarea-md w-full font-sm"
            ></textarea>
            <div className="flex justify-between items-center">
              <button className="btn btn-sm">Upload Gambar</button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => sayHi()}
              >
                Komentar
              </button>
            </div>
          </div>
          <div className="divider text-base-300 mt-6 h-1 text-sm">Komentar</div>
          <div className="comment_list flex flex-col gap-6">
            {comment?.length > 0 ? (
              comment?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="comment flex flex-row items-center gap-4"
                  >
                    <div className="w-10 avatar online">
                      {item.user.avatar === null ? (
                        <img
                          tabIndex={0}
                          className="rounded-full m-2"
                          src={`/images/${
                            item.user.gender === "Pria"
                              ? "male-profile.png"
                              : "female-profile.png"
                          }`}
                          alt="profile-picture"
                        />
                      ) : (
                        <img
                          tabIndex={0}
                          className="rounded-full m-2"
                          src={`/images/${"female-profile.png"}`}
                          alt="profile-picture"
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-sm">{item.user.name}</p>
                      <p className="text-xs">{item.content}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Tunggu sebentar ...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
