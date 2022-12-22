class CreateStockTrades < ActiveRecord::Migration[7.0]
  def change
    create_table :stock_trades do |t|
      t.belongs_to :stock, null: false, foreign_key: true
      t.string :call_name
      t.bigint :current_price
      t.boolean :buy?
      t.float :shares

      t.timestamps
    end
  end
end
