"use client"

const EmojisList = ({ emojis }: { emojis: string[] }) => {
  return <ul>{emojis?.map((emoji) => <li key={emoji}>{emoji}</li>)}</ul>
}

export default EmojisList
