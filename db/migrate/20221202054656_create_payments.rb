# frozen_string_literal: true

class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.belongs_to :account, null: false, foreign_key: true
      t.date :due_date
      t.bigint :bal
      t.boolean :payed?

      t.timestamps
    end
  end
end
