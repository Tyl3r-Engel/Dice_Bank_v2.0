class Stock < ApplicationRecord
  belongs_to :investment_account
  has_many :stock_trades
end
