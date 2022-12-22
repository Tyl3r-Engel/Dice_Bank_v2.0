require "optparse"
class Options
  def initialize
    @options = {}
    OptionParser.new do |opts|
      opts.set_program_name("bundle")
      opts.banner = "Usage: bundle_tsx.rb -js, --js_dir_path= & -o, --out_dir_path="

      opts.on("-js", "--js_dir_path=", "Add path of javascript directory") do |js_dir_path|
        @options[:js_dir_path] = js_dir_path
      end

      opts.on("-o", "--out_dir_path=", "Add path for bundled") do |out_dir|
        @options[:out_dir] = out_dir
      end
    end.parse!

    required_input = [:js_dir_path, :out_dir]
    get_non_passed = -> {
      required_input.select do |needed_input|
        @options[needed_input].nil?
      end.map {|e| e = " --#{e}"}.join(",")
    }

    if @options[:js_dir_path].nil? || @options[:out_dir].nil?
      raise Exception.new("options not passed ->>#{get_non_passed.call}")
    end
    @options[:js_dir_path] = @options[:js_dir_path][0..-2] if @options[:js_dir_path][-1] == "/"
    @options[:out_dir] = @options[:out_dir][0..-2] if @options[:out_dir][-1] == "/"
  end

  def get_options
    return @options
  end
end