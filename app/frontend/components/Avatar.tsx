import { Link, router } from '@inertiajs/react'
import { User } from '../types'

const Avatar = ({ user }: { user: User }) => {
  const { username, id } = user;

  if (!user) {
    return null;
  }

  const handleClick = (url: string) => {
    router.push({
      url,
      props: (currentProps) => ({ ...currentProps, user_profile_id: id }),
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <Link
      href=""
      data={{ user_profile_id: id }}
      only={['user_profile', 'user_profile_id']}
      className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs font-medium"
      title={username}
      // preserveUrl // If we don't want shareable links
      onBefore={(e) => handleClick(e.url.toString())}
    >
      {username.charAt(0).toUpperCase()}
    </Link>
  )
}

export default Avatar
