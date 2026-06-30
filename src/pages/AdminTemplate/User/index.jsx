import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUsers, actDeleteUser } from "./slice";
import { Link } from "react-router-dom";
import SearchBar from "../_components/SearchBar";

export default function UserManager() {
  const dispatch = useDispatch();

  const { listUser, loading } = useSelector(
    (state) => state.userReducer || {
      listUser: [],
    }
  );

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(actFetchUsers());
  }, [dispatch]);

  const handleDelete = (taiKhoan) => {
    if (
      window.confirm(
        `Are you sure you want to delete user "${taiKhoan}"?`
      )
    ) {
      dispatch(actDeleteUser(taiKhoan));
    }
  };

  const filteredUsers = listUser?.filter((user) => {
    const searchValue = keyword.toLowerCase().trim();

    return (
      user.taiKhoan.toLowerCase().includes(searchValue) ||
      user.hoTen.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            User Management
          </h2>

          <p className="text-muted mb-0">
            Manage user accounts and system permissions.
          </p>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <SearchBar
            onSearch={(value) =>
              setKeyword(value)
            }
          />
        </div>

        <Link
          to="/admin/user/add-user"
          className="btn btn-danger"
        >
          <i className="fa-solid fa-user-plus me-2"></i>
          Add User
        </Link>

      </div>

      {/* Content */}
      <div className="card border-0 shadow">

        <div className="card-body p-0">

          {loading ? (
            <div className="text-center py-5">

              <div
                className="spinner-border text-danger"
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>

              <p className="mt-3 text-muted">
                Loading user data...
              </p>

            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="table-responsive d-none d-lg-block">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-dark">
                    <tr>
                      <th>Username</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th>User Role</th>
                      <th className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers?.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.taiKhoan}>

                          <td>
                            <strong>
                              {user.taiKhoan}
                            </strong>
                          </td>

                          <td>
                            {user.hoTen}
                          </td>

                          <td>
                            {user.email}
                          </td>

                          <td>
                            {user.soDT}
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                user.maLoaiNguoiDung ===
                                "QuanTri"
                                  ? "bg-primary"
                                  : "bg-secondary"
                              }`}
                            >
                              {user.maLoaiNguoiDung ===
                              "QuanTri"
                                ? "Administrator"
                                : "Customer"}
                            </span>
                          </td>

                          <td className="text-center">

                            <Link
                              to={`/admin/user/edit/${user.taiKhoan}`}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(
                                  user.taiKhoan
                                )
                              }
                              className="btn btn-sm btn-outline-danger"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>

                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-muted"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>

              </div>

              {/* Mobile Cards */}
              <div className="d-lg-none p-3">

                {filteredUsers?.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.taiKhoan}
                      className="card mb-3 shadow-sm"
                    >
                      <div className="card-body">

                        <div className="d-flex justify-content-between align-items-start mb-3">

                          <div>
                            <h6 className="fw-bold mb-1">
                              {user.taiKhoan}
                            </h6>

                            <p className="mb-0 text-muted">
                              {user.hoTen}
                            </p>
                          </div>

                          <span
                            className={`badge ${
                              user.maLoaiNguoiDung ===
                              "QuanTri"
                                ? "bg-primary"
                                : "bg-secondary"
                            }`}
                          >
                            {user.maLoaiNguoiDung ===
                            "QuanTri"
                              ? "Administrator"
                              : "Customer"}
                          </span>

                        </div>

                        <p className="mb-2">
                          <i className="fa-solid fa-envelope me-2"></i>
                          {user.email}
                        </p>

                        <p className="mb-3">
                          <i className="fa-solid fa-phone me-2"></i>
                          {user.soDT}
                        </p>

                        <div className="d-flex gap-2">

                          <Link
                            to={`/admin/user/edit/${user.taiKhoan}`}
                            className="btn btn-outline-primary flex-fill"
                          >
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                user.taiKhoan
                              )
                            }
                            className="btn btn-outline-danger flex-fill"
                          >
                            <i className="fa-solid fa-trash me-2"></i>
                            Delete
                          </button>

                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted py-4">
                    No users found.
                  </div>
                )}

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}