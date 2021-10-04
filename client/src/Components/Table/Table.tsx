export default function TableWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <table className="table table-striped table-hover">{children}</table>;
}
