 class MyTopicsController < ApplicationController
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
 end
