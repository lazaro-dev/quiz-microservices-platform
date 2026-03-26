Frontend (Vue / Flutter / Angular)
           │
           ▼
       API Gateway
           │
 ┌─────────┼─────────┐
 │         │         │
Auth      Quiz      User
 (Go)   (Laravel)  (Spring)
           │
           ▼
        RabbitMQ
           │
 ┌─────────┴─────────┐
 │                   │
Stats             Notifications
(Node)              (Python)