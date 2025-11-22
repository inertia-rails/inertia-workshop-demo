class Topic < ApplicationRecord
  has_many :messages, -> { order(created_at: :asc) }, dependent: :destroy, index_errors: true
  belongs_to :user, counter_cache: true
  belongs_to :category, counter_cache: true

  # accepts_nested_attributes_for :messages, reject_if: :all_blank

  validates :title, presence: true
  validates :category_id, presence: true

  validates :messages, presence: true, on: :form_submission

  before_validation :assign_user_to_messages, on: [ :create, :form_submission ]

  private

  def assign_user_to_messages
    messages.each { |message| message.user_id ||= user_id }
  end
end
