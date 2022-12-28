# frozen_string_literal: true

require "digest"
require "json"

class Bundler
  attr_reader :change_count

  def bundle(file_path_array, options)
    @db_instance = Db.new
    @change_count = 0

    file_path_array.each do |file_path|
      next if file_path.include? ".test.tsx"

      if file_changed? file_path
        puts "-"
        puts " CHANGE -> #{file_path}"
        @change_count += 1

        sub_out_dir = file_path.split("/")[2..-2].join("/")
        full_out_dir = "#{options[:out_dir]}#{"/#{sub_out_dir}" unless sub_out_dir.empty?}"
        `esbuild #{file_path} --bundle --minify --outdir=#{full_out_dir}`

        puts "-"
      else
        puts "NO CHANGE -> #{file_path}"
      end
    end

    @db_instance.save
  end

  private

  def file_changed?(file_path)
    file_finger_print = @db_instance.get_file_finger_print file_path
    if @db_instance.create_sha256(file_path).to_s != file_finger_print.to_s
      @db_instance.create_file_finger_print file_path
      return true
    end
    false
  end

  class Db
    def initialize
      @file_db = nil
      File.open("#{__dir__}/file_finger_prints.json", "a+") do |f|
        data = f.read
        @file_db = data == "" ? {} : JSON.parse(data)
      end
    end

    def save
      File.open("#{__dir__}/file_finger_prints.json", "w") do |f|
        f.write(JSON.generate(@file_db))
      end
    end

    def create_sha256(file_path)
      File.open(file_path, "r") do |file|
        return Digest::SHA256.hexdigest file.read
      end
    end

    def get_file_finger_print(file_path)
      split_file_path = file_path.split("/")

      db_search = lambda do |array, hash|
        key = array.shift
        return hash[key] if array.empty?

        hash = hash[key]
        hash.nil? ? nil : db_search.call(array, hash)
      end

      finger_print = db_search.call(split_file_path, @file_db)
      create_file_finger_print(file_path) if finger_print.nil?
      finger_print
    end

    def create_file_finger_print(file_path)
      split_file_path = file_path.split("/")

      db_create = lambda do |hash, array|
        key = array.shift
        if array.empty?
          hash[key] = create_sha256 file_path
          return
        end

        unless hash.include? key; hash[key] = {} end
        db_create.call(hash[key], array)
      end

      db_create.call(@file_db, split_file_path)
    end
  end
end
