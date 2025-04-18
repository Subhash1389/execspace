Web Scraper & Host via Docker (Node.js + Python Flask)

Overview
This project demonstrates using Node.js + Puppeteer to scrape a webpage and Python + Flask to serve the data. Everything is containerized using a multi-stage Docker build.

Build the Docker Image

```bash
docker build --build-arg SCRAPE_URL=https://example.com -t web-scraper .
docker run -p 5000:5000 we-scraper .

## Access the Scraped Data
http://localhost:5000



## example
docker build --build-arg SCRAPE_URL=https://en.wikipedia.org/wiki/Web_scraping -t web-scraper .
docker run -p 5000:5000 web-scraper

