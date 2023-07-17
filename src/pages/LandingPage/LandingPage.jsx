import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link
        className="btn btn-ghost border border-primary text-primary hover:bg-base-200 hover:border hover:border-primary"
        to={"/login"}
      >
        Login
      </Link>
    </div>
  );
}
