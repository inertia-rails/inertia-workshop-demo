module Searchable
  extend ActiveSupport::Concern

  included do
    inertia_share search_results: -> {
      return {
        topics: [],
        query: params[:q]
      } unless params[:q].present?

      topics = Topic
        .includes(:user, :category, messages: :user)
        .left_joins(:messages)
        .where("topics.title LIKE :q OR messages.body LIKE :q", q: "%#{params[:q]}%")
        .order(created_at: :desc)
        .distinct
        .as_json(include: [
          :user,
          :category,
          messages: { include: :user }
        ])

      {
        topics: topics,
        q: params[:q].to_s
      }
    }
  end
end
