import React from 'react';
import s from "../messages.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {MessagesPageType} from "../../../redux/messages-reducer";

export const Message = () => {

    const message = useSelector<AppRootStateType, MessagesPageType>(state => state.messages)

    return (
        <div className={s.messages}>
            <div className={s.messages__other}>
                <div className={s.message}>
                    <div className={s.message__text}>
                        Привет! Как дела?
                    </div>
                    <div className={s.message__time}>
                        10:00
                    </div>
                </div>
            </div>
            <div className={s.messages__mine}>
                {message.messagesData.map(m =>
                    <div className={s.message} key={m.id}>
                        <div className={s.message__text}>
                            {m.message}
                        </div>
                        <div className={s.message__time}>
                            10:10
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}