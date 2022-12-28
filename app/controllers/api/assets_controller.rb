# frozen_string_literal: true

module Api
  class AssetsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      file_path = Dir["app/assets/images/#{params[:image]}.#{params[:format]}"].first
      return send_file Rails.root.join(file_path), type: "image/gif", disposition: "inline" unless file_path.nil?

      head 400
    end
  end
end
