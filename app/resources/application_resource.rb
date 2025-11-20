class ApplicationResource
  include Alba::Resource

  helper Typelizer::DSL
  helper Alba::Inertia::Resource

  transform_keys :lower_camel
end
