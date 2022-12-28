# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  validates :user_name, :display_name, :password_digest, presence: true
  validates :user_name, uniqueness: true

  belongs_to :role
  has_many :friend_relationships
  has_many :notifications
  has_many :accounts
end
