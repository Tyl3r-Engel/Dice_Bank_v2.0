# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    # POST -> user_name, password, display_name
    def register
      # checks
      #   - user not logged in
      #   - user supplied input not null or false
      #   - no other user has same user_name
      # create a user in the data base
      # logs user in
      # returns user
      c = check_params :user_name, :password, :display_name
      return render json: c.to_h, status: 400 if c.instance_of? Error

      s = session? to_be: false
      return render json: s.to_h, status: 403 if s.instance_of? Error

      if User.find_by(user_name: params[:user_name])
        return render json: Error.new("User name '#{params[:user_name]}' already exists").to_h, status: 409 end

      new_user = User.create({
                               user_name: params[:user_name].strip,
                               display_name: params[:display_name].strip,
                               password: params[:password],
                               primary_account_num: nil,
                               role: Role.find_by(name: "Basic User")
                             })

      if new_user.valid?
        new_user.save
        session[:user_id] = new_user.id
        render json: UserSerializer.new(new_user).serialized_json, status: 201
      else
        render json: Error.new(new_user.errors).to_h, status: 500
      end
    end

    # POST -> user_name, password
    def login
      # checks
      #   - user not logged in
      #   - user_name exists?
      # authenticates user pass with supplied pass
      # creates a session
      # returns user on success

      c = check_params :user_name, :password
      return render json: c.to_h, status: 400 if c.instance_of? Error

      user = User.find_by(user_name: params[:user_name])
      if user.nil?
        return render json: Error.new("Login failed, no user found with user name -> '#{params[:user_name]}'!").to_h,
                      status: 409 end

      s = session?({ to_be: false, user_id: user.id })
      return render json: s.to_h, status: 403 if s.instance_of? Error

      if user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: UserSerializer.new(user).serialized_json, status: 200
      else
        render json: Error.new("Login failed, password is incorrect!").to_h, status: 403
      end
    end

    # GET
    def logout
      # checks
      #   - user is logged in
      # removes user session
      # returns 200
      c = check_params :user_id
      return render json: c.to_h, status: 400 if c.instance_of? Error

      s = session?({ to_be: true, user_id: params[:user_id] })
      return render json: s.to_h, status: 403 if s.instance_of? Error

      session.delete(:user_id)
      reset_session
      head 200
    end

    # GET
    def show
      # checks
      #   - user is logged in
      #   - params are clean
      # return user
      s = session?({ to_be: true, user_id: params[:user_id] })
      return render json: s.to_h, status: 403 if s.instance_of? Error

      user = User.find_by(id: params[:user_id])
      render json: UserSerializer.new(user).serialized_json, status: 200
    end

    # PATCH -> ?
    def edit
      # checks
      #   - user is logged in
      #   - passed params are clean
      # updates user column where column name = each passed params
      #   example:
      #      { user_name: "Timtim432", display_name: "Timmy w" }
      #   this would update the user_name column to "Timtim432"
      #   and would update the display_name column to "Timmy w"
      # return user
      clean_params = params.require(:user).permit(:user_name, :display_name, :primary_account_num)
      clean_params[:password] = params[:password] unless params[:password].nil?
      if clean_params.to_h.length.zero? then return render json: Error.new("No attributes to update givin").to_h,
                                                           status: 400 end

      user = User.find_by(id: params[:user_id])

      s = session?({ to_be: true, user_id: params[:user_id] })
      return render json: s.to_h, status: 403 if s.instance_of? Error

      clean_params.each do |attribute|
        column_name, value = attribute

        if column_name == "password"
          user.password = value
          break
        end

        user[:"#{column_name}"] = value
      end

      if user.valid?
        user.save
        render json: UserSerializer.new(user).serialized_json, status: 200
      else
        render json: Error.new("Unable to update account #{user.errors}"), status: 500
      end
    end
  end
end
