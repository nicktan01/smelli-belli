# APIs

## Product

- **Method**: `POST`, `GET`, `GET`, `PUT`, `DELETE`,
- **Path**: `/api/products`, `/api/products/<int:pk>`

Input:

```json
{
  "name": string,
  "scent": string,
  "sku": string,
  "price": int,
  "rating": int,
  "size": int,
  "quantity": int,
  "tags": string,
  "ingredients": string,
  "limited_item": bool,
  "created": int,
  "image": string,
  "description": string,
  "usage": string,
  "storage": string,
  "is_wish_listed": bool,

}
```

Output:

```json
{
  "name": string,
  "scent": string,
  "sku": string,
  "price": int,
  "rating": int,
  "size": int,
  "quantity": int,
  "tags": string,
  "ingredients": string,
  "limited_item": bool,
  "created": int,
  "image": string,
  "description": string,
  "usage": string,
  "storage": string,
  "is_wish_listed": bool,
}
```

Creating a new product saves the name, scent, sku, price, rating, size, quantity, tags, ingredients, limited_item, created, image, description, usage, storage, and is_wish_listed. This adds a new existing Product to the database which can be wish listed, added or purchased by a user.

## Wish List

- **Method**: `GET`, `PUT`, `DELETE`,
- **Path**: `/api/wish_list/<int:pk>`,

Input:

```json
{
  "name": string,
  "product": string
}
```

Output:

```json
{
  "name": string,
  "product": string
}
```

Creating a new product saves the name, scent, sku, price, rating, size, quantity, tags, ingredients, limited_item, created, image, description, usage, storage, and is_wish_listed. This adds a new existing Product to the database which can be wish listed, added or purchased by a user.

## Accounts

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/api/accounts`, `/api/accounts/<int:pk>`

Input:

```json
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "password": string,
    "address":  {
        billing_address: string,
        shipping_address: string
        },
    "is_staff": bool
}
```

Output:

```json
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "password": string,
    "address":  {
        billing_address: string,
        shipping_address: string
        },
    "is_staff": bool
}
```

The Accounts API will create, update, or delete an account for a user on the Smelli Belli website. Users will need to enter in all of the information listed to create an account. The is_staff boolean field will be to determine whether an account has access to Employee pages.

## Address

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/api/address`, `/api/address/<int:pk>`

Input:

```json
{
"billing_address": string,
"shipping_address": string
}
```

Output:

```json
{
"billing_address": string,
"shipping_address": string
}
```

The Address API will be tied to the accounts and users will enter in both a shipping and billing address for their accounts. The addresses can be updated.

## Guest

- Method: `GET`, `POST`
- Path: `/api/accounts`, `/api/accounts/<int:pk>`

Input:

```json
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "address": string
}
```

Output:

```json
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "address": string
}
```

The Guest API will be primarily for users who would not like to make an account to purchase items on Smelli Belli.

## Questions

- Method: `POST`, `GET`
- Path: `/api/questions`

Input:

```json
{
  "question": string,
  "answers": [string]
}
```

Output:

```json
{
  "id": int,
  "questions": string,
  "answers": [string]
}
```

Quiz questions and answers will be populated by employees and will largely remain the same. However, to create and update questions and answers should both be updated so the imput and outputs will be very similar.

## Quizzes

- Method: `POST`, `DELETE`
- Path: `/api/body-quiz`, `/api/home-quiz`

Input:

```json
{
  "responses": string
}
```

Output:

```json
{
  "user": string,
  "questions": string,
  "responses": string,
  "quiz_date": datetime
}
```

An instance of a quiz will be created when a user takes the quiz, users will only provide their answers, the output will save answers associated to their questions, the user who took the quiz, and the date/time the quiz was taken. Users with accounts can delete saved quiz results.

## Create a cart

- **Method**: `GET`, `POST`, `DELETE`, `UPDATE`
- **Path**: `/api/cart/<int:pk>`

Input:

```json
{
  "product": string,
  "quantity": int,
  "totals": int,
  "created": date
}
```

Output:

```json
{
 {
  "product": string,
  "quantity": int,
  "totals": int,
  "created": date
}
}
```

Create a new cart that uses the product information to calculate the total price of all the products in the cart

## Orders

- **Method**: `POST`, `GET`, `GET`, `PUT`, `DELETE`
- **Path**: `/api/orders`, `/api/orders/<int:pk>`

Input:

```json
{
  "products": {
      "name": string,
    "sku": string,
    "size": string,
    "price": int
  },
  "price": int,
  "quantity": int
}
```

Output:

```json
{
  "products": {
    "name": string,
    "sku": string,
    "size": string,
    "price": int
  },
  "price": int,
  "quantity": int,
  "total": int,
  "order_number": string,
  "customer": string
}
```

Creating a new order collects all of the relevant product data from the order, and matches the quantities to those prices. It will then calculate the subtotal(s) and total. The order number will be generated serially. A query is also made to match the order to the customer who made the order, placing their name or id in the result.

NOTE: Orders should describe a ProductVO as opposed to the Product entity. The ProductVO will also have a "quantities" prop on it. Then, Orders price and quantity is much more easily calculated and is not manipulating Products directly. We will likely find other value objects as we go through this.
