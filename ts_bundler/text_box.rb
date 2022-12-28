# frozen_string_literal: true

class TextBox
  # { "1" : "Start", "2" : "out Dir = #{options[:out_dir]}", "3" : "js Dir = #{options[:js_dir_path]}" }
  def initialize(hash, length = 33, divider_char = "~")
    @hash = hash
    @rows = hash.count || 1
    @length = length
    @divider_char = divider_char
  end

  def display
    divider = String.new
    @length.times { divider << @divider_char }

    puts divider
    @rows.times do |i|
      puts Row.new(@length, @hash[(i + 1).to_s]).row
    end
    puts divider
  end

  class Row
    attr_reader :row

    def initialize(length, text)
      raise StandardError, "row not long enough" if text.length + 2 > length

      @length = length
      @row = "|#{add_white_space(text)}|"
    end

    private

    def add_white_space(text)
      max_length = @length - 2
      text_length = text.length

      num_of_white_space = max_length - text_length

      beginning_of_text = String.new
      end_of_text = String.new
      num_of_white_space.times do |i|
        i.even? ? beginning_of_text << " " : end_of_text << " "
      end

      "#{beginning_of_text}#{text}#{end_of_text}"
    end
  end
end
