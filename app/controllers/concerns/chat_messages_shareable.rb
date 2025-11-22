module ChatMessagesShareable
  extend ActiveSupport::Concern

  included do
    inertia_share do
      collection = ChatMessage.includes(:user).order(created_at: :desc)

      pagy, records = pagy(collection)

      {
        chat_messages: InertiaRails.scroll(pagy) do
          records.as_json(include: { user: { only: :username } })
        end
      }
    end
  end
end
