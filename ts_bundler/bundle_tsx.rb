# frozen_string_literal: true

require_relative "./options"
require_relative "./text_box"
require_relative "./bundler"

options = Options.new.get_options
file_paths = Dir["#{options[:js_dir_path]}/**/*.tsx"]

TextBox.new(
  {
    "1" => "Start",
    "2" => "Out Path = #{options[:out_dir]}",
    "3" => "Js Path = #{options[:js_dir_path]}"
  },
  50,
  "~"
).display

start_time = Time.now
bundler = Bundler.new
bundler.bundle(file_paths, options)
change_count = bundler.change_count
end_time = Time.now

TextBox.new(
  {
    "1" => "End",
    "2" => "This took #{(end_time - start_time).to_s[0..3]}s",
    "3" => "There where #{change_count} change(s)"
  },
  50,
  "~"
).display
