import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import '../../scss/components/sidebar.scss';
import { Link } from 'react-router-dom';
// import { FaRegCircleUser } from "react-icons/fa6";
// import { SiCodeproject } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
import { useAppSelector } from '../../Redux/Store/hooks';
import { UserState } from '../../Redux/Actions/UserSlice';
import { FaQuestionCircle } from 'react-icons/fa';
import Route from '../../Models/RouteModel';
import { GiCaptainHatProfile } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
// import { MdHelpOutline } from "react-icons/md";

const Sidebar: React.FC = () => {
  // const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const isSidebarOpen = true
  const userActive: UserState = useAppSelector((state: any) => state.user);
  if (userActive) { console.log(userActive.accessToken); }
  const [routes, setRoutes] = useState<Route[]>([]);
  // const dispatch= useAppDispatch()
  //     useEffect(() => {
  //         const token = Cookies.get("data");
  //         if (token && !userActive.accessToken) {
  //             dispatch(userLogIn(null, token));
  //         }
  //     }, [dispatch]);


  useEffect(() => {
    if (userActive && userActive.accessToken) {
      setRoutes([
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
        {
          path: "/userProfile",
          name: "Profile",
          style: "userProfile"
        },
        {
          path: "/faq",
          name: "FAQ",
          style: "faqicono"
        }
        // {
        //     path: "/dashboard",
        //     name: "",
        //     style: "route"
        // },
      ])
    } else {
      setRoutes([
        {
          path: "/home",
          name: "Home",
          style: "homeicono"
        },
        {
          path: "/faq",
          name: "FAQ",
          style: "faqicono"
        }
      ])
    }
  }, [userActive]);



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
        {routes.map((route: any, index: any) => (
          <li key={index}>
            <div className="sidebar-icon">
              <Link className="linkSidebar" to={route.path}>
                {route.style == "homeicono" ? <GiCaptainHatProfile className='iconos2' /> : null}
                {route.style == "projecticono" ? <GrProjects className='iconos' /> : null}
                {route.style == "faqicono" ? <FaQuestionCircle className='iconos2' /> : null}
                {route.style == "userProfile" ? <ImProfile className='iconos2' /> : null}
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