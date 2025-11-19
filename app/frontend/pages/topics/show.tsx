import { Form } from '@inertiajs/react'
import AppLayout from '../../layouts/AppLayout'
import { Topic, Message, User } from '../../types'
import LexicalRichTextEditor from '../../components/LexicalRichTextEditor'
import ReactMarkdown from 'react-markdown'
import Avatar from '@/components/Avatar'

function MessageRow({ message }: { message: Message }) {
  const {
    user,
    created_at,
    body,
  } = message;
  const { username } = user;

  return (
    <div
      className="p-6 hover:bg-gray-50 transition-colors duration-150"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Avatar user={user} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-sm font-semibold text-gray-900">
              {username}
            </h3>
            <time className="text-xs text-gray-500">
              {new Date(created_at).toLocaleString()}
            </time>
          </div>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopicsShow({ topic, current_user: currentUser }: { topic: Topic, current_user: User }) {
  const {
    title,
    category: { name: categoryName },
    messages,
  } = topic;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-700">
                {categoryName}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {messages.map((message: Message) => (
              <MessageRow key={message.id} message={message} />
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {currentUser && (
            <Form
              action={`/topics/${topic.id}/messages`}
              method="post"
              disableWhileProcessing
              resetOnSuccess
              className="inert:opacity-50 inert:pointer-events-none"
            >
              {({ errors }) => (
                <>
                  {errors.body && (
                    <p className="text-red-500 text-sm pb-4">Reply body {errors.body}</p>
                  )}
                  <div className="mb-4">
                    <LexicalRichTextEditor
                      name="body"
                      placeholder="Write your reply..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors duration-150"
                  >
                    Reply to Topic
                  </button>
                </>
              )}
            </Form>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default TopicsShow