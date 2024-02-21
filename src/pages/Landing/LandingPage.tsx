
import {  useNavigate } from 'react-router-dom';
import '../../scss/components/landing.scss';
import logo from "../../assets/images/Capitanlogo.png"

const Landing = () => {

    const navigate = useNavigate();
    const handleInit = () => {
        navigate("/home");
    };

    return (
        <div className="landing">
           <img src={logo} alt="" />
            {/* <Link to="/home" className="landing-button">Ir al Inicio</Link> */}
            <button className="btn" onClick={() => handleInit()}>Iniciar</button>
        </div>
    );
};

export default Landing;
