import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { USERS_PAGE_LIMIT } from "./Users";
import { mockUsers } from "../../__fixtures__/users";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";

const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

const server = setupServer(
  rest.get(`${process.env.REACT_APP_API_URL}/users`, (req, res, ctx) => {
    const limit = req.url.searchParams.get("_limit");
    const username = req.url.searchParams.get("username");
    if (username) {
      return res(
        ctx.json([mockUsers.find((user) => user.username === username)])
      );
    }
    return res(
      ctx.set("X-total-count", "1000"),
      ctx.json(mockUsers.slice(0, Number(limit)))
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders table, changes pages and allows to see user details", async () => {
  renderWithRouter(<App />, { route: "/users" });

  // limits amount of users per page
  await waitForElementToBeRemoved(screen.getByLabelText(/loading/i));
  const [, ...tableBodyRows] = screen.getAllByRole("row");
  expect(tableBodyRows).toHaveLength(USERS_PAGE_LIMIT);

  // changes page on buttons click
  userEvent.click(
    screen.getByRole("button", {
      name: /page 2/i,
    })
  );

  screen.getByRole("button", {
    name: /page 2 is your current page/i,
  });

  // enters user's details
  const randomUserIndex = Math.floor(
    Math.random() * (Math.floor(USERS_PAGE_LIMIT) - Math.ceil(0)) + Math.ceil(0)
  );
  userEvent.click(screen.getByText(mockUsers[randomUserIndex].name));
  await waitForElementToBeRemoved(screen.getByLabelText(/loading/i));
  screen.getByText(mockUsers[randomUserIndex].name);
  screen.getByText(mockUsers[randomUserIndex].company.name);
  screen.getByText(mockUsers[randomUserIndex].address.city);

  // return to the list with persisted page
  userEvent.click(screen.getByText(/return/i));
  screen.getByRole("button", {
    name: /page 2 is your current page/i,
  });
});
