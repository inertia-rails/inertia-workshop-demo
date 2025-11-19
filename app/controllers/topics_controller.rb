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

  def new
    topic = Topic.new(category_id: params.dig(:topic, :category_id))

    render inertia: { topic: }
  end

  def create
    topic = current_user.topics.build(topic_params)

    if topic.save(context: :form_submission)
      redirect_to topic, notice: "Topic created successfully"
    else
      redirect_to new_topic_path, inertia: { errors: topic.errors }
    end
  end

  private

  def topic_params
    params.require(:topic).permit(:title, :category_id, messages_attributes: [ :body ])
  end
end
