// import React from 'react';
import "../../scss/components/dashboard.scss"
import { Link, useNavigate } from 'react-router-dom';
import Project from '../../components/Models/Project';
import Swal from "sweetalert2";
import { UserState } from "../../Redux/Actions/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/hooks";
import ProjectCreate, { createProject, deleteProject, getProjectsUser, updateProject } from "../../Redux/Actions/ProjectsGet";
import { useEffect } from "react";
import  ok  from "../../assets/images/check.png";
import ProjectUpdate from "../../components/Models/ProjectUp";

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch= useAppDispatch()
    const userActive: UserState = useAppSelector((state: any) => state.user);
    const ProjectsUser: Project[] = useAppSelector((state: any) => state.projects.projects);

    // console.log(ProjectsUser);
    
    // console.log(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id");
    

    useEffect(() => {
        if(userActive){
            dispatch(getProjectsUser(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id"))
        }
    }, [dispatch, ProjectsUser]);

    // const projects: Project[] = [
    //     {
    //         id: "1",
    //         name: "uno",
    //         stage: "nuevo",
    //         date: "13/01/2023",
    //         state: "iniciado",
    //         description: "string",
    //         isFrontend: true,
    //         technology: "string",
    //         aiResponse: ""
    //     },
    //     {
    //         id: "2",
    //         name: "dos",
    //         stage: "avanzado",
    //         date: "13/01/2024",
    //         state: "Finalizado",
    //         description: "string",
    //         isFrontend: true,
    //         technology: "string",
    //         aiResponse: ""
    //     }
    // ];

    const handleCreateProject = () => {
        (async () => {
            const { value: formValues } = await Swal.fire({
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
            const data:ProjectCreate={
                name: formValues[0],
                creator_id: userActive.userData && 'id' in userActive.userData ? userActive.userData.id:"" ,
                description: formValues[1]
            }
            const response = await dispatch(createProject(data));
            // console.log("data al dispatch",data);
            // console.log("respuesta",response);
            if (response?.status==200) {
                Swal.fire(`The ${formValues[0]} project was created successfully`);
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    // footer: '<a href="#">Try again...</a>'
                  });
            }
        })()
    };

    const handleEditProject = (project:Project) => {
        (async () => {
            const { value: formValues } = await Swal.fire({
                title: "Edit project",
                html: `
                <input  placeholder =${project.name} id="swal-input1" class="swal2-input"><textarea placeholder =${project.description}  id="swal-text" class="swal2-textarea"></textarea>
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
            const data: ProjectUpdate ={
                name: formValues[0],
                description: formValues[1]
            }
            const response = await dispatch(updateProject(project.id,data));
            // console.log("data al dispatch",data);
            // console.log("respuesta",response);
            if (response?.status==200) {
                Swal.fire(`The ${formValues[0]} project was successfully updated`);
            }else{
                Swal.fire({
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProject(projectId))
                console.log(projectId);
              Swal.fire({
                title: "Deleted!",
                text: "Your project has been deleted.",
                icon: "success"
              });
            }
          });
        
    };
    const handleProject = (projectId: string) => {

        navigate(`/${projectId}`);

    };

    return (
        <div className="dashboard">
            <h2>My projects</h2>
            <button className="btn" onClick={handleCreateProject}>Create project +</button>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Stage</th>
                        <th>Date</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ProjectsUser.map((project:Project) => (
                        <tr key={project.id}>
                            <td><Link className="link" to={`/${project.id}`}>{project.name}</Link></td>
                            <td>
                            {project.description}
                            </td>
                            <td>
                                {/* {project.stage} */}
                            </td>
                            <td>{project.date}</td>
                            <td>
                                <img src={ok} alt="ok" className="ok"/>
                                {/* finish */}
                                {/* {project.state} */}
                            </td>
                            <td>
                                <div className="btnEdithDel">
                                    <button className="btn" onClick={() => handleProject(project.id)}>Ver</button>
                                    <button className="btn" onClick={() => handleEditProject(project)}>Editar</button>
                                    <button className="btn" onClick={() => handleDeleteProject(project.id)}>Eliminar</button></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;