class ServiceSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :blurb ,:img_urls
end
