# Pokémon Tracker - ASP.NET Core API

This is the backend API for the Pokémon Tracker, built with ASP.NET Core Minimal API.

## Getting Started

### Prerequisites

- .NET 8 SDK

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/poke-tracker-api.git
   cd poke-tracker-api
   ```

2. Configure your environment variables:
   Create a `appsettings.Development.json` or use the `Secrets Manager` for development secrets.

3. Run the API:
   ```bash
   dotnet run
   ```

The API will be accessible by default at `https://localhost:5001`.

### CORS

Make sure to configure CORS in `Program.cs` to allow the frontend origin:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://localhost:5173"));
});
```
