import {Head, Form, usePage} from '@inertiajs/react'
import AppLayout from '../../layouts/AppLayout'
import LexicalRichTextEditor from '../../components/LexicalRichTextEditor'

interface TopicFormProps {
  topic?: {
    title?: string
    category_id?: number
    messages_attributes?: Array<{ body: string }>
  }
}

const TopicsNew = ({topic}: TopicFormProps) => {
  const {categories} = usePage().props

  return (
    <AppLayout>
      <Head title="New Topic - Pups & Pourovers"/>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">New Topic</h1>
          <Form
            action="/topics"
            method="post"
            disableWhileProcessing
            className="inert:opacity-50 inert:pointer-events-none"
          >
            {({errors, processing}) => (
              <>
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="topic[title]"
                    defaultValue={topic?.title}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter topic title..."
                  />
                  {(errors.title) && (
                    <p className="mt-1 text-sm text-red-600">
                      Title {errors.title}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category_id"
                    name="topic[category_id]"
                    defaultValue={topic?.category_id}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  >
                    <option value="">Select a category...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {(errors.category) && (
                    <p className="mt-1 text-sm text-red-600">
                      Category {errors.category}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="mb-2">
                    <LexicalRichTextEditor
                      name="topic[messages_attributes][0][body]"
                      placeholder="Write your message..."
                    />
                  </div>
                  {(errors['messages[0].body']) && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors['messages[0].body']}
                    </p>
                  )}
                  {(errors.messages) && (
                    <p className="mt-1 text-sm text-red-600">
                      Messages {errors.messages}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Creating Topic...' : 'Create Topic'}
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </AppLayout>
  )
}

export default TopicsNew
