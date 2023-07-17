import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="page-content">
        <img src="/images/notfound.svg" alt="not-found" width={"100%"} />
        <div className="text-center">
          <h1 className="text-xl font-bold">OOPS!</h1>
          <p>Halaman yang dicari tidak ada</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>
            <i className="bx bx-left-arrow-alt"></i> Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
