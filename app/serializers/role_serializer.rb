# frozen_string_literal: true

class RoleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
end
