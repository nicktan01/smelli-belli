import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Product from "./Product";

const sku = 12345;

const server = setupServer(
  rest.get(`http://localhost/undefined/api/products/${sku}`, (res, ctx) => {
    return res(
      ctx.json({
        href: `/api/products/${sku}`,
        id: 14,
        name: "test name",
        product_type: "Home",
        product_category: "test product category",
        sku,
        price: 50.0,
        size: "8.0 test size",
        scent1: "test scent 1",
        scent2: "test scent 2",
        quantity: 99,
        image: "https://i.ibb.co/mR1pvCR/roomspray2-modified.jpg",
        description: "test description",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays details", async () => {
  render(
    <BrowserRouter>
      <Product sku={sku} liked={false} />
    </BrowserRouter>
  );

  await waitFor(() => screen.findByText("test name"));

  expect(screen.getByText("test name")).toBeTruthy();
  expect(screen.getByText("$50")).toBeTruthy();
  expect(screen.getByText("8.0 test size")).toBeTruthy();
  expect(screen.getByText("Add to cart")).toBeTruthy();

  expect(screen.getByTestId(`wishlist-button-${sku}--false`)).toBeTruthy();
});

test("loads and displays details and wishlisted product", async () => {
  render(
    <BrowserRouter>
      <Product sku={sku} liked={true} />
    </BrowserRouter>
  );

  await waitFor(() => screen.findByText("test name"));

  expect(screen.getByText("test name")).toBeTruthy();
  expect(screen.getByText("$50")).toBeTruthy();
  expect(screen.getByText("8.0 test size")).toBeTruthy();
  expect(screen.getByText("Add to cart")).toBeTruthy();

  expect(screen.getByTestId(`wishlist-button-${sku}--true`)).toBeTruthy();
});
