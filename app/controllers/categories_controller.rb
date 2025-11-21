class CategoriesController < ApplicationController
  def show
    category = Category
      .includes(topics: [ :user, :category, messages: :user ])
      .find(params[:id])
      .as_json(include: [
        topics: { include: [ :user, :category, messages: { include: :user } ] }
      ])

    render inertia: {
      category:,
      # something_expensive: -> { something_expensive }
      something_expensive: something_expensive
    }
  end

  private

  def something_expensive
    sleep 2
    "this takes a long time to compute"
  end
end
