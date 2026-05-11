# frozen_string_literal: true

require "open3"

module Jekyll
  module GalleryThumbnails
    module_function

    DEFAULTS = {
      "width" => 640,
      "height" => 400,
      "quality" => 78
    }.freeze

    def config(site)
      DEFAULTS.merge(site.config["gallery_thumbnails"] || {})
    end

    def ensure!(site)
      return if ENV["SKIP_GALLERY_THUMBNAILS"] == "1"

      script = File.join(site.source, "scripts", "generate_gallery_thumbnails.py")
      return unless File.file?(script)

      settings = config(site)
      stdout, stderr, status = Open3.capture3(
        "python3",
        script,
        "--width",
        settings["width"].to_s,
        "--height",
        settings["height"].to_s,
        "--quality",
        settings["quality"].to_s,
        chdir: site.source
      )

      stdout.each_line do |line|
        Jekyll.logger.info "Gallery thumbnails:", line.strip
      end

      return if status.success?

      stderr.each_line do |line|
        Jekyll.logger.warn "Gallery thumbnails:", line.strip
      end
      Jekyll.logger.warn "Gallery thumbnails:", "using original gallery images"
    end

    def thumbnail_for(site, image)
      image = image.to_s
      return image unless image.start_with?("images/gallery/")
      return image if image.start_with?("images/gallery/thumbnails/")

      settings = config(site)
      ext = File.extname(image)
      basename = File.basename(image, ext)
      thumbnail = "images/gallery/thumbnails/#{basename}-#{settings["width"]}x#{settings["height"]}.jpg"
      path = File.join(site.source, thumbnail)

      File.file?(path) ? thumbnail : image
    end
  end

  module GalleryThumbnailFilter
    def gallery_thumbnail(image)
      site = @context.registers[:site]
      GalleryThumbnails.thumbnail_for(site, image)
    end
  end
end

Jekyll::Hooks.register :site, :after_reset do |site|
  Jekyll::GalleryThumbnails.ensure!(site)
end

Liquid::Template.register_filter(Jekyll::GalleryThumbnailFilter)
