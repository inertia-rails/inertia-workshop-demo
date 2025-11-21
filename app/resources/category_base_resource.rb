# frozen_string_literal: true

class CategoryBaseResource < ApplicationResource
  # The name of the model can't be inferred
  # from the serializer name, so we call typelize_from
  typelize_from Category

  attributes :id, :name, :created_at, :topics_count
end
