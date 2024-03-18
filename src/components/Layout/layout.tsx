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
            <Navbar />
            <div className="layout">

                <Sidebar />
                <div className="childrenLayout">{children}</div>


            </div>
            <Footer></Footer>
        </div>

    )
}

export default Layout;
