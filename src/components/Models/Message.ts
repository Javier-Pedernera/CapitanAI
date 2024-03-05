interface MessageModel {
    message_id: string | undefined;
    thread_id: string;
    message: string;
    timestamp: string |undefined;
    sender: string |undefined
}

export default MessageModel;