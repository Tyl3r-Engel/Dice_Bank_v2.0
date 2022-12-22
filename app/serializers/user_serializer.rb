class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_name, :display_name, :primary_account_num

  belongs_to :role
  has_many :friend_relationships
  has_many :notifications
  has_many :accounts
end
