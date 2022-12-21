import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Account.scss";
import { useSelector } from "react-redux";
import { authSelector } from "../Auth/authSlice";
import useClient from "../../Services/Hooks/useClient";
import config from "../../Configs/Config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wait } from "@testing-library/user-event/dist/utils";

const auth0ServerApi = config.AUTH0.SERVER_API;
const auth0Token = config.AUTH0.TOKEN;

const Account = () => {
  const auth = useSelector(authSelector);
  const client = useClient(auth0ServerApi);
  const { isLoading, user } = auth.userLogin;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isLoading) {
      const data = {
        name: user?.name,
        email: user?.email,
      };
      setForm(data);
    }
  }, [isLoading]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    const { sub: userId } = user;

    if (name !== "" && email !== "") {
      const data = {
        name,
        email,
      };
      if (password !== "") {
        data.password = password;
        delete data.email;
      }
      const res = await client.patch(`/users/${userId}`, data, {}, auth0Token);
      if (res.response.ok) {
        toast.success(
          "Cập nhật thông tin thành công. Hệ thống sẽ tự động đăng xuất trong 3 giây"
        );
        await wait(3000);
        window.location.reload();
      }
    }
  };

  const handleChange = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  return (
    <section className="container account-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Thông tin cá nhân</h1>

          <form action="" className="form-basic" onSubmit={handleSubmitForm}>
            <div className="field-group">
              <label>Tên</label>
              <input
                type="text"
                placeholder="Tên..."
                name="name"
                defaultValue={user?.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email..."
                name="email"
                defaultValue={user?.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-group">
              <label>Mật khẩu (Không nhập nếu không đổi)</label>
              <input
                type="password"
                placeholder="Mật khẩu..."
                name="password"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Cập nhật</button>
          </form>
        </>
      )}
      <ToastContainer />
    </section>
  );
};

export default Account;
