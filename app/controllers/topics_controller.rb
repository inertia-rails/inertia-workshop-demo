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

    render inertia: {
      topics: topics,
      trending_topics: calculate_trending_topics(topics)
      # trending_topics: InertiaRails.defer { calculate_trending_topics(topics) }
    }
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

  protected

  def calculate_trending_topics(topics)
    sleep 2 # this is a very manual process!
    topics.sample(3).pluck("id")
  end
end
