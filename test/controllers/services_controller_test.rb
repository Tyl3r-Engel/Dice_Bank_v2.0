# frozen_string_literal: true

require "test_helper"

class ServicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_user = users(:two)
    @basic_user = users(:one)

    @service = services(:one)

    @serialize_service = lambda { |service|
      ServiceSerializer.new(service).serialized_json
    }

    @create = lambda {
      post "/api/admin/#{@admin_user[:id]}/serviceCreate",
           params: { title: "test", description: "testing", img_urls: [] }
    }

    @delete = lambda {
      delete "/api/admin/#{@admin_user[:id]}/serviceDelete/#{@service[:id]}"
    }

    @edit = lambda {
      patch "/api/admin/#{@admin_user[:id]}/serviceEdit/#{@service[:id]}",
            params: { service: { description: "edited description" } }
    }
  end

  # * ---------------LIST---------------------- *#

  test "Listing should return list of all services" do
    get "/api/services"
    assert_response 200
    assert_equal @response.body, @serialize_service.call(Service.all)
  end

  # * ---------------show---------------------- *#

  test "Showing should return one service based on id" do
    get "/api/services/1"
    assert_response 200
    assert_equal @response.body, @serialize_service.call(Service.find_by(id: 1))
  end

  # * ---------------CREATE---------------------- *#

  test "Creating should create service in data base" do
    login(@admin_user)
    assert_difference "Service.count" do
      @create.call
      assert_response 201
    end
  end

  test "Creating should not work if user is not of the admin role" do
    login(@basic_user)
    assert !admin?(@basic_user)
    assert_no_changes "Service.count" do
      post "/api/admin/#{@basic_user[:id]}/serviceCreate",
           params: { title: "test", description: "testing", img_urls: [] }
      assert_response 403
    end
  end

  test "Creating should not work unless logged in" do
    @create.call
    assert_response 403
  end

  test "Creating should return the newly created service" do
    login(@admin_user)
    @create.call
    assert_equal @response.body, @serialize_service.call(Service.last)
  end

  # * ---------------DELETE---------------------- *#

  test "Deleting should destroy service in data base" do
    login(@admin_user)
    assert_difference("Service.count", -1) do
      @delete.call
    end
  end

  test "Deleting should not work if user is not of the admin role" do
    login(@basic_user)
    assert !admin?(@basic_user)
    assert_no_changes "Service.count" do
      delete "/api/admin/#{@basic_user[:id]}/serviceDelete/#{@service[:id]}"
      assert_response 403
    end
  end

  test "Deleting should not work unless logged in" do
    @delete.call
    assert_response 403
  end

  test "Deleting should return 200" do
    login(@admin_user)
    @delete.call
    assert_response 200
  end

  # * ---------------EDIT---------------------- *#

  test "Editing should update a service" do
    login(@admin_user)
    edited_user = @service.clone
    edited_user.description = "edited description"

    assert_changes :@object, to: @serialize_service.call(edited_user) do
      @edit.call
      assert_response 200
      @object = @response.body
    end
  end

  test "Editing should not work if user is not of the admin role" do
    login(@basic_user)
    assert !admin?(@basic_user)
    patch "/api/admin/#{@basic_user[:id]}/serviceEdit/#{@service[:id]}",
          params: { service: { description: "edited description" } }
    assert_response 403
  end

  test "Editing should not work unless logged in" do
    @edit.call
    assert_response 403
  end

  test "Editing should return edited service" do
    login(@admin_user)
    @edit.call
    assert_equal @response.body, @serialize_service.call(Service.find_by(id: @service[:id]))
  end
end
