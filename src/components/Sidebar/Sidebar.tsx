import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import '../../scss/components/sidebar.scss';
import { Link } from 'react-router-dom';
// import { FaRegCircleUser } from "react-icons/fa6";
// import { SiCodeproject } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
// import { MdHelpOutline } from "react-icons/md";

const Sidebar: React.FC = () => {
  // const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const isSidebarOpen = true
  // const userActive: UserState = useAppSelector((state: any) => state.user);
  // console.log(userActive.accessToken);

  // const dispatch= useAppDispatch()
  //     useEffect(() => {
  //         const token = Cookies.get("data");
  //         if (token && !userActive.accessToken) {
  //             dispatch(userLogIn(null, token));
  //         }
  //     }, [dispatch]);

  let routes = []

  routes = [
    {
      path: "/home",
      name: "Home",
      style: "homeicono"
    },
    {
      path: "/dashboard",
      name: "Projects",
      style: "projecticono"
    },
    // {
    //     path: "/profile",
    //     name: "Profile",
    //     style: "userProfile"
    // },
    // {
    //     path: "/dashboard",
    //     name: "",
    //     style: "route"
    // },
  ]
  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };
  // const handleNavigation = (path) => {
  //   // history.push(path);
  // };

  return (



    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <ul className="sidebar-list">
        {routes.map((route, index) => (
          <li key={index}>
            <div className="sidebar-icon">
              <Link className="linkSidebar" to={route.path}>
                {route.style == "homeicono" ? <div className='logoCapitanIcono'></div> : null}
                {route.style == "projecticono" ? <GrProjects className='iconos' /> : null}
                {/* <div className={route.style}> </div> */}
                <span className={`sidebar-text ${isSidebarOpen ? 'open' : ''}`}>{route.name}</span>
              </Link>
            </div>
          </li>
        ))}
        <li>

        </li>
      </ul>
      {/* <div className="sidebar-icon" onClick={() => handleNavigation('/')}>
        <i className="fas fa-home"></i>
        <span className="sidebar-text">Home</span>
      </div>
      <div className="sidebar-icon" onClick={() => handleNavigation('/projects')}>
        <i className="fas fa-folder"></i>
        <span className="sidebar-text">Projects</span>
      </div>
      <div className="sidebar-icon" onClick={() => handleNavigation('/profile')}>
        <i className="fas fa-user"></i>
        <span className="sidebar-text">Profile</span>
      </div> */}
      <div className={`politicas ${isSidebarOpen ? 'open' : ''}`}>
        <h3>Políticas y Términos</h3>
        <ul>
          <li><a className='pyc' href="/politica-de-privacidad">Política de Privacidad</a></li>
          <li><a className='pyc' href="/terminos-y-condiciones">Términos y Condiciones</a></li>
          <li><a className='pyc' href="/politica-de-cookies">Política de Cookies</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;