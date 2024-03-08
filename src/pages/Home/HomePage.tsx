
import '../../scss/components/_Home.scss'; // Importa tus estilos Sass aquí
// import { useAppSelector } from '../../Redux/Store/hooks';
import { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import logocap from "../../assets/images/Capitanlogonegro.png"
// import User from '../../components/Models/User';
// import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';

const Home = () => {
  // const userActive: User= useAppSelector((state) => state.user);
  // console.log(userActive);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu servidor o realizar cualquier otra acción necesaria
    console.log(formData);
  };

  return (
    <div className="home">
      <h1>Bienvenido a la página de inicio</h1>

      {/* Carrousel de imágenes */}
      <div className="carousel">
        {/* Aquí va el componente del carrousel */}
      </div>


      <div className="section">
        <h2>¿Cómo funciona nuestro asistente de código?</h2>
        <p>Información detallada sobre el asistente de código y las tecnologías que soporta.</p>
      </div>

      <div className="section">
        <h2>Recursos útiles</h2>
        <p>Enlaces a tutoriales, documentación de API, blogs de desarrollo, etc.</p>
      </div>

      <form className='form_contact' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Contacto</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mensaje"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="sectionAbout">
        <Typography variant="h2" gutterBottom>
          Acerca de nosotros
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="about-description">
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec consequat arcu. Fusce consequat
                libero eu efficitur. Aliquam tincidunt massa in lacus blandit, nec tristique nunc blandit. Nunc convallis
                at ligula vitae fermentum. In hac habitasse platea dictumst.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <img  src={logocap} alt="About Us" className="about-image" />
          </Grid>
        </Grid>
      </div>

      <div className="section">
        <h2>Testimonios de usuarios</h2>
        <p>Testimonios de usuarios satisfechos que han utilizado nuestro asistente de código.</p>
      </div>
    </div>
  );
}
export default Home;