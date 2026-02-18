interface Props {
  title: string;
  value: string;
  change?: string;
}

export default function KpiCard({ title, value, change }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      {change && (
        <p className="text-sm mt-1 text-green-500">{change}</p>
      )}
    </div>
  );
}
