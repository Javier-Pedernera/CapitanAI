import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar"
import '../../scss/layout/_layout.scss';
interface AppLayoutProps{
    children: React.ReactNode;
}

const Layout = ({children}: AppLayoutProps) =>{
    return (
        <div className="layout">
        <Navbar/>
        {children}
        <Footer></Footer>
        </div>
    ) 
}

export default Layout;
