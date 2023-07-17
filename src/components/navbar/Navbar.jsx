import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { config } from "../../config";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(clearUser());
  };

  return (
    <div className="navbar bg-base-100 px-6 border-b border-base-300 fixed z-20 top-0">
      <div className="navbar-start gap-4">
        <Link to={user.role.level === 1 ? "/admin/dashboard" : "/home"}>
          <div className="flex flex-row items-center gap-1">
            <img
              className="w-28"
              src={"/images/text-studentgram.png"}
              alt="logo"
            />
          </div>
        </Link>
      </div>

      <div className="navbar-end gap-4">
        <div className="dropdown dropdown-end">
          {user.avatar === null ? (
            <img
              width={36}
              tabIndex={0}
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
              tabIndex={0}
              className="rounded-full m-2"
              src={`${config.API_IMG_URL}/avatars/${user.avatar}`}
              alt="profile-picture"
            />
          )}

          {user.role.level === 1 ? (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profil Admin</Link>
              </li>
              <li>
                <Link to="/profile/edit">Edit Profil</Link>
              </li>
              <li>
                <Link to="/password/edit">Edit Password</Link>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profil Saya</Link>
              </li>
              <li>
                <Link to="/profile/edit">Edit Profil</Link>
              </li>
              <li>
                <Link to="/password/edit">Edit Password</Link>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
