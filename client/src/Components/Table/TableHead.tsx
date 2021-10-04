export default function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="thead-dark">{children}</thead>;
}
