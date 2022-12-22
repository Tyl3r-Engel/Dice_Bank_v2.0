ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  def login(user)
    post "/api/login", params: { user_name: user[:user_name], password: "testPassword"}
  end

  def logout(user)
    get "/api/#{user[:id]}/logout"
  end

  def is_admin?(user)
    user.role.name == "Admin"
  end

  def is_login?(options)
    if options[:user_id]
      check = session[:user_id].to_i == options[:user_id].to_i ? true : false
    else
      check = session[:user_id] ? true : false
    end

    case options[:to_be]
      when true
        if check == false
          return false
        else
          return true
        end
      when false
        if check == true
           return false
        else
          return true
        end
      else
        raise Exception.new "to_be not true or false"
    end
  end

end
