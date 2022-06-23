# Data models

## Inventory microservice

---

### Product

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| name             | string | yes    | no       |
| product_type     | string | no     | no       |
| product_category | string | no     | no       |
| size             | string | no     | no       |
| sku              | string | yes    | no       |
| price            | int    | no     | no       |
| scent1           | string | no     | no       |
| scent2           | string | no     | no       |
| quantity         | int    | no     | no       |
| image            | string | no     | no       |
| description      | string | no     | no       |

The `product` entity contains the data about a specific product
that a user can purchase.

## Customer microservice

---

### Wish List

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| user    | reference to user entity    | true   | false    |
| product | reference to product entity | true   | true     |

### ProductVO

| name        | type                        | unique | optional |
| ----------- | --------------------------- | ------ | -------- |
| import_href | reference to Product entity | yes    | no       |
| name        | reference to Product entity | no     | no       |
| sku         | reference to Product entity | yes    | no       |
| price       | reference to Product entity | no     | no       |
| image       | reference to Product entity | no     | no       |

### Home Quiz

| name     | type                     | unique | optional |
| -------- | ------------------------ | ------ | -------- |
| answer_1 | string                   | no     | no       |
| answer_2 | string                   | no     | no       |
| answer_3 | string                   | no     | no       |
| answer_4 | string                   | no     | no       |
| answer_5 | string                   | no     | no       |
| created  | datetime                 | no     | no       |
| user     | reference to User entity | no     | no       |

### Body Quiz

| name     | type                     | unique | optional |
| -------- | ------------------------ | ------ | -------- |
| answer_1 | string                   | no     | no       |
| answer_2 | string                   | no     | no       |
| answer_3 | string                   | no     | no       |
| answer_4 | string                   | no     | no       |
| answer_5 | string                   | no     | no       |
| created  | datetime                 | no     | no       |
| user     | reference to User entity | no     | no       |

### Cart

| name     | type                        | unique | optional |
| -------- | --------------------------- | ------ | -------- |
| product  | reference to Product entity | no     | no       |
| user     | reference to User entity    | no     | no       |
| quantity | int                         | no     | no       |
| totals   | int                         | no     | no       |
| created  | datetime                    | no     | no       |

## Employee microservice

---

### ProductVO

| name        | type                        | unique | optional |
| ----------- | --------------------------- | ------ | -------- |
| import_href | reference to Product entity | yes    | no       |
| name        | reference to Product entity | yes    | no       |
| size        | reference to Product entity | no     | no       |
| sku         | reference to Product entity | yes    | no       |
| price       | reference to Product entity | no     | no       |
| quantity    | reference to Product entity | no     | no       |

### Order

| Name         | Type     | Unique | Optional |
| ------------ | -------- | ------ | -------- |
| products     | int      | no     | no       |
| quantity     | int      | no     | no       |
| totals       | int      | no     | no       |
| order_number | int      | yes    | no       |
| created      | datetime | no     | no       |
