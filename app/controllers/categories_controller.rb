class CategoriesController < ApplicationController
  def show
    category = Category
      .includes(topics: [ :user, :category, messages: :user ])
      .find(params[:id])
      .as_json(include: [
        topics: { include: [ :user, :category, messages: { include: :user } ] }
      ])

    render inertia: { category: }, meta: [
      { title: "Category: #{category["name"]} - Pups & Pourovers" },
      { name: "description", content: "Browse topics in the #{category["name"]} category on Pups & Pourovers" }
    ]
  end
end
