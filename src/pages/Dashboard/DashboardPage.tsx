import "../../scss/components/dashboard.scss"
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { UserState } from "../../Redux/Actions/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/hooks";
import ProjectCreate, { createProject, deleteProject, getProjectsUser } from "../../Redux/Actions/ProjectsGet";
import { useEffect } from "react";
import ok from "../../assets/images/check.png";
import { GrConfigure, GrSchedulePlay } from "react-icons/gr";
import 'balloon-css';
import ProjectModel from "../../components/Models/Project";

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const userActive: UserState = useAppSelector((state: any) => state.user);
    const ProjectsUser: ProjectModel[] = useAppSelector((state: any) => state.projects.projects);

    //Para cuando se asignen roles de usuario
    // const [userRole, setuserRole] = useState("Admin");
    // console.log(userRole);
    const userRole = "Admin"

    const user: any = userActive.userData
    console.log(ProjectsUser);
    console.log(user);

    useEffect(() => {
        if (userActive && userActive.userData && 'id' in userActive.userData) {
            dispatch(getProjectsUser(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id"))
        }
    }, [userActive]);

    const handleCreateProject = () => {
        (async () => {
            const { value: formValues } = await Swal.fire({
                heightAuto: false,
                title: "Create project",
                html: `
                <input  placeholder ="project's name" id="swal-input1" class="swal2-input"><textarea placeholder ="description..." id="swal-text" class="swal2-textarea"></textarea>
              `,
                focusConfirm: false,
                preConfirm: () => {
                    const name = document.getElementById("swal-input1") as HTMLInputElement;
                    const description = document.getElementById("swal-text") as HTMLInputElement;
                    if (name && description) {
                        return [name.value, description.value];
                    }
                    return null;
                }
            });
            // console.log(formValues);
            const data: ProjectCreate = {
                name: formValues[0] ? formValues[0] : "",
                creator_id: userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "",
                description: formValues[1] ? formValues[1] : ""
            }
            const response = await dispatch(createProject(data));
            // console.log("data al dispatch",data);
            // console.log("respuesta",response);
            if (response?.status == 200) {
                dispatch(getProjectsUser(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id"));
                Swal.fire({ heightAuto: false, title: `The ${formValues[0]} project was created successfully` });
            } else {
                Swal.fire({
                    heightAuto: false,
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    // footer: '<a href="#">Try again...</a>'
                });
            }
        })()
    };

    const handleDeleteProject = (projectId: string) => {
        Swal.fire({
            heightAuto: false,
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProject(projectId))
                    .then((result: any) => {
                        // console.log("result de delete", result)
                        // console.log(userActive.userData);
                        if (result == "Project deleted") {
                            dispatch(getProjectsUser(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id"));
                            Swal.fire({
                                heightAuto: false,
                                title: "Deleted!",
                                text: "Your project has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                heightAuto: false,
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: '<a href="#">Try again...</a>'
                            });
                        }

                    })
                // dispatch(getProjectsUser(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id"));
                // console.log(projectId);
                // Swal.fire({
                //     heightAuto: false,
                //     title: "Deleted!",
                //     text: "Your project has been deleted.",
                //     icon: "success"
                // });
            }
        });

    };
    const handleRunProject = (projectId: string) => {
        navigate(`/${projectId}/run`);
    };
    const handleEditProject = (projectId: string) => {
        navigate(`/${projectId}/configure`);
    };

    return (
        <div className="dashboard">

            <h2>Projects</h2>
            {userRole == "Admin" ? <button className="btn" onClick={handleCreateProject}>New project +</button> : <div></div>}
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="description_column">Description</th>
                        {/* <th>Stage</th> */}
                        <th>Date</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectsUser.length ? ProjectsUser.map((project: ProjectModel) => (
                        <tr key={project.id}>
                            <td>
                                <div className="link" onClick={() => handleRunProject(project.id)}>{project.name}</div>

                                <Link to={`/${project.id}`}></Link></td>
                            <td>
                                {project.description}
                            </td>
                            {/* <td> */}
                            {/* {project.stage} */}
                            {/* </td> */}
                            <td>{project.date}</td>
                            <td>
                                <img src={ok} alt="ok" className="ok" />
                                {/* finish */}
                                {/* {project.state} */}
                            </td>
                            <td className="btns_p">
                                <div className="btnEdithDel">


                                    <button className="btn" >See</button>
                                    <button className="btn" aria-label="RUN" data-balloon-pos="down" onClick={() => handleRunProject(project.id)}><GrSchedulePlay className="icono_btn" /></button>
                                    {/* {userRole == "Admin" ? */}
                                    {project.collaborators[0].public_id == user.id ?
                                        <>
                                            <button className="btn" aria-label="SETUP" data-balloon-pos="down" onClick={() => handleEditProject(project.id)}><GrConfigure /></button>
                                            <button className="btn" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                                        </> :
                                        <div></div>}

                                    {/* } */}
                                </div>
                            </td>
                        </tr>
                    )) : <div className="sinProyecto">
                        You don't have any projects created yet </div>}
                </tbody>

            </table>
        </div>
    );
}

export default Dashboard;