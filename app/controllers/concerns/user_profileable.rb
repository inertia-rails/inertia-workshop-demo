module UserProfileable
  extend ActiveSupport::Concern

  included do
    inertia_share do
      {
        user_profile_id: params[:user_profile_id]&.to_i,
        user_profile: load_user_profile
      }.compact
    end
  end

  private

  def load_user_profile
    return nil if params[:user_profile_id].blank?
    sleep 1

    User.find_by(id: params[:user_profile_id])
      &.as_json(only: [ :username, :email, :about_me, :id, :topics_count, :messages_count ])
  end
end
