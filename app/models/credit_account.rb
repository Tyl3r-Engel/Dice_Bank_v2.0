# frozen_string_literal: true

class CreditAccount < Account
  has_many :payments
end
