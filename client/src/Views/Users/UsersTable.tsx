import { Link } from "react-router-dom";
import TableWrapper from "../../Components/Table/Table";
import TableBody from "../../Components/Table/TableBody";
import TableData from "../../Components/Table/TableData";
import TableHead from "../../Components/Table/TableHead";
import TableHeader from "../../Components/Table/TableHeader";
import TableRow from "../../Components/Table/TableRow";
import { User } from "../../Models/User";

export default function UserTable({
  users = [],
  onUserSelection,
  lastSelectedUser,
  children,
}: {
  users?: User[];
  onUserSelection: (username: string) => void;
  currentPage: number;
  lastSelectedUser: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <TableWrapper>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>Email</TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(({ name, username, email }) => (
            <TableRow isActive={lastSelectedUser === username} key={username}>
              <TableData>
                <Link
                  onClick={() => {
                    onUserSelection(username);
                  }}
                  to={`/users/${username}`}
                >
                  {name}
                </Link>
              </TableData>
              <TableData>{username}</TableData>
              <TableData>{email}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>

      {children}
    </>
  );
}
