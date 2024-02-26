import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
// import CreateStage from "../../components/Models/CreateStage";
import { stageByProyect } from "./StagesSlice";
export default interface ProjectCreate {
	name: string;
	creator_id: string;
	description: string;
}


// Crear proyecto
const createStage = (projectId: string, data: any) => {
	const URL = import.meta.env.VITE_API_URL
	console.log(projectId);
	console.log("data", data);


	return async () => {
		try {
			console.log(data);
			const response = await axios.post(`${URL}/api/stages`, data);
			console.log(response);
			const idStage = { stage_id: response.data.id }
			console.log(idStage);

			const JoinStageProject = await axios.post(`${URL}/api/projects/${projectId}/stages`, idStage);
			// const res = dispatch(project_StageCreate())
			return { response, JoinStageProject }
		} catch (error: any) {
			console.error('error en createProject', error);
		}
	};
};

const getStagesbyProjectId = (projectId: string) => {
	const URL = import.meta.env.VITE_API_URL
	return async (dispatch: Dispatch) => {
		try {
			const response = await axios.get(`${URL}/api/projects/${projectId}/stages`);
			// console.log(response);
			const res = dispatch(stageByProyect(response.data))
			return res
		} catch (error: any) {
			console.error('error en createProject', error);
		}
	};
};
const stageDeleted = (projectId: string, stageId:string) => {
	const URL = import.meta.env.VITE_API_URL
	return async () => {
		try {
			const responseStage_project = await axios.delete(`${URL}/api/projects/${projectId}/stages/${stageId}`);
			// console.log(responseStage_project.status);
			const responseStage = await axios.delete(`${URL}/api/stages/${stageId}`);
			// console.log(responseStage);
			// const res = dispatch(removeProject(response.data))
			if(responseStage_project.status == 200 && responseStage.status == 200 ){
				return "Stage deleted"
			}else{
				return "error en delete stage o stage_project"
			}
			
		} catch (error: any) {
			console.error('error en deleteStage', error);
		}
	};
};
// const updateProject = (projectId:string, data: ProjectUpdate) => {
// 	const URL = import.meta.env.VITE_API_URL
//     return async () => {
// 		try {
// 			const responseUpdate = await axios.put(`${URL}/api/projects/${projectId}`,data);
//             console.log(responseUpdate);
//             // const response = await axios.get(`${URL}/api/projects/user/${userId}`);
//             // const res = dispatch(userProjects(response.data))
// 			return { projectData: responseUpdate.data, status: 200 };
// 		} catch (error:any) {
// 			console.error('error en createProject', error);
// 		}
// 	};
// };
export {
	createStage, getStagesbyProjectId, stageDeleted
}
