class Topic < ApplicationRecord
  has_many :messages, -> { order(created_at: :asc) }, dependent: :destroy
  belongs_to :user, counter_cache: true
  belongs_to :category, counter_cache: true

  validates :title, presence: true
end
