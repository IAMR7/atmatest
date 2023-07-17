/* eslint-disable react/prop-types */
export default function ModalLikes({ like }) {
  return (
    <div id="modal_like" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box h-full">
        <div className="flex flex-row justify-between items-center">
          <p>Like ({like?.length})</p>
          <label
            htmlFor="modal_like"
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </label>
        </div>
        <div className="py-4 overflow-y-auto">
          <div className="like_list flex flex-col gap-6">
            {like?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="like flex flex-row justify-between items-center"
                >
                  <div className="flex flex-row items-center gap-4">
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
                      <p className="text-xs">Jumat, 9 Juni 2023 07.30 AM</p>
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
  );
}
