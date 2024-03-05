import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar"
import '../../scss/layout/_layout.scss';
import Sidebar from "../Sidebar/Sidebar";
interface AppLayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: AppLayoutProps) => {
    return (
        <div className="Container_layout">
            <Sidebar />
            <div className="layout">
                <Navbar />

                {children}
                <Footer></Footer>
            </div></div>

    )
}

export default Layout;
