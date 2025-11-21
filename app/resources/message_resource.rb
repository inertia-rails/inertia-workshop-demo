class MessageResource < ApplicationResource
  attributes :id, :body, :created_at

  has_one :user
end
