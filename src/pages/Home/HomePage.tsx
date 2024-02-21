
import '../../scss/components/_Home.scss'; // Importa tus estilos Sass aquí
import { useAppSelector } from '../../Redux/Store/hooks';
import { UserState } from '../../Redux/Actions/UserSlice';
// import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';

const Home= () => {
  const userActive: UserState = useAppSelector((state) => state.user);
    console.log(userActive);
  return (
    <div className="home">
      <h1>Bienvenido a la página de inicio</h1>
      {/* <DropdownMenu/>  */}
      <div className="section">
        <h2>Acerca de nosotros</h2>
        <p>Contenido de la sección "Acerca".</p>
      </div>
      <div className="section">
        <h2>Contacto</h2>
        <p>Contenido de la sección "Contacto".</p>
      </div>
      <div className="section">
        <h2>Preguntas Frecuentes</h2>
        <p>Contenido de la sección "Preguntas Frecuentes".</p>
      </div>
    </div>
  );
}

export default Home;