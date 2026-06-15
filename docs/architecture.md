┌─────────────────────┐
│  Shell Angular      │
└──────────┬──────────┘
           │
           ├─────────────► Player Angular
           │
           └─────────────► Admin Vue

                    │
                    ▼

             API Gateway

                    │

      ┌─────────────┼─────────────┐
      ▼             ▼             ▼

 Auth Service  User Service  Quiz Service
      │
      ▼

Realtime Service