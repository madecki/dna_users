export default function TableRow({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return <tr className={isActive ? "table-info" : ""}>{children}</tr>;
}
