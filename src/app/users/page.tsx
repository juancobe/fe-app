
import api from "../../../api"
import UsersComponent from "./UsersComponent/UsersComponent"


const UsersPage = async () => {
    try {
        const users = await api.fetchAllUsers();
        return <UsersComponent users={users} />;
    } catch (error: any) {
        // Handle error, show error message to user, etc.
        return <div>Error fetching users: {error.message}</div>;
    }
};

export default UsersPage