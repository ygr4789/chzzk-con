interface ErrorPageProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorPage({ error, onRetry }: ErrorPageProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center text-red-600">
        <p>Error: {error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
} 