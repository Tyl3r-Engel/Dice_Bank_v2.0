# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...

    def login(user)
      post "/api/login", params: { user_name: user[:user_name], password: "testPassword" }
    end

    def logout(user)
      get "/api/#{user[:id]}/logout"
    end

    def admin?(user)
      user.role.name == "Admin"
    end

    def is_login?(options)
      check = if options[:user_id]
                session[:user_id].to_i == options[:user_id].to_i
              else
                session[:user_id] ? true : false
              end

      case options[:to_be]
      when true
        return false if check == false

        true

      when false
        return false if check == true

        true

      else
        raise StandardError, "to_be not true or false"
      end
    end
  end
end
