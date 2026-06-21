# 🚀 Building REST APIs with FastAPI

## 🎯 Objective

Learn how to create REST APIs using the FastAPI framework in Python, including routes, request handling, and JSON responses.

---

## 📝 Tasks

### ✅ Task 1: Create Your First FastAPI Route

#### Description

Set up a FastAPI application and create a basic route.

#### Requirements

- Install FastAPI and Uvicorn
- Create an `/` route
- Return a JSON response

#### Example

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello World"}
```

---

### ✅ Task 2: Create API Endpoints

#### Description

Build multiple API endpoints for handling data.

#### Requirements

- Create GET endpoints
- Create POST endpoints
- Return JSON responses

---

### ✅ Task 3: Test the API

#### Description

Run the FastAPI server locally and test the endpoints.

#### Requirements

- Start the server using uvicorn
- Open Swagger UI
- Verify API responses