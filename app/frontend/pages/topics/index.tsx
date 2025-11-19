import { Head } from '@inertiajs/react'
import AppLayout from '../../layouts/AppLayout'
import { Topic } from '../../types'
import TopicsTable from '../../components/TopicsTable'

function TopicsIndex({ topics, trending_topics }: { topics: Topic[], trending_topics: number[] }) {
  return (
    <AppLayout>
      <Head title="Topics - Pups & Pourovers" />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <TopicsTable topics={topics} trendingTopics={trending_topics} />
        </div>
      </div>
    </AppLayout>
  )
}

export default TopicsIndex