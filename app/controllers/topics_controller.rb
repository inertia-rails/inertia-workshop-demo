class TopicsController < ApplicationController
  def index
    @topics = Topic.all
      .includes(:user, :category, messages: :user)
      .order(created_at: :desc)
  end

  def show
    @topic = Topic
      .includes(:user, :category, messages: :user)
      .find(params[:id])
  end
end
