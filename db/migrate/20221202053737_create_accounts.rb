class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.bigint :bal
      t.bigint :num
      t.string :secret
      t.boolean :active?
      t.float :rate

      t.timestamps
    end
  end
end
