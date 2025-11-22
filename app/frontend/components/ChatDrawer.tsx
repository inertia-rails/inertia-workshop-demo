import { useState, useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { InfiniteScroll } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import Drawer from './Drawer'
import { ChatMessage, User } from '../types'

interface ChatDrawerProps {
  open: boolean
  onClose: () => void
  currentUser: User
  onSend: (message: string) => void
}

export default function ChatDrawer({ open, onClose, onSend, currentUser }: ChatDrawerProps) {
  const { props } = usePage<{ chat_messages: ChatMessage[] }>()
  const chatMessages = props.chat_messages || []

  const [messageText, setMessageText] = useState('')

  const isCurrentUser = (username: string) => username === currentUser.username
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)


  const AUTO_SCROLL_BUFFER = 200
  useEffect(() => {
    if (scrollContainerRef.current && chatMessages.length > 0) {
      const container = scrollContainerRef.current
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < AUTO_SCROLL_BUFFER

      if (isNearBottom) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        })
      }
    }
  }, [chatMessages.length, chatMessages])

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    onSend(messageText)
    setMessageText('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-y-scroll p-4 [overflow-anchor:auto]" ref={scrollContainerRef}>
        <InfiniteScroll
          data="chat_messages"
          reverse
          onlyNext
          preserveUrl
          autoScroll={true}
          buffer={200}
          className="flex flex-col-reverse"
        >
          {chatMessages.map((message) => {
            const isCurrentUserMessage = isCurrentUser(message.user.username)
            return (
              <div
                key={message.id}
                className={`flex gap-3 mb-4 ${isCurrentUserMessage ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isCurrentUserMessage && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white text-sm font-medium">
                      {message.user.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}

                <div className={`flex flex-col ${isCurrentUserMessage ? 'items-end' : 'items-start'} max-w-[90%]`}>
                  <div
                    className={`px-4 py-2 rounded-lg ${isCurrentUserMessage
                        ? 'bg-sky-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                      }`}
                  >
                    <p className="text-sm">{message.body}</p>
                  </div>
                  <span className="mt-1 text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            )
          })}
        </InfiniteScroll>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </div>
    </Drawer>
  )
}
