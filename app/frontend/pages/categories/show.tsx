import { Link } from "@inertiajs/react";
import TopicsTable from "../../components/TopicsTable"
import AppLayout from "../../layouts/AppLayout"
import { Category, User } from "../../types"

function CategoriesShow({ category, current_user: currentUser }: { category: Category, current_user: User }) {
  const { topics } = category;

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Category: {category.name}</h1>
        {currentUser && (
          <Link
          href={'/topics/new'}
          data={{topic: { category_id: category.id }}}
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

export default CategoriesShow
