# frozen_string_literal: true

class Payment < ApplicationRecord
  belongs_to :credit_account
end
