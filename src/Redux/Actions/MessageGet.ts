import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getThread, getAllMessagesThread, messageUserAdded, messageAssistantAdded, createThread, chatClean } from "./MessageSlice";
import { selectProyect_Stage, selectStageById } from "./StagesSlice";
import { splitMessage } from "../../utils/splitMessage";


const URL = import.meta.env.VITE_API_URL

//crear hilo de conversacion


const createNewThread = (datathread: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.post(`${URL}/api/threads`, datathread);
            console.log("JoinThread response", response);
            return dispatch(createThread(response.data))
        } catch (error: any) {
            console.error('error en createNewThread', error);
        }
    };
};
//Get hilo de conversacion

const getThreadInfo = (projectId: string, stageId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${URL}/api/threads/${projectId}/${stageId}`);
            console.log("GetThread response", response.data);
            dispatch(getThread(response.data))
            return response
        } catch (error: any) {
            console.error('error en getThreadInfo', error);
        }
    };
};

// traer todos los mensajes de la base de datos
const getAllMessages = (thread_id: string) => {
    return async (dispatch: Dispatch) => {
      try {
        const response = await axios.get(`${URL}/api/messages/threads/${thread_id}`);
        if (response.status === 200) {
          // Filtrar y modificar los mensajes del asistente si contienen la etiqueta <CODIGO>
          const modifiedMessages = response.data.map((message: any) => {
            if (message.sender === 'assistant' && message.message.includes('<CODIGO>') && message.message.includes('</CODIGO>')) {
              const parts = splitMessage(message.message);
              return {
                ...message,
                message: parts
              };
            }
            return message;
          });
          return dispatch(getAllMessagesThread(modifiedMessages));
        } else {
          // Manejar errores de la llamada a la API
          console.error('Error en la llamada a la API:', response.statusText);
        }
      } catch (error: any) {
        alert({ error: error.message });
      }
    };
  };
// const getAllMessages = (thread_id: string) => {
//     return async (dispatch: Dispatch) => {
//         try {
//             // usando api OpenAI
//             const response = await axios.get(`${URL}/api/messages/threads/${thread_id}`);
//             if (response.status === 200) {
//                 return dispatch(getAllMessagesThread(response.data));
//             } else {
//                 // Manejar errores de la llamada a la API
//                 console.error('Error en la llamada a la API:', response.statusText);
//             }
//         } catch (error: any) {
//             alert({ error: error.message });
//         }
//     };
// };
// agregar mensaje del usuario
const addUserMessage = (userMessage: any) => {
    return async (dispatch: Dispatch) => {
        try {
            return dispatch(messageUserAdded(userMessage));
        } catch (error: any) {
            alert({ error: error.message });
        }
    };
};
// agregar mensajes 
const addMessage = (userMessage: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const openaiResponse = await axios.post(`${URL}/api/messages`, userMessage);
            const respuestaDispatch = await dispatch(messageAssistantAdded(openaiResponse.data));
            return respuestaDispatch
        } catch (error: any) {
            alert({ error: error.message });
        }
    };
};

// agregar mensajes 
const cleanChat = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(selectStageById({}))
            dispatch(selectProyect_Stage({}))
            return dispatch(chatClean({}));
        } catch (error: any) {
            alert({ error: error.message });
        }
    };
};
//eliminar hilo y mensajes
const deleteThread = (thread_id: string) => {
    return async () => {
        try {
            const response = await axios.delete(`${URL}/api/threads/${thread_id}`);
            if (response.status === 200) {
                return response
            } else {
                console.error('Error en la llamada a la API:', response.statusText);
            }
        } catch (error: any) {
            alert({ error: error.message });
        }
    };
};


export {
    getThreadInfo, addMessage, getAllMessages, addUserMessage, createNewThread, cleanChat, deleteThread
}