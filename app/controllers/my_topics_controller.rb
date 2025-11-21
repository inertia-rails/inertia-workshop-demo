 class MyTopicsController < ApplicationController
  before_action :verify_user
  def index
    topics = Topic.includes(:user, :category, messages: :user)
      .joins(:messages)
      .where(messages: { user_id: current_user.id })
      .distinct
      .order(created_at: :desc)
      .to_a
      .as_json(include: [
        :user,
        :category,
        messages: { include: :user }
      ])

    render inertia: { topics: }
  end

  private

  def verify_user
    redirect_to topics_path unless current_user
  end
 end
