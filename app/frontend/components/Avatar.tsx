import { User } from '../types'

const Avatar = ({ user }: { user: User }) => {
  const { username } = user;

  if (!user) {
    return null;
  }

  return (
    <div
      className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs font-medium"
      title={username}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  )
}

export default Avatar