class SearchController < ApplicationController
  def index
    query = params[:query].to_s

    topics = Topic.search(query)
                  .as_json(include: [
                    :user,
                    :category,
                    messages: { include: :user }
                  ])

    render inertia: { topics:, query: }
  end
end
