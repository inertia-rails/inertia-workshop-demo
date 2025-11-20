class CategoriesController < ApplicationController
  def show
    @category = Category
      .includes(topics: [ :user, :category, messages: :user ])
      .find(params[:id])
  end
end
