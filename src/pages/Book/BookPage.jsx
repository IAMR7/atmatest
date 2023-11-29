import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { api } from "../../api";
import moment from "moment";

export default function BookPage() {
  const [books, setBooks] = useState();
  const [book, setBook] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = useSelector((state) => state.token);

  const apiheader = {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  };

  const getBooks = async () => {
    let apipath = `books`;

    return await api.getApi
      .get(apipath, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          setBooks(resp);
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const addBook = async () => {
    let apipath = `books`;
    let posData = {
      name: name,
      description: description,
    };
    return await api.postApi
      .post(apipath, posData, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          toast.success(`Successfuly added ${resp.name}`);
          document.getElementById("modal_add_book").close();
          getBooks();
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const updateBook = async (id) => {
    let apipath = `books/${id}`;
    let posData = {
      name: name,
      description: description,
    };
    return await api.putApi
      .put(apipath, posData, apiheader)
      .then((response) => {
        if (response.status === 200) {
          let resp = response.data;
          toast.success(`Successfuly updated ${resp.name}`);
          document.getElementById("modal_book").close();
          setClearBook();
          setBook();
          getBooks();
        }
      })
      .catch(() => {
        toast.error("Ada kesalahan teknis, silahkan coba lagi");
      });
  };

  const setDetailBook = (book) => {
    setName(book.name);
    setDescription(book.description);
  };

  const setClearBook = () => {
    setName("");
    setDescription("");
  };

  useEffect(() => {
    getBooks();
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
                  <i className="bx bx-fw bx-left-arrow-alt"></i> Open Menu
                </div>
              </label>
              <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="text-lg font-bold">BOOKS MANAGEMENT</h1>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    document.getElementById("modal_add_book").showModal();
                  }}
                >
                  Add Book
                </button>
              </div>

              {/* START BOOKS TABLE */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Description</th>
                      <th>Created at</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books &&
                      books.data.length > 0 &&
                      books.data.map((book, idx) => {
                        return (
                          <tr key={idx}>
                            <td>
                              <p className="font-bold">{book.name}</p>
                            </td>
                            <td>
                              <p>{book.description}</p>
                            </td>
                            <td>
                              <p>
                                {moment(book.created).format("DD MMM YYYY")}
                              </p>
                            </td>

                            <th>
                              <div className="flex flex-row gap-2 items-center">
                                <button
                                  onClick={() => {
                                    setDetailBook(book);
                                    setBook(book);
                                    document
                                      .getElementById("modal_book")
                                      .showModal();
                                  }}
                                  className="btn btn-sm btn-primary"
                                >
                                  Detail
                                </button>
                              </div>
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* END USERS TABLE */}
            </div>
          </div>
          {/* END CONTENT */}
        </div>
        {/* MODAL EDIT BOOK */}
        <dialog id="modal_book" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="flex flex-row justify-between items-center">
              <p>Edit Book</p>
              <label
                onClick={() => {
                  setClearBook();
                  setBook();
                  document.getElementById("modal_book").close();
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>
            <div className="flex flex-col gap-5 py-4 overflow-y-hidden">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Input name"
                  className="input border-slate-300 w-full text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>

                <textarea
                  placeholder="Input description"
                  className="input border-slate-300 w-full text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-row">
                <button
                  className="btn btn-sm btn-primary"
                  type="submit"
                  onClick={() => updateBook(book._id)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </dialog>
        {/* END MODAL EDIT USER */}

        {/* MODAL TAMBAH USER */}
        <dialog
          id="modal_add_book"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="flex flex-row justify-between items-center">
              <p>Add Book</p>
              <label
                onClick={() => {
                  document.getElementById("modal_add_book").close();
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>
            <div className="flex flex-col gap-5 py-4 overflow-y-hidden">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Input book name"
                  className="input border-slate-300 w-full text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  placeholder="Input description"
                  className="input border-slate-300 w-full text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-row">
                <button
                  className="btn btn-sm btn-primary"
                  type="submit"
                  onClick={() => addBook()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </dialog>
        {/* END MODAL TAMBAH USER */}
      </div>
    </div>
  );
}
