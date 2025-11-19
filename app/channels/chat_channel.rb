class ChatChannel < ApplicationCable::Channel
  def subscribed
    reject unless current_user
    stream_from "chat"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    return unless current_user

    message = ChatMessage.create!(
      body: data["body"],
      user: current_user
    )

    ActionCable.server.broadcast("chat", {
      id: message.id,
      body: message.body,
      user: { username: message.user.username },
      created_at: message.created_at
    })
  end
end
