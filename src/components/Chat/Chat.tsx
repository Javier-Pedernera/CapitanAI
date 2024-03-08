import React, { useEffect, useRef, useState } from 'react';
import '../../scss/components/Chat.scss';
// import CreateStage from '../Models/CreateStage';
// import { getStagesById } from '../../Redux/Actions/StagesGet';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { addMessage, addUserMessage, createNewThread, getAllMessages, getThreadInfo } from '../../Redux/Actions/MessageGet';
import { useParams } from 'react-router-dom';
import Stage from '../Models/Stage';
import Thread from '../Models/Thread';
import { selectProyect_StageByIds } from '../../Redux/Actions/StagesGet';
import Project_StageModel from '../Models/Project_Stage';
import { RxClipboardCopy } from "react-icons/rx";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MessageModel from '../Models/Message';
import SendMessageModel from '../Models/SendMessageModel';
import loader from '../../assets/images/loading.gif'
import { UserState } from '../../Redux/Actions/UserSlice';

interface Props {
  stage: Stage
}

const Chat: React.FC<Props> = ({ stage }) => {

  const threadSelected: Thread = useAppSelector((state: any) => state.messages.threadSelected);
  const ProjectStageInfo: Project_StageModel = useAppSelector((state: any) => state.stages.projectStageInfo);
  const stageMessages: MessageModel[] = useAppSelector((state: any) => state.messages.messages);
  const userActive: UserState = useAppSelector((state: any) => state.user);
  // const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loadingMsg, setLoadingMsg] = useState(false);
  const dispatch = useAppDispatch()
  const { projectId } = useParams();
  const containerRef = useRef(null);

  console.log("userActive", userActive);
  console.log("stage en el chat", stage);
  console.log("project en el chat", projectId);
  console.log("ProjectStageInfo", ProjectStageInfo);
  console.log("threadSelected", threadSelected);
  console.log("stageMessages", stageMessages);
  console.log(threadSelected);

  useEffect(() => {
    if (projectId && Object.keys(stage).length) {
      dispatch(getThreadInfo(projectId, stage.id))
      dispatch(selectProyect_StageByIds(projectId, stage.id))
      // dispatch(getAllMessages(threadSelected.thread_id))
    }
  }, [stage]);
  console.log(Object.keys(threadSelected).length);

  useEffect(() => {
    if (!Object.keys(threadSelected).length && Object.keys(stage).length && projectId && userActive.userData) {
      const datathread = {
        "stage_id": stage.id,
        "project_id": projectId,
        "user_public_id": userActive.userData && 'id' in userActive.userData ? userActive.userData.id : null
      }
      console.log(datathread);
      const res = dispatch(createNewThread(datathread))
      console.log(res);
    }
  }, [stage]);
  useEffect(() => {
    if (threadSelected.thread_id) {
      dispatch(getAllMessages(threadSelected.thread_id))
    }
  }, [dispatch, stage, threadSelected]);

  const sendMessage = async () => {
    // Enviar mensaje del usuario al backend
    try {
      const messageUser: SendMessageModel = {
        thread_id: threadSelected.thread_id,
        message: inputValue,
        ass_id: ProjectStageInfo.assistant_id,
        sender: "user"
      }
      console.log(messageUser);
      dispatch(addUserMessage(messageUser))
      // const response = await axios.post('/api/chat', { message: inputValue });
      setLoadingMsg(true)
      const response = await dispatch(addMessage(messageUser));
      setLoadingMsg(false)
      console.log("respuesta del dispatch", response);

      // const responseData = response

      // Actualizar el estado con la respuesta del backend
      // setMessages([...messages, inputValue, responseData]);
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  // console.log("clipboard", CopyToClipboard);

  return (

    <div className="chat-container">
      {Object.keys(stage).length ? <div className='container_all'>
        <div className='container_title'>
          <div className='thread_assistant'>Thread: <div className='thread_content'>
            <CopyToClipboard text={threadSelected.assistant_thread_id}>
              <span>{threadSelected.assistant_thread_id}<RxClipboardCopy className='ico-copy' /></span>
            </CopyToClipboard></div></div>

          <div className='thread_assistant'>Assistant: <div className='thread_content'>
            <CopyToClipboard text={ProjectStageInfo.assistant_id}>
              <span>{ProjectStageInfo.assistant_id}<RxClipboardCopy className='ico-copy' /></span>
            </CopyToClipboard></div></div>
          {/* 
          <div className='thread_assistant'>Assistant: <div className='thread_content'>{ProjectStageInfo.assistant_id}</div> <RxClipboardCopy className='ico-copy' /></div> */}
        </div>
        <div className="chat-messages">
          {stageMessages?.map((msg, index) => (
            <div key={index} className="message">
              {!loadingMsg || index !== stageMessages.length - 1 ? (
                <div className={msg.sender === 'user' ? "msgUser" : "msgAssistant"}>
                  <div className={msg.sender}></div>
                  <div>{msg.message}</div>
                </div>
              ) : (
                <img src={loader} alt="" className='loader' />
              )}
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={(e) => {
          e.preventDefault(); // Evitar el envío del formulario por defecto
          sendMessage(); // Llamar a la función para enviar el mensaje
        }}>
          <input

            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter your message...'
          />
          <button type="submit" className='btn'>Send</button>
        </form>
      </div>
        : <div className='selectAnyStage'> Select stage</div>}
    </div>
  );
};

export default Chat;