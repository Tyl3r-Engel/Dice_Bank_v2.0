class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :display_name
      t.string :password_digest
      t.references :role, null: false, foreign_key: true
      t.bigint :primary_account_num

      t.timestamps
    end
  end
end
