
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { assistants } from "./AssistantsSlice";
const URL = import.meta.env.VITE_API_URL
//Traer asisstentes creados en openai
const getAssistants = () => {
    return async (dispatch: Dispatch) => {
            try {
                const response = await axios.get(`${URL}/api/assistants`);
                console.log("respuesta a peticion de asistentes",response);
                const res = dispatch(assistants(response.data));
                return res
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
            }
        }
    };
// se crea Slice por si en algun momento se dese modificar asistentes desde el frontend

export {
    getAssistants
}