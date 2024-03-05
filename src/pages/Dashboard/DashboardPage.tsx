import "../../scss/components/dashboard.scss"
import { Link, useNavigate } from 'react-router-dom';
import Project from '../../components/Models/Project';
import Swal from "sweetalert2";
import { UserState } from "../../Redux/Actions/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/hooks";
import ProjectCreate, { createProject, deleteProject, getProjectsUser, updateProject } from "../../Redux/Actions/ProjectsGet";
import { useEffect, useState } from "react";
import ok from "../../assets/images/check.png";
import ProjectUpdate from "../../components/Models/ProjectUp";

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const userActive: UserState = useAppSelector((state: any) => state.user);
    const ProjectsUser: Project[] = useAppSelector((state: any) => state.projects.projects);
    const [userRole, setuserRole] = useState("Admin");

    console.log(ProjectsUser);

    // console.log(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id");


    useEffect(() => {
        if (userActive) {
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
            console.log(formValues);
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

    const handleEditProject = (project: Project) => {
        (async () => {
            const { value: formValues } = await Swal.fire({
                heightAuto: false,
                title: "Edit project",
                html: `<input  placeholder ="${project.name}" id="swal-input1" class="swal2-input">
                <textarea placeholder ="${project.description}"  id="swal-text" class="swal2-textarea"></textarea>`,
                focusConfirm: false,
                preConfirm: () => {
                    const name = document.getElementById("swal-input1") as HTMLInputElement;
                    const description = (document.getElementById("swal-text") as HTMLInputElement).value.length ? (document.getElementById("swal-text") as HTMLInputElement).value : project.description;
                    if (name && description) {
                        return [name.value, description];
                    }
                    return null;
                }
            });
            console.log(formValues);
            const data: ProjectUpdate = {
                name: formValues.length ? formValues[0] : "",
                description: formValues.length ? formValues[1] : ""
            }
            const response = await dispatch(updateProject(project.id, data));
            // console.log("data al dispatch",data);
            // console.log("respuesta",response);
            if (response?.status == 200) {
                dispatch(getProjectsUser(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id"));
                Swal.fire({ heightAuto: false, title: `The ${formValues[0]} project was edited successfully` });
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
                        console.log("result de delete", result)
                        console.log(userActive.userData);
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
    const handleProject = (projectId: string) => {

        navigate(`/${projectId}`);

    };

    return (
        <div className="dashboard">
            <h2>Projects</h2>
            {userRole == "Admin" ? <button className="btn" onClick={handleCreateProject}>New project +</button> : <div></div>}
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {/* <th>Stage</th> */}
                        <th>Date</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectsUser.length ? ProjectsUser.map((project: Project) => (
                        <tr key={project.id}>
                            <td><Link className="link" to={`/${project.id}`}>{project.name}</Link></td>
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
                            <td>
                                <div className="btnEdithDel">
                                    <button className="btn" >See</button>
                                    <button className="btn" onClick={() => handleProject(project.id)}>Run</button>
                                    {userRole == "Admin" ?
                                        <>
                                            <button className="btn" onClick={() => handleEditProject(project)}>Edit</button>
                                            <button className="btn" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                                        </> :
                                        <div></div>

                                    }
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