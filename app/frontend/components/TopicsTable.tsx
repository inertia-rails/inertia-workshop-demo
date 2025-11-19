import { Link } from '@inertiajs/react'
import { Topic } from '../types'
import Avatar from './Avatar'

function TopicRow({ topic }: { topic: Topic }) {
  const {
    id,
    title,
    category: { name: categoryName },
    user,
    messages,
  } = topic;

  const lastMessage = messages[messages.length - 1];
  const {
    user: lastMessageUser,
  } = lastMessage || {};

  return (
    <tr
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4">
        <Link href={`/topics/${id}`} className="text-sm font-medium text-sky-700">
          {title}
        </Link>
        <br />
        <span className="text-sm text-gray-500 mt-1">{categoryName}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar user={user} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {lastMessageUser && <Avatar user={lastMessageUser} />}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {Math.max(messages.length - 1, 0)}
      </td>
    </tr>
  )
}

export default function TopicsTable({ topics }: { topics: Topic[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Topic
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
            Author
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
            Last Poster
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
            Replies
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {topics.map((topic: Topic) => (
          <TopicRow key={topic.id} topic={topic} />
        ))}
        {topics.length === 0 && (
          <tr>
            <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
              No topics found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}