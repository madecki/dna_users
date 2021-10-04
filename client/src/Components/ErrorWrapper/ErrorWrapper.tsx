export default function ErrorWrapper({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="alert alert-danger">
      <strong>{title ? title : "Something went wrong!"}</strong>
      <p>
        {description
          ? description
          : "Try again later. If problem will happen again, please contact our customer service."}
      </p>
    </div>
  );
}
