require "digest"
require "json"

class Bundler
  def bundle(file_path_array, options)
    @dbInstance = Db.new
    @change_count = 0

    file_path_array.each do |file_path|
      if file_path.include? ".test.tsx" then next end
      if file_changed? file_path
        puts "-"
        puts " CHANGE -> #{file_path}"
        @change_count += 1

        sub_out_dir = file_path.split("/")[2..-2].join("/")
        full_out_dir = "#{options[:out_dir]}#{if sub_out_dir.length != 0 then "/#{sub_out_dir}" end}"
        %x"esbuild #{file_path} --bundle --minify --outdir=#{full_out_dir}"
        puts "-"
      else
        puts "NO CHANGE -> #{file_path}"
      end
    end

    @dbInstance.save
  end

  def get_change_count
    @change_count
  end

  private

  def file_changed?(file_path)
    sha256_hash = nil
    File.open(file_path, "r") do |file|
      sha256_hash = Digest::SHA256.hexdigest file.read
    end

    file_fingerPrint = @dbInstance.get_file_fingerPrint file_path

    if sha256_hash == file_fingerPrint
      return false
    else
      return true
    end
  end

  class Db
    def initialize
      @file_db = nil
      File.open("#{__dir__}/file_fingerprints.json", "a+") do |f|
        data = f.read
        if data == ""
          @file_db = {}
        else
          @file_db = JSON.parse(data)
        end
      end
    end

    def save
      File.open("#{__dir__}/file_fingerprints.json", "w") do |f|
        f.write(JSON.generate(@file_db))
      end
    end

    def get_file_fingerPrint(file_path)
      split_file_path = file_path.split("/")

      db_search = lambda { |array, hash|
        if array.length == 1
          return hash["#{array[0]}"]
        else
          hash = hash["#{array[0]}"]
          return nil if hash == nil
          array.shift
        end
        db_search.call(array, hash)
      }

      fingerPrint = db_search.call(split_file_path, @file_db)
      create_file_fingerPrint(file_path) if fingerPrint == nil
      return fingerPrint
    end

    def create_file_fingerPrint(file_path)
      split_file_path = file_path.split("/")

      db_create = lambda { |hash, array|
        # puts "this runs -->#{hash}, #{array}"
        key = array[0]
        if hash.include? key
          array.shift
          db_create.call(hash["#{key}"] , array)
        else
          if array.length == 1
            File.open(file_path, "r") do |file|
              hash["#{key}"] = Digest::SHA256.hexdigest file.read
            end
            return
          end
          hash["#{key}"] = {}
          array.shift
          db_create.call(hash["#{key}"], array)
        end
      }

      db_create.call(@file_db, split_file_path)
    end
  end
end