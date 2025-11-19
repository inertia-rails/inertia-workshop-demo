class TopicsController < ApplicationController
  def index
    topics = Topic.all
      .includes(:user, :category, messages: :user)
      .order(created_at: :desc)
      .as_json(include: [
        :user,
        :category,
        messages: { include: :user }
      ])

    render inertia: { topics: }
  end

  def show
    topic = Topic
      .includes(:user, :category, messages: :user)
      .find(params[:id])
      .as_json(include: [
        :user,
        :category,
        messages: { include: :user }
      ])
    render inertia: { topic: }
  end
end
