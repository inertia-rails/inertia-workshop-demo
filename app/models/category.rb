class Category < ApplicationRecord
  has_many :topics, dependent: :nullify

  validates :name, presence: true, uniqueness: true
end
