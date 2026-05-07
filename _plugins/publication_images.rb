# frozen_string_literal: true

require "open3"
require "json"
require "fileutils"

module Jekyll
  module PublicationImages
    module_function

    MAP_FILE = ".jekyll-cache/publication-images.json"

    def ensure!(site)
      return if ENV["SKIP_PUBLICATION_IMAGES"] == "1"

      script = File.join(site.source, "scripts", "ensure_publication_images.py")
      return unless File.file?(script)

      map_file = File.join(site.source, MAP_FILE)
      FileUtils.mkdir_p(File.dirname(map_file))

      stdout, stderr, status = Open3.capture3(
        "python3",
        script,
        "--no-write",
        "--map-file",
        map_file,
        chdir: site.source
      )

      stdout.each_line do |line|
        Jekyll.logger.info "Publication images:", line.strip
      end

      return if status.success?

      stderr.each_line do |line|
        Jekyll.logger.error "Publication images:", line.strip
      end
      raise "failed to ensure publication images"
    end

    def image_map(site)
      map_file = File.join(site.source, MAP_FILE)
      return {} unless File.file?(map_file)

      JSON.parse(File.read(map_file))
    rescue JSON::ParserError
      {}
    end
  end
end

Jekyll::Hooks.register :site, :after_reset do |site|
  Jekyll::PublicationImages.ensure!(site)
end

Jekyll::Hooks.register :site, :post_read do |site|
  next if ENV["SKIP_PUBLICATION_IMAGES"] == "1"

  publications = site.collections["publications"]
  next unless publications

  image_map = Jekyll::PublicationImages.image_map(site)

  publications.docs.each do |doc|
    next unless doc.data["image"].to_s.strip.empty?

    mapped_image = image_map[doc.basename_without_ext]
    if mapped_image.to_s.strip != ""
      doc.data["image"] = mapped_image
      next
    end

    png = File.join(site.source, "images", "publications", "#{doc.basename_without_ext}.png")
    svg = File.join(site.source, "images", "publications", "#{doc.basename_without_ext}.svg")

    if File.file?(png)
      doc.data["image"] = "images/publications/#{doc.basename_without_ext}.png"
    elsif File.file?(svg)
      doc.data["image"] = "images/publications/#{doc.basename_without_ext}.svg"
    end
  end
end
