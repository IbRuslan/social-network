import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {ActionProfileType, ProfilePageType, profileReducer} from "./profile-reducer";
import {ActionMessagesType, MessagesPageType, messagesReducer,} from "./messages-reducer";
import {ActionUsersType, UsersPageType, userReducer} from "./users-reducer";
import {AuthPageType, authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'

const reducers = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: userReducer,
    auth: authReducer,
    form: formReducer
})

export type RootStateType = {
    profile: ProfilePageType
    messages: MessagesPageType
    users: UsersPageType
    auth: AuthPageType
}

export type ActionType = ActionProfileType | ActionMessagesType | ActionUsersType;

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof reducers>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export default store


// @ts-ignore
window.store = store;

