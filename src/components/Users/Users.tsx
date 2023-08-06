import React from 'react';
import s from './users.module.css'
import userPhoto from '../../img/avatar/userPhoto.png'
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {follow, unFollow} from "../../api/api";

type UsersTypeProps = {
    users: Array<UsersType>
    totalCount: number
    pageSize: number
    currentPage: number
    follow: (id: number) => void
    unFollow: (id: number) => void
    currentPageChanged: (p: number) => void
    isFetching: boolean
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
        unFollow(id)
            .then(data => {
                if(data.resultCode === 0) {
                    props.unFollow(id)
                }
            })
    }
    const onClickFollowHandler = (id: number) => {
        follow(id)
            .then(data => {
                if(data.resultCode === 0) {
                    props.follow(id)
                }
            })
    }
    return (
        <div className={s.container}>
            <div className={s.selects}>
                {
                    pages.map(p => <span onClick={() => props.currentPageChanged(p)} key={p}
                                         className={props.currentPage === p ? s.select : ''}>{p}</span>)
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
                                ? <button onClick={() => onClickUnFollowHandler(u.id)}>UnFollow</button>
                                : <button onClick={() => onClickFollowHandler(u.id)}>Follow</button>
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