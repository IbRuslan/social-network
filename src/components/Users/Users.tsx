import React from 'react';
import s from './users.module.css'
import userPhoto from '../../img/avatar/userPhoto.png'
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersTypeProps = {
    users: Array<UsersType>
    totalCount: number
    pageSize: number
    currentPage: number
    follow: (id: number) => any
    unFollow: (id: number) => any
    currentPageChanged: (p: number) => void
    isFetching: boolean
    InProgress: number[]
}

export const Users = (props: UsersTypeProps) => {

    const pagesCount = Math.ceil(props.totalCount / props.pageSize);

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 10) {
            pages.push(i)
        }
    }

    const onClickUnFollowHandler = (id: number) => {
        props.unFollow(id)
        // unFollow(id)
        //     .then(data => {
        //         if(data.resultCode === 0) {
        //             props.unFollow(id)
        //         }
        //         props.followingInProgress(false, id)
        //     })
    }
    const onClickFollowHandler = (id: number) => {
        props.follow(id)
        // follow(id)
        //     .then(data => {
        //         if(data.resultCode === 0) {
        //             props.follow(id)
        //         }
        //         props.followingInProgress(false, id)
        //     })
    }
    return (
        <div className={s.container}>
            <div className={s.selects}>
                {
                    pages.map(p =>
                        <span onClick={() => props.currentPageChanged(p)} key={p} className={props.currentPage === p ? s.select : ''}>{p}</span>)
                }
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div className={s.container_img}>
                            <NavLink to={'profile/' + u.id}>
                                <img
                                    src={u.photos.small ? u.photos.small : userPhoto}
                                    alt="ava"/>
                            </NavLink>

                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.InProgress.some(id => id === u.id)} onClick={() => onClickUnFollowHandler(u.id)}>UnFollow</button>
                                : <button disabled={props.InProgress.some(id => id === u.id)} onClick={() => onClickFollowHandler(u.id)}>Follow</button>
                            }
                        </div>
                    </span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                    </div>
                )
            }
        </div>
    )
};