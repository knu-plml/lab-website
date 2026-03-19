module Jekyll
  module CourseData
    TERM_ORDER = {
      "spring" => "1-spring",
      "summer" => "2-summer",
      "fall" => "3-fall",
      "winter" => "4-winter",
    }.freeze

    module_function

    def normalize_term(term)
      value = term.to_s.strip.downcase
      return value if value.match?(/^\d+-/)

      TERM_ORDER[value] || value
    end

    def latest_sort(semesters)
      first = Array(semesters).first || {}
      year = first["year"].to_i
      term = normalize_term(first["term"])
      "#{year}-#{term}"
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  courses = site.collections["courses"]
  next unless courses

  courses.docs.each do |doc|
    semesters = doc.data["semesters"]
    next unless semesters.is_a?(Array) && !semesters.empty?

    doc.data["latest_sort"] = Jekyll::CourseData.latest_sort(semesters)
  end
end
