# orders-api (API Application)
Orders service. Exposes `GET /orders`, `POST /orders`.
**Depends on:** orders-db (`ORDERS_DB_URL`), inventory-api (`INVENTORY_URL` `GET /stock`), payments-api (`PAYMENTS_URL` `POST /charge`).
