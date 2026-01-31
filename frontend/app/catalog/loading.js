export default function Loading() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 rounded-lg bg-gray-800 animate-pulse" />
      ))}
    </div>
  );
}
