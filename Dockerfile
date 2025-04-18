# Stage 1: Scraping with Node.js + Puppeteer
FROM node:18-slim AS scraper

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install -y \
  chromium \
  ca-certificates \
  fonts-liberation \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install
COPY scrape.js ./

ARG SCRAPE_URL
ENV SCRAPE_URL=$SCRAPE_URL
RUN node scrape.js

# Stage 2: Serving with Python + Flask
FROM python:3.10-slim AS server

WORKDIR /app
COPY --from=scraper /app/scraped_data.json ./
COPY server.py requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["python", "server.py"]
