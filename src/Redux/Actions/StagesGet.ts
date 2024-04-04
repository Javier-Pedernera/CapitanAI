import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
// import CreateStage from "../../components/Models/CreateStage";
import { selectProyect_Stage, selectStageById, stageByProyect } from "./StagesSlice";
export default interface ProjectCreate {
	name: string;
	creator_id: string;
	description: string;
}

const URL = import.meta.env.VITE_API_URL
// traer stage por id para la stage seleccionada
const getStagesById = (stageId: string) => {

	return async (dispatch: Dispatch) => {
		// console.log(stageId);

		try {
			const response = await axios.get(`${URL}/api/stages/${stageId}`);
			console.log(response.data);
			dispatch(selectStageById(response.data))
		} catch (error: any) {
			console.error('error en getstageByID', error);
		}
	};
};

//Info de la tabla intermedia Proyecto y stage

const selectProyect_StageByIds = (projectId: string, stageId: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await axios.get(`${URL}/api/projects/${projectId}/stages/${stageId}`);
			// console.log(response.data);
			dispatch(selectProyect_Stage(response.data))
		} catch (error: any) {
			console.error('error en proyect_stageBys', error);
		}
	};
};

// Crear proyecto
const createStage = (dataP_S: any, data: any) => {
	return async () => {
		try {
			console.log(data);
			const response = await axios.post(`${URL}/api/stages`, data);
			// console.log(response);
			const dataProjectStage = { stage_id: response.data.id, assistant_id: dataP_S.assistant_id }
			// console.log(dataProjectStage);

			const JoinStageProject: any = await axios.post(`${URL}/api/projects/${dataP_S.projectId}/stages`, dataProjectStage);

			// console.log("JoinStageProject", JoinStageProject);
			return JoinStageProject
		} catch (error: any) {
			console.error('error en createStage', error);
		}
	};
};

const getStagesbyProjectId = (projectId: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await axios.get(`${URL}/api/projects/${projectId}/stages`);
			// console.log(response);
			const res = dispatch(stageByProyect(response.data))
			return res
		} catch (error: any) {
			console.error('error en getStages by projectID', error);
		}
	};
};

const stageDeleted = (projectId: string, stageId: string) => {
	// console.log(projectId, stageId);
	return async () => {
		try {
			const responsethreadInfo = await axios.get(`${URL}/api/threads/${projectId}/${stageId}`);
			// para eliminar la stage debe eliminar mensajes, hilos y relacion project, stage
			console.log("responsethreadInfo", responsethreadInfo);

			const thread= responsethreadInfo.data
			console.log("resultado del a info del thread", thread);

			var responseStage_thread
			if (thread !== "The project stage combination does not have an associated thread") {
				responseStage_thread = await axios.delete(`${URL}/api/threads/${thread.thread_id}`);
			}
			// console.log("Delete__________responseStage_thread",responseStage_thread);
			const responseStage_project = await axios.delete(`${URL}/api/projects/${projectId}/stages/${stageId}`);
			// console.log("Delete__________responseStage_project",responseStage_project);
			const responseStage = await axios.delete(`${URL}/api/stages/${stageId}`);
			// console.log("Delete__________responseStage",responseStage);
			if (responseStage_thread?.status == 200 && responseStage_project.status == 200 && responseStage.status == 200) {
				return "Stage deleted"
			} else {
				return "error en delete stage o stage_project"
			}

		} catch (error: any) {
			console.error('error en deleteStage', error);
		}
	};
};
const editStage = (stageID: string, data: any) => {
	return async () => {
		try {
			const responseUpdate = await axios.put(`${URL}/api/stages/${stageID}`, data);
			// console.log(responseUpdate);

			return { projectData: responseUpdate.data, status: 200 };
		} catch (error: any) {
			console.error('error en createProject', error);
		}
	};
};
export {
	createStage, getStagesbyProjectId, stageDeleted, editStage, getStagesById, selectProyect_StageByIds
}
