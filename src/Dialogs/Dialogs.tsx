import React from "react";
import {AddMessageForm} from "./AddMessageForm";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {MessageType} from "../store/dialogs-reducer";



export const Dialogs = () => {

    const messages = useSelector<AppRootStateType, Array<MessageType>>(st => st.dialogs.messages)

    return <div>
        {messages.map(m => <div key={m.id}>{m.message}</div>)}
        <AddMessageForm/>
    </div>
}