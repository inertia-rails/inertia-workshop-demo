FactoryBot.define do
  factory :category do
    name { "Category #{Faker::Lorem.word}" }
  end

  factory :user do
    username { Faker::Internet.username }
    email { Faker::Internet.email }
    password { "password" }
  end

  factory :topic do
    title { Faker::Lorem.sentence }
    association :user
    association :category
  end

  factory :message do
    body { Faker::Lorem.paragraph }
    association :topic
    association :user
  end
end
