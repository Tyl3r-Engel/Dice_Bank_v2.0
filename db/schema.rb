# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_02_061420) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.bigint "bal"
    t.bigint "num"
    t.string "secret"
    t.boolean "active?"
    t.float "rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "friend_relationships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "friend_user_id"
    t.string "action"
    t.time "action_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_friend_relationships_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title"
    t.text "description"
    t.boolean "resolved"
    t.string "severity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.date "due_date"
    t.bigint "bal"
    t.boolean "payed?"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_payments_on_account_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "blurb"
    t.json "img_urls"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stock_trades", force: :cascade do |t|
    t.bigint "stock_id", null: false
    t.string "call_name"
    t.bigint "current_price"
    t.boolean "buy?"
    t.float "shares"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stock_id"], name: "index_stock_trades_on_stock_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.string "call_name"
    t.float "shares"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_stocks_on_account_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.string "title"
    t.bigint "friend_user_id"
    t.bigint "to_account_num"
    t.bigint "bal"
    t.string "status"
    t.time "transfer_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_transactions_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name"
    t.string "display_name"
    t.string "password_digest"
    t.bigint "role_id", null: false
    t.bigint "primary_account_num"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "accounts", "users"
  add_foreign_key "friend_relationships", "users"
  add_foreign_key "notifications", "users"
  add_foreign_key "payments", "accounts"
  add_foreign_key "stock_trades", "stocks"
  add_foreign_key "stocks", "accounts"
  add_foreign_key "transactions", "accounts"
  add_foreign_key "users", "roles"
end
