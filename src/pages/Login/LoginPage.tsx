import { FieldError, useForm } from "react-hook-form";
// import { redirect } from 'react-router-dom';
// import axios from "axios";
import logo from "../../assets/images/Logosinfondo.png";
import { Link, useNavigate } from "react-router-dom";
import '../../scss/components/login.scss';
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/hooks";
import { userLogIn } from "../../Redux/Actions/UserGet";
import { UserState } from "../../Redux/Actions/UserSlice";
// import { useEffect } from "react";
// import { useEffect } from "react";
// let fondo = "/fondo2.gif";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    color: "#0F0C06",
    width: "400px",
    // background: "#e5ae22",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleGoogle = async () => {
    // window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self")

  };

  //  useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const data = params.get("data");
  //   if (data) {
  //     Cookies.set("data", data, { expires: 3 });
  //     location.href = "/";
  //   }
  // }, [location]); 


  const onSubmit = (data: any) => {

    // axios
    //   .post(`${import.meta.env.VITE_API_URL}/users/login`, data)
    // console.log(data);
    const username = data.email;
    const password = data.password;
    console.log("username en login", username, "password en login", password);
    dispatch(userLogIn(data, "")).then((resp) => {
      // console.log(resp?.payload.token)
      Cookies.set("data", JSON.stringify(resp?.payload.token), { expires: 3 });

      Toast.fire({
        icon: "success",
        title: `Bienvenido ${data.email}`,
      }).then(() => {
        navigate("/home");
      });
    })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Usuario o contraseña incorrectos`,
          width: "22rem",
          padding: "0.5rem",
        }).then(() => {
          location.href = "/login";
        });
      });
  };
  // const ConditionalRedirect = () => {
  //   const isAuthenticated = useAppSelector(state => state.user.accessToken);

  //   return isAuthenticated ? redirect ("/home") : null;
  // };

  const userActive: UserState = useAppSelector((state) => state.user);
  console.log(userActive);
  // useEffect(() => {
  //   if(userActive.accessToken?.length){
  //     location.href = "/home";
  //   }
  // }, [userActive]);

  return (
    <>
      <div className="login-container">

        <div className="content">
          <div className="form-container">
            <div className="logoCapitan">
              <Link className="logoCapitan" to="/home">
                <img className="capitan" src={logo} alt="logo" />
              </Link>
            </div>
          <div className="logo">
            <div className="google-button" onClick={handleGoogle}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="google-img" alt="google logo" loading="lazy" />
              <span>Login with Google</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="or-divider">
                <hr className="" />
                <p className="or-text">Or</p>
                <hr />
              </div>
              <input
                type="email"
                placeholder="Correo Eléctronico"
                className="form-input"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Correo requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Correo no valido",
                  },
                })}
              />
              {errors.email && (
                <span className="form-error"> {(errors.email as FieldError).message}</span>
              )}
              <input
                type="password"
                placeholder="Contraseña"
                className="form-input"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Ingresar contraseña por favor",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error"> {(errors.password as FieldError).message}</span>
              )}
              <button type="submit" className="submit-button">Continuar</button>
              <Link to="/register" className="create-account-button">Crear Cuenta</Link>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;