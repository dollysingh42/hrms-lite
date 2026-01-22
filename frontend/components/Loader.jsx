export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

      <p className="text-sm font-medium text-slate-600">
        {label}
      </p>
    </div>
  );
}
