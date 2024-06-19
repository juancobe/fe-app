'use client'

import { Dispatch, SetStateAction, createContext, useState } from "react"
import { User } from "../../../../api"
import SearchForm from "../SearchForm/SearchForm"
import RegisterUserForm from "../RegisterUserForm/RegisterUserForm"

import styles from "./usersComponent.module.css";

interface UserContextType {
    allUsers: User[],
    setAllUsers: Dispatch<SetStateAction<User[]>>,
    setSearchResult: Dispatch<SetStateAction<User[]>>
}

const userContextDefault = {
    allUsers: [],
    setAllUsers: () => {},
    setSearchResult: () => {}
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
                    <ul>
                        {Object.keys(displayUser).map((key) => {
                            return (
                                <li key={`${displayUser.id}-${key}`}>{`${key}: ${displayUser[key as keyof User]}`}</li>
                            )
                        })}
                    </ul>
                </section>
            ))}

            {<SearchForm />}

            {<RegisterUserForm />}
        </UserContext.Provider>
    )
}

export default UsersComponent