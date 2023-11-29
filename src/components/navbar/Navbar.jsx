import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";

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
        <div className="flex flex-row items-center gap-1">
          <p className="text-xl font-bold">Atmatest</p>
        </div>
      </div>

      <div className="navbar-end gap-4">
        <div className="dropdown dropdown-end">
          {/* <img
            width={36}
            tabIndex={0}
            className="rounded-full m-2"
            src={`/images/male-profile.png`}
            alt="profile-picture"
          /> */}
          <p tabIndex={0}>
            Hello, {user.username} <i className="bx bx-fw bx-chevron-down"></i>
          </p>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <a onClick={() => handleLogout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
