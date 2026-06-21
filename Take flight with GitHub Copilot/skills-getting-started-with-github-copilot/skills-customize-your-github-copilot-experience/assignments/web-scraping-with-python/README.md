# 🌐 Web Scraping with Python

## 🎯 Objective

Learn how to collect and extract information from websites using Python libraries like requests and BeautifulSoup.

---

## 📝 Tasks

### ✅ Task 1: Fetch a Webpage

#### Description

Write a Python script to retrieve webpage content.

#### Requirements

- Install the `requests` library
- Send an HTTP GET request
- Print webpage HTML content

#### Example

```python
import requests

url = "https://example.com"
response = requests.get(url)

print(response.text)
```

---

### ✅ Task 2: Extract Website Data

#### Description

Use BeautifulSoup to parse webpage content.

#### Requirements

- Install `beautifulsoup4`
- Extract headings and links
- Display extracted information clearly

---

### ✅ Task 3: Save Data to File

#### Description

Store scraped data in a text or CSV file.

#### Requirements

- Create output file
- Write extracted data
- Verify saved content
