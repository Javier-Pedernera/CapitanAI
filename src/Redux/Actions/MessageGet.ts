import { Dispatch } from "@reduxjs/toolkit";
// import { messageAI, getOut, selectVoice, messageAdded, compare }from "./MessageSlice";
import axios from "axios";
import { getThread, getAllMessagesThread, messageUserAdded, messageAssistantAdded, createThread } from "./MessageSlice";


const URL = import.meta.env.VITE_API_URL

//crear hilo de conversacion


const createNewThread = (datathread:any) => {
    return async (dispatch: Dispatch) => {
        try {
				const response = await axios.post(`${URL}/api/threads`, datathread);
				console.log("JoinThread response", response);
           return dispatch(createThread(response.data))
        } catch (error: any) {
            console.error('error en createProject', error);
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
        } catch (error: any) {
            console.error('error en createProject', error);
        }
    };
};

// traer todos los mensajes de la base de datos

const getAllMessages = (thread_id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            // usando api OpenAI
            const response = await axios.get(`${URL}/api/messages/threads/${thread_id}`);
            console.log(response);
            
            // Si la llamada fue exitosa, despacha la acción con los mensajes obtenidos
            if (response.status === 200) {
              return dispatch(getAllMessagesThread(response.data));
            } else {
                // Manejar errores de la llamada a la API
                console.error('Error en la llamada a la API:', response.statusText);
            }
        } catch (error: any) {
            alert({ error: error.message });
        }
    };
};
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

            // usando api OpenAI
            const openaiResponse = await axios.post(`${URL}/api/messages`, userMessage);
            console.log(openaiResponse.data);
           
            return dispatch(messageAssistantAdded(openaiResponse.data));
        } catch (error: any) {
            alert({ error: error.message });
        }
    };
};


// //Eleccion de voces
// const voiceSelected = (voice: any) => {
// 	return async (dispatch: Dispatch) => {
// 		try {
// 			;
// 			return dispatch(selectVoice(voice));
// 		} catch (error: any) {
// 			alert({ error: error.message });
// 		}
// 	};
// };
// //salir
// const Out = () => {
// 	return async (dispatch: Dispatch) => {
// 		try {
// 			return dispatch(getOut());
// 		} catch (error: any) {
// 			alert({ error: error.message });
// 		}
// 	};
// };

export {
    getThreadInfo, addMessage, getAllMessages, addUserMessage, createNewThread
}


// //GET para mostrar los mensajes
// const responseUser = (data:any) => {
// 	const URL = import.meta.env.VITE_API_URL
// 	// console.log("data en response user", data);
// 	//comentar al activar ruta 

// 	return async (dispatch: Dispatch) => {
// 		try {

// 			//usando simulacion
// 			// const response = responseApi.data[currentIndex];
// 			// Incrementa el índice para la próxima llamada comentar cuanactive ruta
// 			// currentIndex = (currentIndex + 1) % responseApi.data.length;
// 			// const msj = { type: 'NP_AI', content: response.message, timestamp: new Date().toString(), thread_id: response.thread_id }

// 			// usando api OpenAI
// 			const response = await axios.post(`${URL}/preguntas`, data);

// 			const msj = { type: 'NP_AI', content: response.data.message, timestamp: new Date().toString(), thread_id: response.data.thread_id }
// 			console.log(msj);

// 			// await addMessageToLocalStorage(msj)
// 			return dispatch(messageAI());



// 		} catch (error) {
// 			console.error('error en responseUser', error);
// 		}
// 	};
// };
// //comparar local storage con estado global
// const compareMessages = () => {
// 	return async (dispatch: Dispatch) => {
// 		try {
// 			const messages = ""
// 			return dispatch(compare(messages));
// 		} catch (error: any) {
// 			alert({ error: error.message });
// 		}
// 	};
// };