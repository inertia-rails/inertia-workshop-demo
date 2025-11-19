class ApplicationController < ActionController::Base
  include Pagy::Method

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  layout :set_layout

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_default_meta_tags

  inertia_share categories: -> {
    Category.includes(:topics).all.as_json(methods: :topics_count)
  }

  inertia_share current_user: -> {
    current_user&.as_json(only: [ :username ])
  }

  def after_sign_in_path_for(resource)
    topics_path
  end

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end

  def after_sign_up_path_for(resource)
    topics_path
  end

  private

  def set_layout
    if devise_controller?
      "auth"
    else
      "application"
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :username ])

    devise_parameter_sanitizer.permit(:account_update, keys: [ :username ])
  end

  def set_default_meta_tags
    inertia_meta.add([
      { title: "Pups & Pourovers" },
      { name: "description", content: "Online home of the overcaffeinated dog enthusiast" },
      { name: "viewport", content: "width=device-width,initial-scale=1" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "application-name", content: "Pups & Pourovers" }
    ])
  end
end
