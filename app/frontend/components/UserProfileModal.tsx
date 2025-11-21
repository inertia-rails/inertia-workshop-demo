import Modal from './Modal'
import {router, usePage} from '@inertiajs/react'

import LoadingSpinner from '@/components/LoadingSpinner';
import UserProfile from '@/components/UserProfile';
import type {User} from '@/types'

export default function UserProfileModal() {
  const {props: {user_profile_id: userProfileId, user_profile: userProfile}} = usePage<{
    user_profile_id: number,
    user_profile: User
  }>()

  const isLoading = userProfileId && !userProfile;

  const handleClose = () => {
    const pathname = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    params.delete('user_profile_id');

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.visit(url, {
      preserveScroll: true,
      preserveState: true,
      onBefore: (e) => {
        router.push({
          url: e.url.toString(),
          props: (currentProps) => ({...currentProps, user_profile_id: null}),
          preserveState: true,
          preserveScroll: true,
        })
      }
    })
  }

  return (
    <Modal isOpen={!!userProfileId} onClose={handleClose} title='User Profile'>
      {isLoading ? (
        <LoadingSpinner/>
      ) : (
        <UserProfile user={userProfile} onClose={handleClose}/>
      )}
    </Modal>
  )
}
