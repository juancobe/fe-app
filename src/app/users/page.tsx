
import api from "../../../api"
import UsersComponent from "./UsersComponent/UsersComponent"


const UsersPage = async () => {

    const users = await api.fetchAllUsers()

    return (
        <UsersComponent users={users} />
    )
}

export default UsersPage