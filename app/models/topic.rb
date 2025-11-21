class Topic < ApplicationRecord
  has_many :messages, -> { order(created_at: :asc) }, dependent: :destroy
  belongs_to :user, counter_cache: true
  belongs_to :category, counter_cache: true

  validates :title, presence: true

  scope :search, ->(query) {
    includes(:user, :category, messages: :user)
      .left_joins(:messages)
      .where("lower(topics.title) LIKE :query OR lower(messages.body) LIKE :query", query: "%#{query.downcase}%")
      .order(created_at: :desc)
      .distinct
  }
end
