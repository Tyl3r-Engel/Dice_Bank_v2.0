class TextBox
  # { "1" : "Start", "2" : "out Dir = #{options[:out_dir]}", "3" : "js Dir = #{options[:js_dir_path]}" }
  def initialize(hash, length = 33, divider_char = "~")
    @hash = hash
    @rows = hash.count || 1
    @length = length
    @divider_char = divider_char
  end

  def display
    divider = ""
    @length.times { divider << @divider_char}

    puts divider
    @rows.times do |i|
      puts Row.new(@length, @hash["#{i + 1}"]).get_row
    end
    puts divider
  end

  private

  class Row
    def initialize(length, text)
      if text.length + 2 > length
        raise Exception.new("row not long enough")
      end
      @length = length
      @row = "|" + add_white_space(text) + "|"
    end

    def get_row
      @row
    end

    private

    def add_white_space(text)
      max_length = @length - 2
      text_length = text.length

      num_of_white_space = max_length - text_length

      beginning_of_text = ""
      end_of_text = ""
      num_of_white_space.times do |i|
        i % 2 == 0 ? beginning_of_text << " " : end_of_text << " "
      end

      return "#{beginning_of_text}#{text}#{end_of_text}"
    end
  end

end
