'use client'

import { Dispatch, SetStateAction, createContext, useState } from "react"
import { User } from "../../../../api"
import SearchForm from "../SearchForm/SearchForm"
import RegisterUserForm from "../RegisterUserForm/RegisterUserForm"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';

import Avatar from '@mui/material/Avatar';
import styles from "./usersComponent.module.css";

interface UserContextType {
    allUsers: User[],
    setAllUsers: Dispatch<SetStateAction<User[]>>,
    setSearchResult: Dispatch<SetStateAction<User[]>>
}

const userContextDefault = {
    allUsers: [],
    setAllUsers: () => { },
    setSearchResult: () => { }
}

export const UserContext = createContext<UserContextType>(userContextDefault);

const UsersComponent = ({ users }: { users: User[] }) => {
    const [allUsers, setAllUsers] = useState(users)
    const [searchResult, setSearchResult] = useState<User[]>([])

    const displayUsers = searchResult?.length ? searchResult : allUsers

    return (
        <UserContext.Provider value={{ allUsers, setAllUsers, setSearchResult }}>
            <div>These are the users registered</div>
            {displayUsers?.map((displayUser) => (
                <section key={`${displayUser.id}`} className={styles.section}>
                    <List>
                        {Object.keys(displayUser).map((key) => {
                            return (
                                <ListItem key={`${displayUser.id}-${key}`}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${key}: ${displayUser[key as keyof User]}`}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </section>
            ))}

            {<SearchForm />}

            {<RegisterUserForm />}
        </UserContext.Provider>
    )
}

export default UsersComponent