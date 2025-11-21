import { Head } from '@inertiajs/react'

import AppLayout from '@/layouts/AppLayout'
import type { TopicsIndex } from '@/types'
import TopicsTable from '@/components/TopicsTable'

function TopicsIndex({ topics }: TopicsIndex ) {
  return (
    <AppLayout>
      <Head title="Topics - Pups & Pourovers" />

      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <TopicsTable topics={topics} />
        </div>
      </div>
    </AppLayout>
  )
}

export default TopicsIndex
