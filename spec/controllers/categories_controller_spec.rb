RSpec.describe '/categories', type: :request, inertia: true do
  describe 'GET #show' do
    let(:category) { create :category }

    it 'renders correctly' do
      get category_path(category.id)

      expect(inertia).to render_component 'categories/show'

      expect(inertia.props[:category]["id"]).to eq category.id
      expect(inertia).to include_props({ category: category.as_json(include: [ :topics ]) })
    end
  end
end
