class TopicForm
  include ActiveModel::Model

  attr_accessor :title, :category_id, :user, :messages_attributes, :topic, :user, :category

  validates :title, presence: true
  validates :category, presence: true
  validates :user, presence: true
  validate :message_body_presence

  def initialize(attributes = {})
    attributes.each { |key, value| send("#{key}=", value) }
    @category = Category.find_by(id: category_id)
  end

  def save
    return false unless valid?

    begin
      ActiveRecord::Base.transaction do
        @topic = Topic.create!(title: title, category_id: category_id, user: user)

        messages_attributes.each do |message_attrs|
          @topic.messages.create!(body: message_attrs["body"], user: user)
        end
      end
      true
    rescue ActiveRecord::RecordInvalid => e
      e.record.errors.each { |error| errors.add(error.attribute, error.message) }
      false
    end
  end

  private

  def message_body_presence
    messages_attributes.each do |message_attrs|
      unless message_attrs["body"].present?
        errors.add(:messages, "can't be blank")
      end
    end
  end
end
