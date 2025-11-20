class BaseUserResource < ApplicationResource
  # The name of the model can't be inferred
  # from the serializer name, so we call typelize_from
  typelize_from User

  attributes :id, :username, :email
end
