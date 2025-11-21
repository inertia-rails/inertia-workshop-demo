import { Link, usePage } from "@inertiajs/react";

function getLinkClasses(currentUrl: string, targetUrl: string) {
  const isActive = currentUrl === targetUrl
  return {
    link: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive
      ? 'text-sky-600 bg-sky-50'
      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
      }`,
    count: isActive
      ? 'text-sky-500'
      : 'text-gray-500 group-hover:text-gray-700'
  }
}

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const { props: { categories, current_user: currentUser }, url: currentUrl } = usePage()

  return (
    <aside
      className={`${isOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 ease-in-out bg-white border-r border-gray-200 overflow-hidden flex flex-col`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {isOpen && (
          <Link href="/" className="text-2xl font-bold text-sky-600">
            P&P
          </Link>
        )}
      </div>

      {isOpen && (
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="space-y-1 mb-8">
            <Link
              href="/topics"
              className={getLinkClasses(currentUrl, '/topics').link}
            >
              <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Topics
            </Link>
            {currentUser && (
              <Link
              href="/my_topics"
              className={getLinkClasses(currentUrl, '/my_topics').link}
            >
              <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
                My Topics
              </Link>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const categoryUrl = `/categories/${category.id}`
                const classes = getLinkClasses(currentUrl, categoryUrl)
                return (
                  <Link
                    key={category.name}
                    href={categoryUrl}
                    className={`${classes.link} justify-between group`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs ${classes.count}`}>
                      {category.topicsCount}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      )}
    </aside>
  )
}
