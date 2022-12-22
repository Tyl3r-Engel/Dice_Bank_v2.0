module Api
  class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def register # POST -> user_name, password, display_name
      # checks
      #   - user not logged in
      #   - user supplied input not null or false
      #   - no other user has same user_name
      # create a user in the data base
      # logs user in
      # returns user
      c = check_params :user_name, :password, :display_name
      if c.instance_of? Error then return render json: c.to_h, status: 400 end

      s = has_session? to_be: false
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

      if User.find_by(user_name: params[:user_name]);
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

    def login # POST -> user_name, password
      # checks
      #   - user not logged in
      #   - user_name exists?
      # authenticates user pass with supplied pass
      # creates a session
      # returns user on success

      c = check_params :user_name, :password
      if c.instance_of? Error then return render json: c.to_h, status: 400 end

      user = User.find_by(user_name: params[:user_name])
      if user.nil?;
        return render json: Error.new("Login failed, no user found with user name -> '#{params[:user_name]}'!").to_h, status: 409 end

      s = has_session?({ to_be: false, user_id: user.id })
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

      if user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: UserSerializer.new(user).serialized_json, status: 200
      else
        render json: Error.new("Login failed, password is incorrect!").to_h, status: 403
      end
    end

    def logout # GET
      # checks
      #   - user is logged in
      # removes user session
      # returns 200
      c = check_params :user_id
      if c.instance_of? Error then return render json: c.to_h, status: 400 end

      s = has_session?({ to_be: true, user_id: params[:user_id] })
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

      session.delete(:user_id)
      reset_session
      head 200
    end

    def show # GET
      # checks
      #   - user is logged in
      #   - params are clean
      # return user
      s = has_session?({ to_be: true, user_id: params[:user_id] })
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

      user = User.find_by(id: params[:user_id])
      render json: UserSerializer.new(user).serialized_json, status: 200
    end

    def edit # PATCH -> ?
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
      clean_params[:password] = params[:password] if !params[:password].nil?
      if clean_params.to_h.length == 0 then return render json: Error.new("No attributes to update givin").to_h, status: 400 end

      user = User.find_by(id: params[:user_id])

      s = has_session?({ to_be: true, user_id: params[:user_id] })
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

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