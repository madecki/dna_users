import { useState } from "react";
import { Route, useRouteMatch } from "react-router";
import ErrorWrapper from "../../Components/ErrorWrapper/ErrorWrapper";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";
import Pagination from "../../Components/Pagination/Pagination";
import useFetch from "../../Hooks/useFetch";
import { User } from "../../Models/User";
import UserPreview from "../UserPreview/UserPreview";
import UsersTable from "./UsersTable";

export const USERS_PAGE_LIMIT = 20;

export default function Users() {
  const [queryParams, setQueryParams] = useState(() => ({
    page: 1,
    limit: USERS_PAGE_LIMIT,
  }));
  const [lastSelectedUser, setLastSelectedUser] = useState("");
  const { isLoading, data, error, headers } = useFetch<User[]>(
    "/users",
    queryParams
  );
  const match = useRouteMatch();
  const pageCount = Math.ceil(
    Number(headers?.get("X-total-count")) / USERS_PAGE_LIMIT
  );

  return (
    <section>
      <Route exact path={`${match.path}`}>
        <header>
          <h1>Find and discover users</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            vitae corrupti, officiis architecto eos non?
          </p>
        </header>
        {isLoading && <LoadingIndicator />}
        {error && <ErrorWrapper />}

        {data && (
          <UsersTable
            users={data}
            onUserSelection={(username: string) => {
              setLastSelectedUser(username);
            }}
            currentPage={queryParams.page}
            lastSelectedUser={lastSelectedUser}
          >
            <Pagination
              pageCount={pageCount}
              initialPage={queryParams.page - 1}
              onPageChange={(page) => {
                if (page === queryParams.page) return;
                setQueryParams({
                  ...queryParams,
                  page,
                });
              }}
            />
          </UsersTable>
        )}
      </Route>
      <Route path={`${match.path}/:username`}>
        <UserPreview />
      </Route>
    </section>
  );
}
