type Props = {
  label: string;
  value: number | string;
};

// Small presentational child component: receives data from its parent via props
export default function StatBadge({ label, value }: Props) {
  return (
    <div className="card stat">
      <div className="num">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
