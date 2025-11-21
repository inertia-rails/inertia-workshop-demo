 class MyTopicsController < ApplicationController
  before_action :verify_user
  def index
    @topics = Topic.includes(:user, :category, messages: :user)
      .where(id: current_user.messages.select(:topic_id))
      .order(created_at: :desc)

    # Custom Serializer Selection
    render_inertia(serializer: TopicsIndexResource)
  end

  private

  def verify_user
    redirect_to topics_path unless current_user
  end
 end
