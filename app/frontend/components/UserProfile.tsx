import {User} from "@/types";

type UserProfileProps = {
  user: User
  onClose: () => void
}

export default function UserProfile({user, onClose}: UserProfileProps) {
  const { username, email, topicsCount, messagesCount, aboutMe } = user || {};

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <p className="text-sm text-gray-900">{username}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <p className="text-sm text-gray-900">{email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topics
          </label>
          <p className="text-sm text-gray-900">{topicsCount}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Messages
          </label>
          <p className="text-sm text-gray-900">{messagesCount}</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About Me
        </label>
        <p className="text-sm text-gray-900 whitespace-pre-wrap">
          {aboutMe || 'No bio available.'}
        </p>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
