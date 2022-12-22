Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "react#index"
  namespace :api do
    post "/register", to: "users#register"
    post "/login", to: "users#login"

    get "/services", to: "services#list"
    get "/services/:service_id", to: "services#show"
    post "/admin/:user_id/serviceCreate", to: "services#create"
    delete "/admin/:user_id/serviceDelete/:service_id", to: "services#delete"
    patch "/admin/:user_id/serviceEdit/:service_id", to: "services#edit"

    # GET -> /assets/images/logo.png
    get "/assets/images/*image", to: "assets#index"

    scope ":user_id" do
      get "/me", to: "users#show"
      patch "/me/edit", to: "users#edit"
      get "/logout", to: "users#logout"
    end

  end

  get "*path", to: "react#index", via: :all

end
