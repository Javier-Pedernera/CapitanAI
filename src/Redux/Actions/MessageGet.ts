// import { Dispatch } from "@reduxjs/toolkit";
// import { messageAI, getOut, selectVoice, messageAdded, compare }from "./MessageSlice";
// import axios from "axios";



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

// // agregar mensajes 
// const addMessage = (msj: any) => {
// 	return async (dispatch: Dispatch) => {
// 		try {
// 			// await addMessageToLocalStorage(msj)
// 			return dispatch(messageAdded(msj));
// 		} catch (error: any) {
// 			alert({ error: error.message });
// 		}
// 	};
// };


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

// export {
// 	compareMessages, responseUser, voiceSelected, addMessage, Out
// }
