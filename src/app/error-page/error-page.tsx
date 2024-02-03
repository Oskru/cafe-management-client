import { Dock } from '../dock/dock';

interface ErrorPageProps {
  error: Error | null;
}

export function ErrorPage({ error }: ErrorPageProps) {
  return (
    <>
      <Dock />
      <div style={{ padding: '0 10px 0 10px' }}>
        <h1>Something went wrong!</h1>
        {error && <p>Error Details: {error.message}</p>}
      </div>
    </>
  );
}
