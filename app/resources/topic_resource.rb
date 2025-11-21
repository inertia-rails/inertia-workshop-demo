class TopicResource < ApplicationResource
  attributes :id, :title

  has_one :category, resource: CategoryBaseResource
  has_one :user

  has_many :messages
end
