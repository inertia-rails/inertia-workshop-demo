import { ReactNode, useState, useCallback, useRef } from 'react'
import { Link, usePage, router, Form } from '@inertiajs/react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

import { Topic } from '../types'
import Sidebar from "@/components/Sidebar";
import { debounce } from '../utils/debounce'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const {
    props: {
      current_user: currentUser,
      search_results: searchResults
    },
  } = usePage()

  const { topics, q } = searchResults
  const { username } = currentUser || {}

  const debouncedSearch = useCallback(
    debounce((q: string) => {
      router.reload({ only: ['search_results'], data: { q }, preserveUrl: true })
    }, 500),
    []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    debouncedSearch(value)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const handleEscapeKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="group flex-1 max-w-lg relative">
              <Form
                action="/search"
                method="get"
                resetOnSuccess
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="query"
                    placeholder="Search"
                    onChange={handleSearchChange}
                    onKeyDown={handleEscapeKey}
                    ref={inputRef}
                    defaultValue={q}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
              </Form>

              <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 max-h-96 overflow-y-auto hidden group-focus-within:block">
                <div className="py-1">
                  {topics && topics.map((topic: Topic) => (
                    <Link
                      key={topic.id}
                      href={`/topics/${topic.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-sm font-medium text-sky-700">
                        {topic.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {topic.category.name}
                      </div>
                    </Link>
                  ))}
                  {topics.length === 0 && (
                    <div className="block px-4 py-3 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-6">
            <div className="flex items-center space-x-3">
              {currentUser && (
                <>
                  <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white text-sm font-medium">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className="relative">
                    <Menu as="div" className="relative">
                      <MenuButton className="flex items-center space-x-1 text-sm text-gray-700 hover:text-gray-900 focus:outline-none">
                        <span>Account</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </MenuButton>

                      <MenuItems
                        anchor="bottom end"
                        className="z-[60] mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 focus:outline-none"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <Link
                              href="/users/sign_out"
                              method="delete"
                              as="button"
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                              onSuccess={() => router.clearHistory()}
                            >
                              Logout
                            </Link>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </>
              )}
              {!currentUser && (
                <a href="/users/sign_up" className="text-sm text-gray-700 hover:text-gray-900">
                  Sign Up
                </a>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
