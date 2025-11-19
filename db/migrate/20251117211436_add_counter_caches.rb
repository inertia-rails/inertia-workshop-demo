class AddCounterCaches < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :topics_count, :integer, default: 0, null: false
    add_column :users, :messages_count, :integer, default: 0, null: false
    add_column :categories, :topics_count, :integer, default: 0, null: false

    # This is a good idea to run this in a job in a real application
    User.find_each do |user|
      User.reset_counters(user.id, :topics)
      User.reset_counters(user.id, :messages)
    end

    Category.find_each do |category|
      Category.reset_counters(category.id, :topics)
    end
  end
end
