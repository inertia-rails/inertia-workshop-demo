import TopicsTable from "@/components/TopicsTable"
import AppLayout from "@/layouts/AppLayout"
import type { CategoriesShow } from "@/types"

function CategoriesShow({ category }: CategoriesShow) {
  const { topics } = category;

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Category: {category.name}</h1>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <TopicsTable topics={topics} />
        </div>
      </div>
    </AppLayout>
  )
}

export default CategoriesShow
