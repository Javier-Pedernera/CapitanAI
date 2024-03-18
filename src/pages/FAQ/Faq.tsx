
import '../../scss/components/_Faq.scss';
import logo from '../../assets/images/Logosinfondo.png'

const FAQ = () => {
    return (
        <div className="faq-container">
            <div className="headerFAQ">
                {/* <img src={logo} alt="Logo de Capitán" className="logo" /> */}
                <h2>Preguntas Frecuentes</h2>
            </div>

            <div className="faq">
                <div className="question">
                    <h3>1. ¿Cómo puedo comenzar a utilizar Capitán?</h3>
                    <p>Para empezar a utilizar Capitán, simplemente regístrate en nuestra plataforma utilizando tu dirección de correo electrónico y crea un nuevo proyecto. Desde allí, puedes configurar las etapas del proyecto y comenzar a agregar colaboradores para trabajar en él.</p>
                </div>
                <div className="question">
                    <h3>2. ¿Qué tecnologías son compatibles con Capitán?</h3>
                    <p>Capitán es compatible con una amplia variedad de tecnologías de desarrollo, incluyendo pero no limitado a Python, JavaScript, Java, React, Angular, Next.js, Vue.js y Node.js. Puedes configurar cada etapa del proyecto con las tecnologías que mejor se adapten a tus necesidades.</p>
                </div>
                <div className="question">
                    <h3>3. ¿Cómo puedo compartir código con otros colaboradores en Capitán?</h3>
                    <p>Capitán ofrece una biblioteca de código donde los colaboradores pueden compartir y acceder a fragmentos de código reutilizables. Puedes agregar código a la biblioteca y compartirlo con otros colaboradores, facilitando la colaboración y el intercambio de conocimientos dentro del equipo.</p>
                </div>
                <div className="question">
                    <h3>4. ¿Qué nivel de seguridad ofrece Capitán para proteger nuestros datos?</h3>
                    <p>La seguridad es una prioridad en Capitán. Utilizamos medidas de seguridad avanzadas para proteger todos los datos y la comunicación en nuestra plataforma. Esto incluye cifrado de extremo a extremo y autenticación de dos factores para garantizar la confidencialidad y la integridad de la información.</p>
                </div>
                <div className="question">
                    <h3>5. ¿Capitán ofrece integraciones con otras herramientas o plataformas?</h3>
                    <p>En la actualidad, Capitán no ofrece integraciones con otras herramientas o plataformas. Sin embargo, estamos constantemente mejorando nuestra plataforma y considerando nuevas integraciones que puedan beneficiar a nuestros usuarios en el futuro. ¡Mantente atento a las actualizaciones!</p>
                </div>
            </div>
            <div className="footerFaq">
                <img src={logo} alt="Logo de Capitán" className="logo" />
                {/* <h2>Preguntas Frecuentes</h2> */}
            </div>
        </div>
    );
}

export default FAQ;