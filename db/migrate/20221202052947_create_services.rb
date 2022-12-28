# frozen_string_literal: true

class CreateServices < ActiveRecord::Migration[7.0]
  def change
    create_table :services do |t|
      t.string :title
      t.string :description
      t.string :blurb
      t.json :img_urls

      t.timestamps
    end
  end
end
