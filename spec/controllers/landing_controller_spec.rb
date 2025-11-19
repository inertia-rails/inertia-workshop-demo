require 'rails_helper'

RSpec.describe '/landing', type: :request do
  describe 'GET #index' do
    it 'renders the index' do
      get root_path
      expect(response).to have_http_status(:ok)
    end
  end
end
