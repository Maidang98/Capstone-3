import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actUpdateUser } from "./slice";
import api from "../../../services/api";

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAdmin = localStorage.getItem("USER_ADMIN");
  const token = userAdmin ? JSON.parse(userAdmin).accessToken : null;

  const { taiKhoan, id } = useParams();
  const accountToEdit = taiKhoan || id;

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "KhachHang",
    maNhom: "GP01",
  });

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!accountToEdit) return;

      try {
        const result = await api.post(
          `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountToEdit}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = result.data.content;

        setUser({
          taiKhoan: data.taiKhoan,
          matKhau: data.matKhau,
          hoTen: data.hoTen,
          email: data.email,
          soDT: data.soDT,
          maLoaiNguoiDung: data.maLoaiNguoiDung,
          maNhom: data.maNhom,
        });
      } catch (error) {
        console.error("Failed to load user details:", error);
        alert("Unable to load user information.");
      }
    };

    fetchUserDetail();
  }, [accountToEdit, token]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      taiKhoan: user.taiKhoan || accountToEdit,
      matKhau: user.matKhau,
      hoTen: user.hoTen,
      email: user.email,
      soDT: user.soDT,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      maNhom: "GP01",
    };

    if (!payload.matKhau) {
      alert("Password is required.");
      return;
    }

    const resultAction = await dispatch(
      actUpdateUser(payload)
    );

    if (actUpdateUser.fulfilled.match(resultAction)) {
      navigate("/admin/user");
    }
  };

  return (
    <div className="container py-4">
      <div className="card bg-dark text-light border-secondary shadow-lg">

        <div className="card-body p-4 p-lg-5">

          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

            <div>
              <h2 className="fw-bold mb-1">
                Update User Account
              </h2>

              <p className="text-secondary mb-0">
                Modify user information and access permissions.
              </p>
            </div>

            <Link
              to="/admin/user"
              className="btn btn-outline-light mt-3 mt-md-0"
            >
              <i className="fa-solid fa-arrow-left me-2"></i>
              Back to User List
            </Link>

          </div>

          {/* Form */}
          <form onSubmit={handleUpdate}>
            <div className="row g-4">

              {/* Username */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Username
                </label>

                <input
                  type="text"
                  name="taiKhoan"
                  value={user.taiKhoan}
                  disabled
                  className="form-control bg-secondary text-light border-secondary"
                />
              </div>

              {/* Password */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  name="matKhau"
                  value={user.matKhau}
                  onChange={handleOnChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Full Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="hoTen"
                  value={user.hoTen}
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>

              {/* Phone Number */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="soDT"
                  value={user.soDT}
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>

              {/* Role */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  User Role
                </label>

                <select
                  name="maLoaiNguoiDung"
                  value={user.maLoaiNguoiDung}
                  onChange={handleOnChange}
                  className="form-select"
                >
                  <option value="KhachHang">
                    Customer
                  </option>

                  <option value="QuanTri">
                    Administrator
                  </option>
                </select>
              </div>

              {/* Submit */}
              <div className="col-12 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                >
                  <i className="fa-solid fa-check me-2"></i>
                  Update User
                </button>
              </div>

            </div>
          </form>

        </div>

      </div>
    </div>
  );
}