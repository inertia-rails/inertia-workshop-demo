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

    render inertia: { topics: }, meta: [
      { title: "Topics - Pups & Pourovers" },
      { name: "description", content: "Browse topics on Pups & Pourovers" }
    ]
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
    render inertia: { topic: }, meta: [
      { title: "#{topic["title"]} - Pups & Pourovers" },
      { name: "description", content: "#{topic["title"]} - Pups & Pourovers" }
    ]
  end
end
