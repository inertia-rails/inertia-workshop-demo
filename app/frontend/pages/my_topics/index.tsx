import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/AppLayout'
import type { TopicsIndex } from '@/types'
import TopicsTable from '@/components/TopicsTable'

function MyTopicsIndex({ topics }: TopicsIndex) {
  return (
    <AppLayout>
      <Head title="My Topics - Pups & Pourovers" />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <TopicsTable topics={topics} />
        </div>
      </div>
    </AppLayout>
  )
}

export default MyTopicsIndex
