import React from "react";
import s from './profile.module.css';
import {AboutMe} from "./AboutMe/AboutMe";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";

type ProfileProps = {
    profile: ProfileType
    status: string
    updateStatus: (newStatus: string) => any
    isOwner: boolean
    savePhoto: (files: FileList) => void;
}

export const Profile = (props: ProfileProps) => {
    return (
        <div className={s.profile}>
            <AboutMe savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}