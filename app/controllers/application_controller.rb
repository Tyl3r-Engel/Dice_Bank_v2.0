# frozen_string_literal: true

class ApplicationController < ActionController::Base
  class Error
    def initialize(message)
      @message = message
    end

    def to_h
      { error: @message }
    end
  end

  def admin?(user_id)
    user = User.find_by(id: user_id)
    admin_role = Role.find_by(name: "Admin")

    user.role_id.to_i == admin_role.id.to_i
  end

  def session?(options)
    check = if options[:user_id]
              session[:user_id].to_i == options[:user_id].to_i
            else
              session[:user_id] ? true : false
            end

    case options[:to_be]
      when true
        return Error.new "No session found" if check == false

        true

      when false
        return true unless check == true

        reset_session
        Error.new "A session has been found!"
      else
        raise StandardError, "to_be not true or false"
    end
  end

  def null?(value)
    value.nil? and value and if value.instance_of? String
                               value.strip != ""
                             else
                               true
                             end
  end

  def check_params(*args)
    args_copy = Array.new args
    params.each do |e|
      key, value = e
      args_copy.delete_if { |arg| arg == :"#{key}" and not null? value }
    end

    return true if args_copy.empty?

    Error.new "No felid(s) called #{args_copy} have been supplied without bad or null values"
  end
end
