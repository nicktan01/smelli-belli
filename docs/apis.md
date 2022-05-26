# APIs

## Product

* **Method**: `POST`, `GET`, `GET`, `PUT`, `DELETE`, 
* **Path**: /api/products, /api/products/<int:pk>

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

Creating a new product saves the name, scent, sku, price, rating, size, quantity, tags, ingredients, limited_item, created, image, description, usage, storage, and is_wish_listed. 

## Wish List
* **Method**: `POST`, `GET`, `PUT`, `DELETE`, 
* **Path**: /api/wish_list/<int:pk>,

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

## Accounts

* Method: `GET`, `POST`, `PUT`, `DELETE`
* Path: /api/accounts, /api/accounts/<int:pk>

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


## Address

* Method: `GET`, `POST`, `PUT`, `DELETE`
* Path: /api/address, /api/address/<int:pk>

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

## Guest

* Method: `POST`
* Path: /api/accounts, /api/accounts/<int:pk>

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

## Questions

* Method: `POST`, `GET`
* Path: /api/questions

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

* Method: `POST`, `DELETE`
* Path: /api/body-quiz, /api/home-quiz

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

* **Method**: `GET`, `POST`, `DELETE`, `UPDATE`
* **Path**: /api/cart/<int:pk>

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