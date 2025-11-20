 class MyTopicsController < ApplicationController
  def index
    @topics = Topic.includes(:user, :category, messages: :user)
      .where(id: current_user.messages.select(:topic_id))
      .order(created_at: :desc)

    # Custom Serializer Selection
    render_inertia(serializer: TopicsIndexResource)
  end
 end
