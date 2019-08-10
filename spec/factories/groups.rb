FactoryBot.define do
  factory :group do
    title {Faker::Name.last_name}
  end
end