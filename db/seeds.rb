# db/seeds.rb
ActiveRecord::Base.transaction do
  puts "Seeding database..."

  PASSWORD = ENV.fetch('PASSWORD', 'password')

  # Load YAML files
  users_data = YAML.load_file(Rails.root.join('db/seeds/users.yml'))['users']
  categories_data = YAML.load_file(Rails.root.join('db/seeds/categories.yml'))['categories']
  topics_data = YAML.load_file(Rails.root.join('db/seeds/topics.yml'))['topics']
  messages_data = YAML.load_file(Rails.root.join('db/seeds/messages.yml'))['messages']
  chat_messages_data = YAML.load_file(Rails.root.join('db/seeds/chat_messages.yml'))['chat_messages']

  # Create users
  puts "Creating users..."
  users = {}
  users_data.each do |user_attrs|
    user = User.find_or_create_by!(username: user_attrs['username']) do |u|
      u.email = user_attrs['email']
      u.password = PASSWORD
      u.password_confirmation = PASSWORD
      u.about_me = user_attrs['about_me']
    end
    users[user.username] = user
  end
  puts "✓ #{users.length} users created/found"

  # Create categories
  puts "Creating categories..."
  categories = {}
  categories_data.each do |data|
    category = Category.find_or_create_by!(data)
    categories[data["name"]] = category
  end
  puts "✓ #{categories.length} categories created/found"

  # Create topics
  puts "Creating topics..."
  topics = {}
  topics_data.each do |topic_attrs|
    topic = Topic.find_or_create_by!(title: topic_attrs['title']) do |t|
      t.user = users[topic_attrs['username']]
      t.category = categories[topic_attrs['category']]
    end
    topics[topic.title] = topic
  end
  puts "✓ #{topics.length} topics created/found"

  # Create messages
  puts "Creating messages..."
  message_count = 0
  messages_data.each do |msg_attrs|
    Message.find_or_create_by!(
      topic: topics[msg_attrs['topic_title']],
      user: users[msg_attrs['username']],
      body: msg_attrs['body']
    )
    message_count += 1
  end
  puts "✓ #{message_count} messages created/found"

  # Create chat messages
  puts "Creating chat messages..."
  chat_message_count = 0
  chat_messages_data.each do |msg_attrs|
    ChatMessage.find_or_create_by!(
      user: users[msg_attrs['username']],
      body: msg_attrs['body'],
    ) do |cm|
      cm.created_at = msg_attrs['created_at']
      cm.updated_at = msg_attrs['created_at']
    end
    chat_message_count += 1
  end
  puts "✓ #{chat_message_count} chat messages created/found"

  puts "\n✅ Seed completed successfully!"
  puts "Users: #{User.count}"
  puts "Categories: #{Category.count}"
  puts "Topics: #{Topic.count}"
  puts "Messages: #{Message.count}"
  puts "ChatMessages: #{ChatMessage.count}"
rescue StandardError => e
  puts "\n❌ Seed failed: #{e.message}"
  puts e.backtrace.first(5)
  raise
end
