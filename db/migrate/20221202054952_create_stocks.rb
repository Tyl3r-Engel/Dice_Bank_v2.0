# frozen_string_literal: true

class CreateStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :stocks do |t|
      t.belongs_to :account, null: false, foreign_key: true
      t.string :call_name
      t.float :shares

      t.timestamps
    end
  end
end
