# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @basic_user = users(:one)
    @admin_user = users(:two)

    @register = lambda {
      post "/api/register", params: { user_name: "test", display_name: "test", password: "test" }
    }

    @serialize_user = lambda { |user|
      UserSerializer.new(user).serialized_json
    }
  end

  # * ---------------REGISTER---------------------- *#

  test "registering should create a new user in the data base" do
    assert_difference("User.count", +1) do
      @register.call
      assert_response 201
    end
  end

  test "registering while logged in should return 403 forbidden" do
    login(@basic_user)
    @register.call
    assert_response 403
  end

  test "registering a user with the same user_name should return 409 conflict" do
    @register.call
    logout(User.last)
    @register.call
    assert_response 409
  end

  test "registering logs user in" do
    @register.call
    user_id_from_response = @response.body.gsub("\"", "")[/id:([^,]*)/, 1]
    assert is_login?({ to_be: true, user_id: user_id_from_response })
  end

  test "registering should return the newly created User" do
    @register.call
    assert_equal @response.body, @serialize_user.call(User.last)
  end

  # * ---------------login---------------------- *#

  test "logging in while logged in should fail" do
    login(@basic_user)
    login(@basic_user)
    assert_response 403
  end

  test "logging in should check user_name exists" do
    user_not_in_data_base = User.new({
                                       user_name: "not in the data base",
                                       display_name: "test",
                                       password: "test",
                                       role: roles(:one)
                                     })

    login(user_not_in_data_base)
    assert_response 409
  end

  test "logging in creates a session" do
    login(@basic_user)
    user_id_from_response = @response.body.gsub("\"", "")[/id:([^,]*)/, 1]
    assert is_login?({ to_be: true, user_id: user_id_from_response })
  end

  test "logging in should return the logged in user" do
    login(@basic_user)
    assert_equal @response.body, @serialize_user.call(@basic_user)
  end

  # * ---------------logout---------------------- *#

  test "logging out with out a session should fail" do
    logout(@basic_user)
    assert_response 403
  end

  test "logging out should delete the session" do
    login(@basic_user)
    assert is_login?({ to_be: true, user_id: @basic_user[:id] })
    logout(@basic_user)
    assert_not is_login?({ to_be: true, user_id: @basic_user[:id] })
  end

  # * ---------------show---------------------- *#

  test "show should return the user based off id" do
    login(@basic_user)
    get "/api/#{@basic_user[:id]}/me"
    assert_equal @response.body, @serialize_user.call(@basic_user)
  end

  test "show should not return if not logged in" do
    get "/api/#{@basic_user[:id]}/me"
    assert_response 403
  end

  # * ---------------edit---------------------- *#

  test "editing should not edit if not logged in" do
    patch "/api/#{@basic_user[:id]}/me/edit", params: { user: { user_name: "test" } }
    assert_response 403
  end

  test "editing should update passed columns on the user" do
    login(@basic_user)
    edited_user = @basic_user.clone
    edited_user.user_name = "edit test"
    edited_user.primary_account_num = 23_452_345

    assert_changes :@object, to: @serialize_user.call(edited_user) do
      patch "/api/#{@basic_user[:id]}/me/edit",
            params: { user: { user_name: "edit test", primary_account_num: 23_452_345 } }
      @object = @response.body
    end
  end

  test "editing should return the updated User" do
    login(@basic_user)
    patch "/api/#{@basic_user[:id]}/me/edit", params: { user: { user_name: "edit test", display_name: "edit test" } }
    assert_equal @response.body, @serialize_user.call(User.find_by(id: @basic_user[:id]))
  end
end
