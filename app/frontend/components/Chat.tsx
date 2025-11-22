import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";
import ChatDrawer from "@/components/ChatDrawer";
import {useCable} from "@/hooks/use-cable";
import {ChatMessage, User} from "@/types";
import {router, usePage} from "@inertiajs/react";
import {useState} from "react";


export default function Chat() {
  const { props: { current_user: currentUser } } = usePage()
  const { username } = currentUser || {} as User

  const [chatDrawerOpen, setChatDrawerOpen] = useState(false)
  const { perform } = useCable("ChatChannel", {enabled: !!username}, (chatMessage: ChatMessage) => {
    router.prependToProp('chat_messages', chatMessage)
  })

  return (<>
    <button
      onClick={() => setChatDrawerOpen(true)}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-sky-600 text-white px-3 py-8 rounded-l-lg shadow-lg hover:bg-sky-700 transition-colors duration-200 flex items-center justify-center cursor-pointer"
      aria-label="Open chat"
    >
      <ChatBubbleLeftRightIcon className="h-6 w-6"/>
    </button>
    <ChatDrawer
      open={chatDrawerOpen}
      onClose={() => setChatDrawerOpen(false)}
      currentUser={currentUser}
      onSend={(body: string) => perform('speak', {body})}
    />
  </>)
}
