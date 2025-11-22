import { Head, Link } from '@inertiajs/react'
import AppLayout from '../../layouts/AppLayout'
import { Topic, User } from '../../types'
import TopicsTable from '../../components/TopicsTable'

function MyTopicsIndex({ topics, current_user: currentUser }: { topics: Topic[], current_user: User }) {
  return (
    <AppLayout>
      <Head title="My Topics - Pups & Pourovers" />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Topics</h1>
        {currentUser && (
          <Link
          href="/topics/new"
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow inline-block text-center"
        >
            New Topic
          </Link>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <TopicsTable topics={topics} />
        </div>
      </div>
    </AppLayout>
  )
}

export default MyTopicsIndex