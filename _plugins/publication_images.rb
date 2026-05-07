# frozen_string_literal: true

require "open3"

module Jekyll
  module PublicationImages
    module_function

    def ensure!(site)
      return if ENV["SKIP_PUBLICATION_IMAGES"] == "1"

      script = File.join(site.source, "scripts", "ensure_publication_images.py")
      return unless File.file?(script)

      stdout, stderr, status = Open3.capture3("python3", script, chdir: site.source)

      stdout.each_line do |line|
        Jekyll.logger.info "Publication images:", line.strip
      end

      return if status.success?

      stderr.each_line do |line|
        Jekyll.logger.error "Publication images:", line.strip
      end
      raise "failed to ensure publication images"
    end
  end
end

Jekyll::Hooks.register :site, :after_reset do |site|
  Jekyll::PublicationImages.ensure!(site)
end
