require "cgi"

module Jekyll
  module PublicationLinks
    QUOTED_TITLE = /[“"]([^”"]+)[”"]/

    def auto_link_publications(input)
      return input if input.nil?

      site = @context.registers[:site]
      publications = site.collections["publications"]&.docs || []
      return input.to_s if publications.empty?

      index = publications.each_with_object({}) do |publication, lookup|
        title = publication.data["title"].to_s
        next if title.empty?

        lookup[normalize_title(title)] = publication
      end

      input.to_s.gsub(QUOTED_TITLE) do |match|
        title = Regexp.last_match(1)
        publication = index[normalize_title(title)]
        next match unless publication

        url = publication.url
        escaped = markdown_escape(title)
        quote_open = match.start_with?("“") ? "“" : '"'
        quote_close = match.end_with?("”") ? "”" : '"'

        "#{quote_open}[#{escaped}](#{url})#{quote_close}"
      end
    end

    module_function

    def normalize_title(title)
      CGI.unescapeHTML(title.to_s)
        .downcase
        .gsub(/[“”]/, '"')
        .gsub(/[‘’]/, "'")
        .gsub(/[^0-9a-z가-힣]+/, "")
    end

    def markdown_escape(text)
      text.to_s.gsub(/([\\\[\]])/, '\\\\\1')
    end
  end
end

Liquid::Template.register_filter(Jekyll::PublicationLinks)
