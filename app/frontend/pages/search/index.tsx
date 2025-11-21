import { Head } from '@inertiajs/react'
import AppLayout from '../../layouts/AppLayout'
import { Topic } from '../../types'
import TopicsTable from '../../components/TopicsTable'

function TopicsIndex({ topics, query }: { topics: Topic[], query: string }) {
  return (
    <AppLayout>
      <Head title={`Search results for "${query}" - Pups & Pourovers`} />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Search results for "{query}"</h1>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <TopicsTable topics={topics} />
        </div>
      </div>
    </AppLayout>
  )
}

export default TopicsIndex