class SharedPropsResource < ::ApplicationResource
  # We are working in a context of a controller

  has_one :current_user, resource: BaseUserResource

  has_many :categories,
    source: -> { Category.includes(:topics) },
    resource: CategoryBaseResource
end
