import { VideoCameraOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { accountApi } from "../../apis/accountApi";
import { IAccountRegister } from "../../utils/type";

const Register = () => {
  const hookForm = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: IAccountRegister) => {
    setLoading(true);
    try {
      const { data } = await accountApi.register(value);
      console.log(data);
      setLoading(false);
      toast.success("Đăng ký thành công", { autoClose: 3000 });
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data, { autoClose: 3000 });
    }
  };

  return (
    <div className="register">
      <div className="register__content card">
        <div className="register__content__header">
          <VideoCameraOutlined className="register__content__header__icon" />
          <div className="register__content__header__text">
            The Movie Database
          </div>
        </div>

        <form className="form" onSubmit={hookForm.handleSubmit(onSubmit)}>
          <div className="form__item">
            <div className="form__item__label">Tên đăng nhập</div>

            <Controller
              name="username"
              control={hookForm.control}
              rules={{
                validate: {
                  required: (v) =>
                    v.trim().length > 0 || "Tên đăng nhập là bắt buộc",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  placeholder="Tên đăng nhập"
                  className="form__item__input"
                  status={fieldState.error !== undefined ? "error" : ""}
                />
              )}
            />
            {hookForm.formState.errors.username && (
              <p className="error-msg">
                {hookForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="form__item">
            <div className="form__item__label">Mật khẩu</div>

            <Controller
              name="password"
              control={hookForm.control}
              rules={{
                validate: {
                  required: (v) =>
                    v.trim().length > 0 || "Mật khẩu là bắt buộc",
                },
              }}
              render={({ field, fieldState }) => (
                <Input.Password
                  {...field}
                  placeholder="Mật khẩu"
                  className="form__item__input"
                  status={fieldState.error !== undefined ? "error" : ""}
                />
              )}
            />
            {hookForm.formState.errors.password && (
              <p className="error-msg">
                {hookForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="form__item">
            <div className="form__item__label">Email</div>

            <Controller
              name="email"
              control={hookForm.control}
              rules={{
                validate: {
                  required: (v) => v.trim().length > 0 || "Email là bắt buộc",
                  email: (v) =>
                    Boolean(v.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) ||
                    "Email không đúng định dạng",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  placeholder="Email"
                  className="form__item__input"
                  status={fieldState.error !== undefined ? "error" : ""}
                />
              )}
            />
            {hookForm.formState.errors.email && (
              <p className="error-msg">
                {hookForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="form__btn">
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng ký
            </Button>
          </div>
        </form>

        <div className="register__content__footer">
          <span className="register__content__footer__text">
            Đã có tài khoản?{" "}
          </span>

          <Link to="/login">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
