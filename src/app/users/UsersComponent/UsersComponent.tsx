'use client'

import { useState } from "react"
import { User } from "../../../../api"
import SearchForm from "../SearchForm/SearchForm"
import RegisterUserForm from "../RegisterUserForm/RegisterUserForm"

import styles from "./usersComponent.module.css";


const UsersComponent = ({ users }: { users: User[] }) => {
    const [allUsers, setAllUsers] = useState(users)
    const [searchResult, setSearchResult] = useState<User[]>()

    const displayUsers = searchResult?.length ? searchResult : allUsers
    return (
        <div>
            <div>These are the users registered</div>
            {displayUsers?.map((displayUsers) => (
                <section key={`${displayUsers.id}`} className={styles.section}>
                    <ul>
                        {Object.keys(displayUsers).map((key) => {
                            return (
                                <li key={`${displayUsers.id}-${key}`}>{`${key}: ${displayUsers[key as keyof User]}`}</li>
                            )
                        })}
                    </ul>
                </section>
            ))}

            {<SearchForm setSearchResult={setSearchResult} />}

            {/* TODO: Instead of passing state and setState, use react context */}
            {<RegisterUserForm allUsers={allUsers} setAllUsers={setAllUsers} />}
        </div>
    )
}

export default UsersComponent