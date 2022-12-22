module Api
  class AssetsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      file_path = Dir["app/assets/images/#{params[:image]}.#{params[:format]}"].first
      if !file_path.nil?
        return send_file Rails.root.join(file_path), type: "image/gif", disposition: "inline"
      end
      head 400
    end

  end
end