require "rubygems"
require 'rake'
require 'yaml'
require 'time'

# Rake tools
# Based on jekyll-bootstrap
# post: Create new post
# page: Create new page

SOURCE = "."
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "markdown"
}

# Usage: rake post title="A Title" [date="2012-02-09"]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("That name is in use already")
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "author: Aniket"
    post.puts "layout: post"
    post.puts "type: post"
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "category: notes"
    post.puts "tags: []"
    post.puts "---"
  end
end # task :post

# Usage: rake page name="about"
desc "Create a new page."
task :page do
  name = ENV["name"] || "new-page.md"
  filename = File.join(SOURCE, "#{name}")
  title = File.basename(filename, File.extname(filename)).gsub(/[\W\_]/, " ").gsub(/\b\w/){$&.upcase}
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  if File.exist?(filename)
    abort("That name is in use already")
  end
  
  mkdir_p slug
  puts "Creating new page: #{slug}/index.md"
  open("#{slug}/index.md", 'w') do |post|
    post.puts "---"
    post.puts "layout: page"
    post.puts "title: #{title}"
    post.puts "slug: #{slug}"
    post.puts "---"
  end
end # task :page

# Usage: rake poem title="A Title" [date="2012-02-09"]
desc "Begin a new poem in #{CONFIG['posts']}"
task :poem do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("That name is in use already")
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "author: Aniket"
    post.puts "layout: poetry"
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "category: poetry"
    post.puts "---"
  end
end # task :post