# Data models

## Product
| name           | type      | unique | optional |
|----------------|-----------|--------|----------|
| name           | string    | yes    | no       |
| scent          | string    | no     | no       |
| sku            | string    | yes    | no       |
| price          | int       | no     | no       |
| rating         | int       | no     | yes      |
| size           | int       | no     | no       |
| quantity       | int       | no     | no       |
| tags           | string    | no     | no       |
| ingredients    | string    | no     | no       |
| limited_item   | bool      | no     | no       |
| created        | date time | no     | no       |
| image          | string    | no     | no       |
| description    | string    | no     | no       |
| usage          | string    | no     | no       |
| storage        | string    | no     | no       |
| is_wish_listed | bool      | no     | no       |

## Wish List
| name    | type                        | unique | optional |
|---------|-----------------------------|--------|----------|
| user    | reference to user entity    | true   | false    |
| product | reference to product entity | true   | true     |

## Account/User
| Name       | Type                        | Unique | Optional |
|------------|-----------------------------|--------|----------|
| first_name | string                      | no     | no       |
| last_name  | string                      | no     | no       |
| email      | string                      | no     | no       |
| address    | reference to Address entity | no     | no       |
| password   | string                      | no     | no       |
| is_staff   | bool                        | no     | no       |
## Employees

## Body Quiz

## Home Quiz

## Cart

## Order

## Guest
| Name       | Type   | Unique | Optional |
|------------|--------|--------|----------|
| first_name | string | no     | no       |
| last_name  | string | no     | no       |
| email      | string | no     | no       |
| address    | string | no     | no       |

## Address

| Name             | Type   | Unique | Optional |
|------------------|--------|--------|----------|
| billing_address  | string | no     | no       |
| shipping_address | string | no     | no       |

The `location` entity contains the data about a location
that a conference can be held at.