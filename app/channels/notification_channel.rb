# frozen_string_literal: true

class NotificationChannel < ApplicationCable::Channel
  def subscribed
    @users_room = "notification_#{params['room_id']}"
    stream_from @users_room
    ActionCable.server.broadcast(@users_room, "Hi, #{User.find_by(id: params['room_id']).display_name}")
  end

  def receive(data)
    ActionCable.server.broadcast(@users_room, { received: data })
  end
end
