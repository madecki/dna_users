import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ErrorWrapper from "../../Components/ErrorWrapper/ErrorWrapper";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";
import useFetch from "../../Hooks/useFetch";
import { User } from "../../Models/User";

export default function UserPreview() {
  const { username } = useParams<{ username: string }>();
  const { isLoading, data, error } = useFetch<User[]>(
    `/users?username=${username}`
  );

  if (isLoading) return <LoadingIndicator />;

  if (error) return <ErrorWrapper />;

  const [{ name, address, company }] = data!;

  return (
    <section className="mt-4">
      <Link className="btn btn-primary" to="/users">
        RETURN
      </Link>
      <article className="mt-4">
        <h2 className="mb-4">{name}</h2>
        <p>
          Works in: <span className="text-primary">{company.name}</span>
        </p>
        <p>
          Lives in: <span className="text-primary">{address.city}</span>
        </p>
      </article>
    </section>
  );
}
