import { Link, usePage } from '@inertiajs/react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Category, User } from '../../types'
import Luna from '../../assets/luna.gif'
import MetaTags from '../../components/MetaTags'

export default function LandingIndex() {
  const { props: { categories, current_user: currentUser } } = usePage<{ categories: Category[], current_user: User }>();

  return (
    <>
      <MetaTags />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-sky-600">
                  P&P
                </Link>
              </div>

              <div className="flex items-center space-x-6">
                <Link
                  href="/topics"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Topics
                </Link>

                <Menu as="div" className="relative">
                  <MenuButton className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                    Categories
                    <ChevronDownIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                  </MenuButton>

                  <MenuItems
                    anchor="bottom start"
                    className="z-[60] mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0"
                  >
                    <div className="py-1">
                      {categories.map((category: Category) => (
                        <MenuItem key={category.id}>
                          <a
                            href={`/categories/${category.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {category.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!currentUser && (<a
                href="/users/sign_up"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Sign Up
              </a>
              )}
              {currentUser && (
                <>
                  <Link
                    href="/topics"
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow inline-block text-center"
                  >
                    See What's Brewing
                  </Link>
                  <Link
                    href="/users/sign_out"
                    method="delete"
                    className="ml-3 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
                  >
                    Log Out
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 lg:w-2/3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Pups & Pourovers
              </h1>
              <p className="text-xl md:text-xl text-gray-400 mb-8 leading-relaxed">
                The home for caffeine fueled dog lovers
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/topics"
                  className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-lg text-base font-medium transition-colors shadow-md inline-block text-center"
                >
                  See What's Brewing
                </Link>
              </div>
            </div>

            <div className="flex-1 lg:w-1/3 flex justify-center lg:justify-end">
              <div className="w-full max-w-md aspect-square flex items-center justify-center">
                <img src={Luna} alt="Luna the dog with coffee" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}