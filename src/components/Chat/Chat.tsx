import { useEffect, useState } from 'react';
import '../../scss/components/Chat.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { addMessage, addUserMessage, cleanChat, deleteThread, getAllMessages } from '../../Redux/Actions/MessageGet';
// import { useParams } from 'react-router-dom';
import Thread from '../../Models/Thread';
import Project_StageModel from '../../Models/Project_Stage';
import { RxClipboardCopy } from "react-icons/rx";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MessageModel from '../../Models/Message';
import SendMessageModel from '../../Models/SendMessageModel';
import loader from '../../assets/images/loading.gif'
// import { UserState } from '../../Redux/Actions/UserSlice';
import { GiBroom } from 'react-icons/gi';
import 'balloon-css';
import { LiaClipboardCheckSolid } from 'react-icons/lia';
import Swal from 'sweetalert2';
import CodeFragment from '../CodeFragment/CodeFragment';

const Chat = () => {

  const threadSelected: Thread = useAppSelector((state: any) => state.messages.threadSelected);
  const ProjectStageInfo: Project_StageModel = useAppSelector((state: any) => state.stages.projectStageInfo);
  const stageMessages: MessageModel[] = useAppSelector((state: any) => state.messages.messages);
  // const userActive: UserState = useAppSelector((state: any) => state.user);
  const stage: any = useAppSelector((state: any) => state.stages.stageSelected);
  // const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [assistantCopy, setAssistantCopy] = useState(false);
  const [threadCopy, setThreadCopy] = useState(false);
  const dispatch = useAppDispatch()


  // const { projectId } = useParams();
  // const containerRef = useRef(null);

  // console.log("userActive", userActive);
  // console.log("stage en el chat", stage);
  // console.log("project en el chat", projectId);
  // console.log("ProjectStageInfo", ProjectStageInfo);
  // console.log("threadSelected", threadSelected);
  console.log("stageMessages en chat", stageMessages);

  useEffect(() => {
    if (threadSelected.thread_id) {
      dispatch(getAllMessages(threadSelected.thread_id))
    }
  }, [threadSelected]);


  useEffect(() => {
    setAssistantCopy(false)
    setThreadCopy(false)
  }, [stage]);

  const sendMessage = async () => {
    // Enviar mensaje del usuario al backend
    try {
      const messageUser: SendMessageModel = {
        thread_id: threadSelected.thread_id,
        message: inputValue,
        ass_id: ProjectStageInfo.assistant_id,
        sender: "user"
      }
      dispatch(addUserMessage(messageUser))
      setLoadingMsg(true)
      // console.log(loadingMsg);
      setInputValue('');
      const responseOpenai = await dispatch(addMessage(messageUser));
      console.log(responseOpenai);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoadingMsg(false); // Esto se ejecutará independientemente del resultado de la petición
      // console.log(loadingMsg);
    }
  };

  const handleCleanThread = async () => {
    console.log("limpiando hilo");
    Swal.fire({
      heightAuto: false,
      title: "Are you sure?",
      text: "This action will delete your thread and messages",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete thread!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteThread(threadSelected.thread_id))
          .then((result: any) => {
            // console.log("result del delete",result);
            if (result.data.message == "Thread deleted") {
              dispatch(cleanChat())
              Swal.fire({
                heightAuto: false,
                title: "Deleted!",
                text: "Your thread has been deleted.",
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
      }
    });
  }
  console.log(threadCopy);
  console.log(assistantCopy);

  const handlecopyText = (target: string) => {
    if (target == "thread") {
      setAssistantCopy(false);
      setThreadCopy(true)
    } else {
      setAssistantCopy(true);
      setThreadCopy(false)
    }

  }
  // stageMessages.map((msj) => console.log("typeof mensaje", typeof (msj.message)))
  // console.log("detemina mostrar o no loader", loadingMsg);
  // console.log("detemina mostrar o no loader", loadingMsg);
  return (

    <div className="chat-container">
      {Object.keys(stage).length ? <div className='container_all'>
        <div className='container_title'>
          <div className='thread_assistant'> <button onClick={handleCleanThread} className='btn_clean' aria-label="Clean thread" data-balloon-pos="down"><GiBroom className='clean_ico' /></button> Thread: <div className='thread_content'>
            <CopyToClipboard text={threadSelected.assistant_thread_id}
              onCopy={() => {
                handlecopyText("thread");
              }}>
              {threadCopy ? <span className='Assisstant_copied'>{threadSelected.assistant_thread_id}<LiaClipboardCheckSolid className='ico-copied' /> <p className='textoCopiado'>copied!</p> </span> : <span>{threadSelected.assistant_thread_id}<RxClipboardCopy className='ico-copy' /></span>}
            </CopyToClipboard></div></div>

          <div className='thread_assistant'>Assistant: <div className='thread_content'>
            <CopyToClipboard text={ProjectStageInfo.assistant_id}
              onCopy={() => {
                handlecopyText("assist");
              }}>
              {assistantCopy ? <span className='Thread_copied'>{ProjectStageInfo.assistant_id}<LiaClipboardCheckSolid className='ico-copied'></LiaClipboardCheckSolid> <p className='textoCopiado'>copied!</p></span> : <span>{ProjectStageInfo.assistant_id}<RxClipboardCopy className='ico-copy' /></span>}
              {/* <span>{ProjectStageInfo.assistant_id}<RxClipboardCopy className='ico-copy' /></span> */}
            </CopyToClipboard></div></div>
          {/* 
          <div className='thread_assistant'>Assistant: <div className='thread_content'>{ProjectStageInfo.assistant_id}</div> <RxClipboardCopy className='ico-copy' /></div> */}
        </div>
        <div className="chat-messages">
          {stageMessages.map((msg, index) => (
            <div key={index} className="message">
              {msg.sender === "user" ? (
                <div className="msgUser">
                  <div className={msg.sender}></div>
                  <div className='messageText'>{msg.message}</div>
                </div>
              ) : !Array.isArray(msg.message) ?
                (
                  <div className="msgAssistant">
                    <div className={msg.sender}></div>
                    <div className='messageText'>{msg.message}</div>
                  </div>
                ) : <div className='msgAssistantCode'>
                  <div className="msgAssistant">
                    <div className={msg.sender}></div>

                  </div>
                  <div key={msg.message_id} className='msgWithCode'>
                    {msg.message.map((msgCod: any, index: any) => !msgCod.isCode ?
                      <div className='code_Text' key={index}>{msgCod.content}</div>
                      : <div className="msgAssistant">
                        <CodeFragment code={msgCod.content} />
                      </div>)}
                  </div>

                </div>

              }
            </div>
          ))}

          {/* {stageMessages.map((msg, index) => (
            <div key={index} className="message">
              {msg.sender === "user" ? (
                <div className="msgUser">
                  <div className={msg.sender}></div>
                  <div>{msg.message}</div>
                </div>
              ) : (
                <div className="msgAssistant">
                  <div className={msg.sender}></div>
                  <div>{msg.message}</div>
                </div>
              )}
            </div>
          ))} */}
          {<div className='loaderDiv'>{loadingMsg && <img src={loader} alt="" className="loader" />}</div>}
        </div>
        <form className="chat-input" onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter your message...'
          />
          <button type="submit" className='btn' disabled={loadingMsg}>Send</button>
        </form>
      </div>
        : <div className='selectAnyStage'> Select stage</div>}
    </div>
  );
};

export default Chat;