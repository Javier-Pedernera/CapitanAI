import { Outlet, Route } from "react-router-dom"
// import Home from "../pages/Home/HomePage";
import { Fragment, LazyExoticComponent, Suspense, lazy } from "react";
import loader from "../assets/images/loading.gif"
import '../scss/components/router.scss';

interface RouteProps {
    path?: string;
    element?: LazyExoticComponent<() => JSX.Element> | null;
    layout?: LazyExoticComponent<(props: { children: React.ReactNode }) => JSX.Element> | null;
    children?: RouteProps[];
    name?: string;
    authorization?: LazyExoticComponent<
        (props: { children: React.ReactNode }) => JSX.Element
    > | null;
}


export const renderRoutes = (routes: RouteProps[]) => {
    return routes.map((route, index) => {
        const Component = route.element || Fragment;
        const Layout = route.layout || Fragment;
        const AuthGuard = route.authorization || Fragment;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Suspense fallback=
                    {<div className="divLoader"><img className="loader" src={loader}></img></div>
                    } 
                    // {<h1>Loading...</h1>}
                    >
                        <AuthGuard>
                            <Layout>
                                {route.children ? <Outlet /> : <Component />}</Layout>
                        </AuthGuard>
                    </Suspense>
                }
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        );
    });
};


export const routes: RouteProps[] = [
    //login va por fuera porque no debe tener navbar ni footer
    {
        path: "/",
        element: lazy(async () => await import("../pages/Landing/LandingPage")),
        name: "Landing"
    },
    {
        path: "/login",
        element: lazy(async () => await import("../pages/Login/LoginPage")),
        name: "Login"
    },
    {
        path: "/register",
        element: lazy(async () => await import("../pages/Register/Register")),
        name: "Home"
    },
    //layout va a tener navbar, footer y dentro los hijos (rutas protejidas)
    {
        layout: lazy(async () => await import("../components/Layout/layout")),
        children: [
            {
                path: "/home",
                element: lazy(async () => await import("../pages/Home/HomePage")),
                name: "Home"
            },
            {
        authorization: lazy(async () => await import("../utils/Auth")),
        children: [

            {
                path: "/Dashboard",
                element: lazy(async () => await import("../pages/Dashboard/DashboardPage")),
                name: "Dashboard",

            },
            {
                path: "/:projectId/run",
                element: lazy(async () => await import("../pages/ProjectRun/ProjectRunPage")),
                name: "ProjectRunPage"
            },
            {
                path: "/:projectId/configure",
                element: lazy(async () => await import("../pages/ProjectEdit/ProjectEditPage")),
                name: "ProjectEditPage"
            },
            {
                path: "/userProfile",
                element: lazy(async () => await import("../pages/UserProfile/UserProfile")),
                name: "UserProfile"
            }
        ]
    },

        ]
    },
    
];
