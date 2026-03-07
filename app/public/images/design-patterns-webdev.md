
# 🧩 Design Patterns in Web Development

## 🖼️ Frontend Design Patterns

### 🔧 Structural & Architectural
- **Model-View-ViewModel (MVVM)** – Common in React and Vue
- **Component-based Architecture** – Core to React, Angular, Vue
- **Container/Presentational Pattern** – Separation of logic (container) and UI (presentational)

### ♻️ Reusability & Logic
- **Higher-Order Components (HOC)** – Reuse logic in React
- **Hooks (React)** – Encapsulate stateful logic
- **Composable Functions** – Functional abstraction in Vue Composition API or React
- **Render Props** – Reusable UI logic via function-as-children

### 📦 State & Data Flow
- **Flux/Redux Pattern** – One-way data flow
- **Observer Pattern** – RxJS in Angular, reactive stores in Vue
- **Facade Pattern** – Simplify access to complex APIs/stores

### 🛠 Behavioral/UI Patterns
- **Command Pattern** – Encapsulate actions (e.g., undo/redo)
- **Strategy Pattern** – Switch logic based on user roles/context
- **Mediator Pattern** – Central event communication (e.g., event bus)

## 🖥️ Backend Design Patterns

### ⚙️ Architectural
- **Model-View-Controller (MVC)** – Used in Express, ASP.NET, Laravel
- **Microservices** – Decompose into small, independent services
- **Service-Oriented Architecture (SOA)** – Clear separation between services and consumers
- **Hexagonal Architecture (Ports & Adapters)** – Isolate domain logic from external systems

### 🔁 Logic & Structure
- **Service Layer Pattern** – Keep business logic out of controllers
- **Repository Pattern** – Abstract data access (ORM/DB layer)
- **Factory Pattern** – Generate objects based on input/config
- **Singleton Pattern** – Share resources (e.g., DB connections)

### 🔗 Communication & Events
- **Observer Pattern / Pub-Sub** – Event-driven systems
- **Strategy Pattern** – Replaceable business logic (e.g., auth, payment)
- **Proxy Pattern** – Middleware for caching, logging, throttling
- **Chain of Responsibility** – Request pipeline (e.g., Express middleware)

### 🧱 Advanced/Enterprise
- **CQRS (Command Query Responsibility Segregation)** – Separate reads/writes
- **Event Sourcing** – Store changes as events
- **Saga Pattern** – Orchestration of distributed transactions
