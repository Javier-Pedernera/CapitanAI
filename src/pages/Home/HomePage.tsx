
import { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, AccordionSummary, Accordion, AccordionDetails } from '@mui/material';
import logocap from "../../assets/images/Capitanlogonegro.png";
import '../../scss/components/_Home.scss';
import { MdExpandMore, MdOutlineCreateNewFolder, MdOutlineHandyman } from 'react-icons/md';
import { LiaUserCheckSolid } from 'react-icons/lia';
import { TbBrandPython } from 'react-icons/tb';
import { FaLaptopCode, FaNodeJs, FaRegHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GrReactjs } from 'react-icons/gr';
import { SiAngularjs, SiOpenai } from 'react-icons/si';
import { RiVuejsLine } from 'react-icons/ri';
import CardUseApp from '../../components/cardUse/CardUseApp';
import { Parallax, ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = () => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    setFormData({
      name: '',
      email: '',
      message: ''
    })
    console.log(formData);
  };

  const features = [
    {
      title: 'Versatile Project Configuration',
      description: `With Capitán, you can quickly and easily create and configure development projects. Define project stages and assign specific technologies according to your team's needs.`
    },
    {
      title: 'Efficient Collaboration',
      description: 'The project creator or administrator can add collaborators to work on it. Each collaborator has their own code generation thread, making collaboration and team work organization easier.'
    },
    {
      title: 'Code Library',
      description: 'Capitán offers a code library where collaborators can share and access reusable code snippets. This streamlines the development process by providing examples and solutions that can be easily implemented in projects.'
    },
    {
      title: 'User and Permissions Management',
      description: 'Capitán has a user management system with different levels of permissions. This ensures that each user only has access to functions and data relevant to their role in the project.'
    },
    {
      title: 'Comprehensive Security',
      description: 'Security is a priority in Capitán. All data and communication are protected through advanced security measures, ensuring the confidentiality and integrity of information.'
    },
    {
      title: 'Intuitive Interface',
      description: `Capitán's user interface is easy to use and designed to provide a smooth and efficient experience. Intuitive navigation and well-organized functions allow users to work productively from the get-go.`
    }
  ];


  const howToUseSteps = [
    {
      title: 'Sign up on the platform',
      description: 'Using your email address.',
      icon: LiaUserCheckSolid
    },
    {
      title: 'Create a new project',
      description: 'And configure the project stages according to your needs.',
      icon: MdOutlineCreateNewFolder
    },
    {
      title: 'Add collaborators',
      description: 'To work on the project, assigning them different roles and permissions.',
      icon: FaRegHandshake
    },
    {
      title: 'Use the code library',
      description: 'To share and access reusable code snippets.',
      icon: MdOutlineHandyman
    },
    {
      title: 'Enjoy efficient project management',
      description: 'Of software development projects with Capitán.',
      icon: FaLaptopCode
    }
  ];

  return (
    <ParallaxProvider>
      <div className="home">
        {/* <img src={logoCatitan} alt="" /> */}

        <div>
          <h1>Welcome to Capitán: Efficient Management of Development Projects</h1>
        </div>
        <ParallaxBanner
          layers={[{ image: 'https://res.cloudinary.com/dbwmesg3e/image/upload/v1710424148/Capitan/Dise%C3%B1o_sin_t%C3%ADtulo__16_-removebg-preview_dnooax.png', rotate: [0, 360], speed: -15 }]}
          className="parallaxTimon"
        >
          {/* <Parallax className="parallax-container"> */}
          <div className='fondodescription'>

            <div className="sectionDescription">
              <Typography className='comoFunciona_title' gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" gutterBottom>
                "Capitán is an innovative web application designed to simplify and optimize the management of software development projects. With Capitán, you can configure projects and organize different development stages, such as frontend, backend, and QA, using a variety of popular technologies like Python, JavaScript, Java, React, Angular, Next.js, Vue.js, Node.js, among others."
              </Typography>
            </div>

            <div className="sectioncomoFunciona">
              <Typography className='comoFunciona_title' variant="h4" gutterBottom>
                How does our code assistant work?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Capitán is an innovative web application designed to simplify and optimize software development project management. With Capitán, you can configure projects and organize different development stages, such as frontend, backend, and QA, using a variety of popular technologies such as Python, JavaScript, Java, React, Angular, Next.js, Vue.js, Node.js, among others.
              </Typography>
            </div>

          </div>
        </ParallaxBanner>


        <div className="sectionUse">
          <Typography variant="h5" gutterBottom className='titleUse'>
            How to use Captain?
          </Typography>
          <hr className='hrDiv' />
          <Grid container spacing={2} className='conteinerCardsUse'>
            {howToUseSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <CardUseApp step={step}>

                </CardUseApp>
              </Grid>
            ))}
          </Grid>
        </div>


        <div className="sectionCaract">
          <Typography className='comoFunciona_title' gutterBottom>
            Features
          </Typography>
          {features.map((feature, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<MdExpandMore className='icoExpandCaract' />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                className='acordion'
              >
                <Typography className='titleAcordion' variant="subtitle1">{feature.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{feature.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>


        <div className="sectionRecuros">

          <Grid container spacing={1}>
            <Parallax className='paralaxDiv' translateY={[-300, 300]} speed={5}>
              <Grid item xs={7} sm={2}>
                <Link to="https://platform.openai.com/docs/introduction" target="_blank" rel="noopener noreferrer">
                  <SiOpenai className='ico_tec' />
                  <Typography variant="body1">OpenaIA</Typography>
                </Link>
              </Grid>
              <Grid item xs={7} sm={2}>
                <Link to="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                  <GrReactjs className='ico_tec' />
                  <Typography variant="body1">React</Typography>
                </Link>
              </Grid>
              <Grid item xs={7} sm={2}>
                <Link to="https://angular.io/" target="_blank" rel="noopener noreferrer">
                  <SiAngularjs className='ico_tec' />
                  <Typography variant="body1">Angular</Typography>
                </Link>
              </Grid>
              <Grid item xs={7} sm={2}>
                <Link to="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
                  <RiVuejsLine className='ico_tec' />
                  <Typography variant="body1">Vue.js</Typography>
                </Link>
              </Grid>
              <Grid item xs={7} sm={2}>
                <Link to="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer">
                  <TbBrandPython className='ico_tec' />
                  <Typography variant="body1">Python</Typography>
                </Link>
              </Grid>
              <Grid item xs={7} sm={2}>
                <Link to="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
                  <FaNodeJs className='ico_tec' />
                  <Typography variant="body1">Node.js</Typography>
                </Link>
              </Grid>

              {/* <Grid item xs={5} sm={2}>
            <Link to="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
              <RiJavascriptFill className='ico_tec' />
              <Typography variant="body1">Javascript</Typography>
            </Link>
          </Grid> */}

              {/* Puedes agregar más tecnologías con sus respectivos enlaces aquí */}
            </Parallax>
          </Grid>

        </div>

        <form className="form_contact" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Contacto
          </Typography>
          <Grid container spacing={2}>
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
          {/* <Parallax className='paralaxDiv' translateX={[200, -210]} speed={1}> */}
          <Typography variant="h4" gutterBottom>

            About us
            <hr />
          </Typography>
          <Grid className='contentSection_about'>
            <Grid >
              <Paper className="about-description">
                <Typography >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec consequat arcu. Fusce consequat
                  libero eu efficitur. Aliquam tincidunt massa in lacus blandit, nec tristique nunc blandit. Nunc convallis
                  at ligula vitae fermentum. In hac habitasse platea dictumst.
                </Typography>
              </Paper>
            </Grid>
            <Grid >
              <img src={logocap} alt="About Us" className="about-image" />
            </Grid>
          </Grid>
          {/* </Parallax> */}
        </div>

        <div className="section">
          <Typography variant="h4" gutterBottom>
            user opinions
            <hr />
          </Typography>
          <Typography variant="body1">
            Testimonials from satisfied users who have used our code assistant.
          </Typography>
        </div>
      </div >
    </ParallaxProvider>
  );
};

export default Home;