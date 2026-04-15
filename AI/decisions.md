# Engineering Decisions

## Database Choice

Decision: PostgreSQL as primary database + Vector database for semantic search

Alternatives Considered:
- MongoDB
-PostgreSQL only (without vector search)

Context

The application is a real estate platform for discovering properties in Jerusalem.
Users need to search listings using structured filters (price, bedrooms, neighborhood) and potentially natural language queries (e.g., “quiet apartment near parks with balcony”).

Structured filtering is best handled by a relational database such as PostgreSQL, while semantic similarity search requires vector embeddings.

Reasoning:
- Real estate listings have structured relational data
- Strong filtering (price, bedrooms, neighborhood)
- Joins between listings, agents, and users
- PostgreSQL provides strong indexing and query optimization
-Vector is necessary because some search queries are better handled using semantic similarity rather than strict keyword matching.


Conclusion:
-PostgreSQL is used as the primary database to manage structured relational data and support complex filtering queries.

-A vector database complements PostgreSQL by enabling semantic search and recommendation features that improve property discovery beyond traditional keyword search.

-This hybrid approach allows the system to support both structured filtering and AI-powered semantic search.

Error Handling Strategy

Used a GlobalExceptionHandler with @RestControllerAdvice to intercept all exceptions and return consistent JSON error responses.

Shape: { "status": 404, "message": "Listing not found" }

Alternatives considered:

Handling errors in each controller individually — rejected because it leads to duplicated code and inconsistent response shapes
Returning plain strings — rejected because the frontend needs a predictable structure to parse
Rules:

Known errors (RuntimeException) return a specific message and correct HTTP status code
Unknown errors (Exception) always return a generic message — never expose stack traces or internal details to the client

## Global Error Handling with @RestControllerAdvice

### Decision
Use a global exception handler (`@RestControllerAdvice`) with a standard `ErrorResponse` format.

### Why
- Ensures consistent error responses across all endpoints
- Separates error handling from business logic
- Prevents leaking internal system details to clients
- Allows mapping exceptions to appropriate HTTP status codes

### Tradeoffs
- Requires additional setup and structure
- Must define and manage custom exceptions over time

### Outcome
Cleaner controllers/services and a predictable, professional API error contract.

## Use of DTOs (Data Transfer Objects)

### Decision
Use DTOs (`ListingRequest`, `ListingResponse`) instead of exposing the `Listing` entity directly in API requests/responses.

### Why
- Prevents clients from modifying sensitive/internal fields (e.g. `id`, `createdAt`)
- Defines a clear API contract independent of the database schema
- Avoids tight coupling between backend internals and frontend expectations
- Allows control over what data is exposed

### Tradeoffs
- Requires additional mapping between DTOs and entities
- Slightly more boilerplate code

### Outcome
Improved security, flexibility, and maintainability of the API.

## Dynamic Querying with JPA Specification

### Decision
Use Spring Data JPA `Specification` for listing filters.

### Why
- Supports dynamic filtering (any combination of filters)
- Avoids creating many repository query methods
- Easy to extend when adding new filters

### Tradeoffs
- Slightly more complex than static queries
- Small runtime overhead (negligible vs DB cost)

### Outcome
Flexible, scalable filtering system aligned with real-world search functionality.

## HTTP Client (Axios)

### Decision
Use Axios as the HTTP client for frontend-to-backend communication.

### Why
- Simplifies HTTP requests compared to fetch
- Automatically handles JSON serialization/deserialization
- Supports query parameters, interceptors, and centralized configuration
- Makes API calls reusable and consistent across the frontend

### Outcome
All frontend API communication is centralized through an Axios instance (`src/api/`), improving maintainability and scalability.