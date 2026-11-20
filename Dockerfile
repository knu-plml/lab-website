FROM ruby:3.3-bookworm AS build

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-venv poppler-utils \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="/opt/venv/bin:${PATH}" \
    BUNDLE_FROZEN=true
WORKDIR /src

COPY Gemfile Gemfile.lock ./
# sass-embedded 1.58.3's installer assumes URI is already loaded.
RUN gem install bundler -v 2.5.6 --no-document \
    && RUBYOPT=-ruri bundle _2.5.6_ install

COPY requirements.txt ./
RUN python3 -m venv /opt/venv \
    && pip install --no-cache-dir -r requirements.txt

COPY . .
RUN bundle _2.5.6_ exec jekyll build --destination /output \
    && test -s /output/index.html

FROM scratch AS artifact
COPY --from=build /output/ /
