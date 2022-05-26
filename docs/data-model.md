# Data models

## Product

## Account/User

## Employees

## Body Quiz

## Home Quiz

## Cart
| Name     | Type   | Unique | Optional |
|----------|--------|--------|----------|
| product  | string | no     | no       |
| quantity | int    | no     | no       |
| totals   | float  | no     | no       |
| created  | date   | no     | no       |
## Order

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | no | no |
| city | string | no | no |
| state | reference to State entity | no | no |
| picture_url | string | no | yes |

The `location` entity contains the data about a location
that a conference can be held at.