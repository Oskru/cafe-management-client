interface ErrorPageProps {
  error: Error | null;
}

export function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      {error && <p>Error Details: {error.message}</p>}
    </div>
  );
}
