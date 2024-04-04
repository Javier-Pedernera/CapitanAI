import { useEffect, useState } from 'react';
import '../../scss/components/Chat.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { addMessage, addUserMessage, cleanChat, deleteThread, getAllMessages } from '../../Redux/Actions/MessageGet';
import Thread from '../../Models/Thread';
import Project_StageModel from '../../Models/Project_Stage';
import { RxClipboardCopy } from "react-icons/rx";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MessageModel from '../../Models/Message';
import SendMessageModel from '../../Models/SendMessageModel';
import loader from '../../assets/images/loading.gif'
import { GiBroom } from 'react-icons/gi';
import 'balloon-css';
import { LiaClipboardCheckSolid } from 'react-icons/lia';
import Swal from 'sweetalert2';
import CodeFragment from '../CodeFragment/CodeFragment';
import { BsImages } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

const Chat = () => {

  const threadSelected: Thread = useAppSelector((state: any) => state.messages.threadSelected);
  const ProjectStageInfo: Project_StageModel = useAppSelector((state: any) => state.stages.projectStageInfo);
  const stageMessages: MessageModel[] = useAppSelector((state: any) => state.messages.messages);
  const stage: any = useAppSelector((state: any) => state.stages.stageSelected);
  // const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [assistantCopy, setAssistantCopy] = useState(false);
  const [threadCopy, setThreadCopy] = useState(false);
  const dispatch = useAppDispatch()

  // console.log("userActive", userActive);
  // console.log("stage en el chat", stage);
  // console.log("project en el chat", projectId);
  // console.log("ProjectStageInfo", ProjectStageInfo);
  // console.log("threadSelected", threadSelected);
  // console.log("stageMessages en chat", stageMessages);

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
    try {
      const messageUser: SendMessageModel = {
        thread_id: threadSelected.thread_id,
        message: inputValue,
        images: images,
        ass_id: ProjectStageInfo.assistant_id,
        sender: "user"
      }
      dispatch(addUserMessage(messageUser))
      setLoadingMsg(true)
      console.log(loadingMsg);
      setInputValue('');
      setImages([])
      const responseOpenai = await dispatch(addMessage(messageUser));
      console.log(responseOpenai);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoadingMsg(false);
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
  const handleAddImage = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        "accept": "image/*",
        "aria-label": "Upload your profile picture"
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        // const imageBase64 = reader.result;
        setImages(prevImages => [...prevImages, imageUrl]);
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl,
          imageAlt: "The uploaded picture"
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handlecopyText = (target: string) => {
    if (target == "thread") {
      setAssistantCopy(false);
      setThreadCopy(true)
    } else {
      setAssistantCopy(true);
      setThreadCopy(false)
    }

  }

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
            </CopyToClipboard></div></div>
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
          {<div className='loaderDiv'>{loadingMsg && <img src={loader} alt="" className="loader" />}</div>}
        </div>
        <form className="chat-input" onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}>
          <div className='div_images'>
            {images.length > 0 && images.map((image, index) => (
              <div key={index} className='imageContainer'>
                <div className='imageWrapper'>
                  <img src={image} alt={`image-${index}`} className='images_added' />
                  <button onClick={() => handleDeleteImage(index)} className='deleteImageButton' ><MdDeleteForever /></button>
                </div>
              </div>
            ))}
          </div>

          <div className='images_input'>
            <button type='button' onClick={handleAddImage} className='Add_image' aria-label="Add image" data-balloon-pos="up"><BsImages className='sendImage' /></button>
            {/* <button type='button' onClick={handleAddImage} className='Add_image' aria-label="Add image" data-balloon-pos="up"><BsImages className='sendImage' /></button> */}

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Enter your message...'
            />
            <button type="submit" className='btn' disabled={loadingMsg || inputValue == ''}>Send</button>
          </div>
        </form>
      </div>
        : <div className='selectAnyStage'> Select stage</div>}
    </div>
  );
};

export default Chat;