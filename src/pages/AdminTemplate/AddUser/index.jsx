import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actAddUser } from "./slice";

export default function AddUser() {
const dispatch = useDispatch();
const navigate = useNavigate();

const { loading, error } = useSelector(
(state) => state.addUserReducer
);

const [user, setUser] = useState({
taiKhoan: "",
matKhau: "",
email: "",
soDt: "",
maNhom: "GP01",
maLoaiNguoiDung: "KhachHang",
hoTen: "",
});

const handleChange = (e) => {
const { name, value } = e.target;

```
setUser((prev) => ({
  ...prev,
  [name]: value,
}));
```

};

const handleAddUser = async (e) => {
e.preventDefault();

```
const result = await dispatch(actAddUser(user));

if (actAddUser.fulfilled.match(result)) {
  navigate("/admin/user");
}
```

};

return ( <div className="container-fluid py-4">

```
  <div className="card bg-dark border-secondary shadow-lg">

    <div className="card-header bg-black border-secondary">

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

        <div>
          <h2 className="fw-bold text-light mb-1">
            Add New User
          </h2>

          <p className="text-secondary mb-0">
            Create a new account and assign permissions.
          </p>
        </div>

        <Link
          to="/admin/user"
          className="btn btn-outline-light"
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back
        </Link>

      </div>

    </div>

    <div className="card-body">

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleAddUser}>

        <div className="row g-4">

          <div className="col-md-6">
            <label className="form-label text-light">
              Username
            </label>

            <input
              type="text"
              name="taiKhoan"
              value={user.taiKhoan}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              Password
            </label>

            <input
              type="password"
              name="matKhau"
              value={user.matKhau}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              Full Name
            </label>

            <input
              type="text"
              name="hoTen"
              value={user.hoTen}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              Phone Number
            </label>

            <input
              type="text"
              name="soDt"
              value={user.soDt}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-light">
              User Role
            </label>

            <select
              name="maLoaiNguoiDung"
              value={user.maLoaiNguoiDung}
              onChange={handleChange}
              className="form-select bg-dark text-light border-secondary"
            >
              <option value="KhachHang">
                Customer
              </option>

              <option value="QuanTri">
                Administrator
              </option>
            </select>
          </div>

          <div className="col-12">

            <button
              type="submit"
              disabled={loading}
              className="btn btn-danger w-100 py-3 fw-bold"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                  ></span>

                  Creating User...
                </>
              ) : (
                "Create User"
              )}
            </button>

          </div>

        </div>

      </form>

    </div>

  </div>

</div>
);
}
