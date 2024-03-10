import { useEffect, useState } from 'react';
import '../../scss/components/Chat.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { addMessage, addUserMessage, cleanChat, deleteThread, getAllMessages } from '../../Redux/Actions/MessageGet';
// import { useParams } from 'react-router-dom';
import Thread from '../Models/Thread';
import Project_StageModel from '../Models/Project_Stage';
import { RxClipboardCopy } from "react-icons/rx";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MessageModel from '../Models/Message';
import SendMessageModel from '../Models/SendMessageModel';
import loader from '../../assets/images/loading.gif'
// import { UserState } from '../../Redux/Actions/UserSlice';
import { GiBroom } from 'react-icons/gi';
import 'balloon-css';
import { LiaClipboardCheckSolid } from 'react-icons/lia';
import Swal from 'sweetalert2';

const Chat = () => {

//   const ejemploCODE = {info:
//    ` Empecemos por el modelo.
// <CODE>Archivo: project_stage.py (ubicado en la carpeta /models)
// from app import db
// class ProjectStage(db.Model):
//     __tablename__ = 'project_stages'
//     project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'), primary_key=True)
//     stage_id = db.Column(db.Integer, db.ForeignKey('stages.stage_id'), primary_key=True)
//     assistant_id = db.Column(db.String(50))
//     stage_description = db.Column(db.Text)
//     def serialize(self):
//         return {
//             "project_id": self.project_id,
//             "stage_id": self.stage_id,
//             "assistant_id": self.assistant_id,
//             "stage_description": self.stage_description
//         }
//     def __init__(self, project_id, stage_id, assistant_id=None, stage_description=None):
//         self.project_id = project_id
//         self.stage_id = stage_id
//         self.assistant_id = assistant_id
//         self.stage_description = stage_description
//     def __repr__(self):
//         return f"<ProjectStage {self.project_id}-{self.stage_id}: {self.assistant_id}>"
// </CODE>`
//   }

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
  // console.log("stageMessages", stageMessages);

  useEffect(() => {
    if (threadSelected.thread_id) {
      dispatch(getAllMessages(threadSelected.thread_id))
    }
  }, [threadSelected]);

  const sendMessage = async () => {
    // Enviar mensaje del usuario al backend
    try {
      const messageUser: SendMessageModel = {
        thread_id: threadSelected.thread_id,
        message: inputValue,
        ass_id: ProjectStageInfo.assistant_id,
        sender: "user"
      }
      // console.log(messageUser);
      dispatch(addUserMessage(messageUser))
      setLoadingMsg(true)
      await dispatch(addMessage(messageUser));
      setLoadingMsg(false)
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
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

  return (

    <div className="chat-container">
      {Object.keys(stage).length ? <div className='container_all'>
        <div className='container_title'>
          <div className='thread_assistant'> <button onClick={handleCleanThread} className='btn_clean' aria-label="Clean thread" data-balloon-pos="down"><GiBroom className='clean_ico' /></button> Thread: <div className='thread_content'>
            <CopyToClipboard text={threadSelected.assistant_thread_id}
              onCopy={() => {
                setThreadCopy(true);
                setAssistantCopy(false)
              }}>
              {assistantCopy ? <span className='Assisstantcopied'>{threadSelected.assistant_thread_id}<LiaClipboardCheckSolid className='ico-copied' /></span> : <span>{threadSelected.assistant_thread_id}<RxClipboardCopy className='ico-copy' /></span> }
            </CopyToClipboard></div></div>

          <div className='thread_assistant'>Assistant: <div className='thread_content'>
            <CopyToClipboard text={ProjectStageInfo.assistant_id}
              onCopy={() => {
                setAssistantCopy(true);
                setThreadCopy(false)
              }}>
              {threadCopy ?  <span className='Threadcopied'>{ProjectStageInfo.assistant_id}<LiaClipboardCheckSolid className='ico-copied'></LiaClipboardCheckSolid></span> : <span>{ProjectStageInfo.assistant_id}<RxClipboardCopy className='ico-copy' /></span> }
              {/* <span>{ProjectStageInfo.assistant_id}<RxClipboardCopy className='ico-copy' /></span> */}
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