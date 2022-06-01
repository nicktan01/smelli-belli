# Data models

## Product

| name           | type   | unique | optional |
| -------------- | ------ | ------ | -------- |
| name           | string | yes    | no       |
| scent          | string | no     | no       |
| sku            | string | yes    | no       |
| price          | int    | no     | no       |
| rating         | int    | no     | yes      |
| size           | int    | no     | no       |
| quantity       | int    | no     | no       |
| tags           | string | no     | no       |
| ingredients    | string | no     | no       |
| limited_item   | bool   | no     | no       |
| created        | int    | no     | no       |
| image          | string | no     | no       |
| description    | string | no     | no       |
| usage          | string | no     | no       |
| storage        | string | no     | no       |
| is_wish_listed | bool   | no     | no       |

The `product` entity contains the data about a specific product
that a user can purchase.

## Wish List

| name    | type                        | unique | optional |
| ------- | --------------------------- | ------ | -------- |
| user    | reference to user entity    | true   | false    |
| product | reference to product entity | true   | true     |

## Account/User

| Name        | Type                        | Unique | Optional |
| ----------- | --------------------------- | ------ | -------- |
| first_name  | string                      | no     | no       |
| last_name   | string                      | no     | no       |
| email       | string                      | no     | no       |
| address     | reference to Address entity | no     | no       |
| password    | string                      | no     | no       |
| is_staff    | bool                        | no     | no       |
| is_active   | bool                        | no     | no       |
| date_joined | datetime                    | no     | no       |

## Quiz Questions

| name      | type   | unique | optional |
| --------- | ------ | ------ | -------- |
| questions | string | y      | n        |
| answers   | string | y      | n        |

## Quiz Models

| name      | type     | unique | optional |
| --------- | -------- | ------ | -------- |
| user      | string   | n      | n        |
| questions | string   | n      | n        |
| responses | string   | n      | n        |
| created   | datetime | n      | n        |

## Cart

## Order

| Name         | Type     | Unique | Optional |
| ------------ | -------- | ------ | -------- |
| products     | int      | no     | no       |
| price        | int      | no     | no       |
| quantity     | int      | no     | no       |
| totals       | int      | no     | no       |
| order_number | int      | yes    | no       |
| customer     | int      | no     | no       |
| created      | datetime | no     | no       |

## Address

| Name             | Type   | Unique | Optional |
| ---------------- | ------ | ------ | -------- |
| billing_address  | string | no     | no       |
| shipping_address | string | no     | no       |
