// import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getProjectByID, userProjects } from "./ProjectsSlice";
import { Dispatch } from "@reduxjs/toolkit";
import ProjectUpdate from "../../components/Models/ProjectUp";
// import projectCreate from "./ProjectsSlice"
export default interface ProjectCreate {
	name: string;
	creator_id: string;
	description: string;
}


// Crear proyecto
const createProject = (data:ProjectCreate) => {
	const URL = import.meta.env.VITE_API_URL
    return async () => {
		try {
            // console.log(data);
			const response = await axios.post(`${URL}/api/projects`,data);
            console.log(response);
            // const res = dispatch(projectCreate())
			return response
		} catch (error:any) {
			console.error('error en createProject', error);
		}
	};
};

const getProjectsUser = (userId:string) => {
	const URL = import.meta.env.VITE_API_URL
    return async (dispatch:Dispatch) => {
		try {
			const response = await axios.get(`${URL}/api/projects/user/${userId}`);
            // console.log(response);
            const res = dispatch(userProjects(response.data))
			return res
		} catch (error:any) {
			console.error('error en createProject', error);
		}
	};
};
const deleteProject = (projectId:string) => {
	const URL = import.meta.env.VITE_API_URL
    return async () => {
		try {
			const response = await axios.delete(`${URL}/api/projects/${projectId}`);
            console.log(response);
            // const res = dispatch(removeProject(response.data))
			return "Project deleted"
		} catch (error:any) {
			console.error('error en deleteProject', error);
		}
	};
};
const updateProject = (projectId:string, data: ProjectUpdate) => {
	const URL = import.meta.env.VITE_API_URL
    return async () => {
		try {
			const responseUpdate = await axios.put(`${URL}/api/projects/${projectId}`,data);
            console.log(responseUpdate);
            // const response = await axios.get(`${URL}/api/projects/user/${userId}`);
            // const res = dispatch(userProjects(response.data))
			return { projectData: responseUpdate.data, status: 200 };
		} catch (error:any) {
			console.error('error en createProject', error);
		}
	};
};

const getProjectActual = (projectID:string) => {
	const URL = import.meta.env.VITE_API_URL
    return async (dispatch:Dispatch) => {
		try {
			const response = await axios.get(`${URL}/api/projects/${projectID}`);
            console.log("response en action",response);
            const res = dispatch(getProjectByID(response.data))
			return res
		} catch (error:any) {
			console.error('error en createProject', error);
		}
	};
};
 

export {
	createProject, getProjectsUser, deleteProject, updateProject, getProjectActual
}
