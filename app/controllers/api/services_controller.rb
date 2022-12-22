module Api
  class ServicesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def list # GET
      # returns list of all services
      render json: ServiceSerializer.new(Service.all).serialized_json, status: 200
    end

    def show # GET
      # returns one service based on id
      render json: ServiceSerializer.new(Service.find_by(id: params[:service_id])).serialized_json, status: 200
    end

    #admin
    def create # POST -> user_id, title, description, img_urls
      # checks
      #    - user supplied attributes
      #    - user is logged in
      #    - user has an admin role
      # creates a service in the data base
      # returns newly created service
      c = check_params :user_id, :title, :description, :img_urls
      if c.instance_of? Error then return render json: c.to_h, status: 400 end

      s = has_session?({ to_be: true, user_id: params[:user_id] })
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

      if !is_admin? params[:user_id];
        return render json: Error.new("User is not Admin").to_h, status: 403 end

      new_service = Service.create({
        title: params[:title],
        description: params[:description],
        img_urls: params[:img_urls]
      })

      if new_service.valid?
        new_service.save
        render json: ServiceSerializer.new(new_service).serialized_json, status: 201
      else
        render json: Error.new("An error has occurred creating the service").to_h, status: 500
      end
    end

    #admin
    def delete # delete -> user_id, service_id
      # checks
      #    - user supplied attributes
      #    - user is logged in
      #    - user has an admin role
      # deletes a service in the data base
      # returns 200
      c = check_params :user_id, :service_id
      if c.instance_of? Error then return render json: c.to_h, status: 400 end

      s = has_session?({ to_be: true, user_id: params[:user_id] })
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

      if !is_admin? params[:user_id];
        return render json: Error.new("User is not Admin").to_h, status: 403 end

      Service.delete_by(id: params[:service_id])
      deleted_service = Service.find_by(id: params[:service_id])

      if deleted_service.nil?
        head 200
      else
        render json: Error.new("An error has occurred deleting the service"), status: 500
      end
    end

    #admin
    def edit # PATCH -> user_id, ?
      # checks
      #   - user is logged in
      #   - user is an admin
      #   - passed params are clean
      # updates service on column where
      #   column name = each passed param
      # returns updated service
      clean_params = params.require(:service).permit(:title, :description, :img_urls)
      if clean_params.to_h.length == 0 then return render json: Error.new("No attributes to update givin").to_h, status: 400 end

      service = Service.find_by(id: params[:service_id])

      s = has_session?({ to_be: true, user_id: params[:user_id] })
      if s.instance_of? Error then return render json: s.to_h, status: 403 end

      if !is_admin? params[:user_id];
        return render json: Error.new("User is not Admin").to_h, status: 403 end

      clean_params.each do |attribute|
        column_name, value = attribute
        service[:"#{column_name}"] = value
      end

      if service.valid?
        service.save
        render json: ServiceSerializer.new(service).serialized_json, status: 200
      else
        render json: Error.new("Unable to update the service"), status: 500
      end
    end

  end
end
