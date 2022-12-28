# frozen_string_literal: true

class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.belongs_to :account, null: false, foreign_key: true
      t.string :title
      t.bigint :friend_user_id
      t.bigint :to_account_num
      t.bigint :bal
      t.string :status
      t.time :transfer_time

      t.timestamps
    end
  end
end
