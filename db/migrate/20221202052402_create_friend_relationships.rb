class CreateFriendRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :friend_relationships do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.bigint :friend_user_id
      t.string :action
      t.time :action_time

      t.timestamps
    end
  end
end
