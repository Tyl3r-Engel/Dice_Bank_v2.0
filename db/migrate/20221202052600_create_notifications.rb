# frozen_string_literal: true

class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.boolean :resolved
      t.string :severity

      t.timestamps
    end
  end
end
