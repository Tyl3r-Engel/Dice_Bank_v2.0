class ApplicationController < ActionController::Base

  class Error
    def initialize(message)
      @message = message
    end

    def to_h
      return { error: @message }
    end
  end

  def is_admin?(user_id)
    user = User.find_by(id: user_id)
    admin_role = Role.find_by(name: "Admin")

    user.role_id.to_i == admin_role.id.to_i
  end

  def has_session?(options)
    if options[:user_id]
      check = session[:user_id].to_i == options[:user_id].to_i ? true : false
    else
      check = session[:user_id] ? true : false
    end

    case options[:to_be]
      when true
        if check == false
          return Error.new "No session found"
        else
          return true
        end
      when false
        if check == true
          #  return Error.new "A session has been found!"
          reset_session
          return true
        else
          return true
        end
      else
        raise Exception.new "to_be not true or false"
    end
  end

  def check_params(*args)
    args_copy = Array.new args
    val_check = lambda { |value|
      !value.nil? && value && (if value.instance_of? String then value.strip != "" else true end)
    }

    params.each do |e|
      key, value = e
      args_copy.delete_if { |arg| arg == :"#{key}" && val_check.call(value) }
    end

    if args_copy.length != 0
      Error.new "No felid(s) called #{args_copy} have been supplied without bad or null values"
    else
      true
    end
  end
end
