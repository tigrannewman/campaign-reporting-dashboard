export default function ErrorState({ message = "Failed to load data" }: { message?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-red-500">
      <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-red-500" />
      {message}
    </div>
  );
}
