class MessagesController < ApplicationController
  def create
    topic = Topic.find(params[:topic_id])
    message = topic.messages.build(message_params.merge(user: current_user))
    if message.save
      redirect_to topic_path(topic)
    else
      redirect_to topic_path(topic), inertia: { errors: message.errors }
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
