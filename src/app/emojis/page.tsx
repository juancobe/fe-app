
import api from "../../../api"
import EmojiList from "./EmojiList/EmojiList"


const UsersPage = async () => {

    const emojis = await api.apiFetch('/emojis')

    return (
        <EmojiList emojis={emojis} />
    )
}

export default UsersPage