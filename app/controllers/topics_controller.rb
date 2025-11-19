class TopicsController < ApplicationController
  before_action :verify_user, except: [ :index, :show ]

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

  def new
    topic = Topic.new(category_id: params.dig(:topic, :category_id))

    render inertia: { topic: }
  end

  def create
    topic_form = TopicForm.new(topic_params.merge(user: current_user))

    if topic_form.save
      redirect_to topic_form.topic, notice: "Topic created successfully"
    else
      redirect_to new_topic_path, inertia: { errors: topic_form.errors }
    end
  end

  private

  def topic_params
    params.require(:topic).permit(:title, :category_id, messages_attributes: [ :body ])
  end

  def verify_user
    redirect_to topics_path unless current_user
  end
end
