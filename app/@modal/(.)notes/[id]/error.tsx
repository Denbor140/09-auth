'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return <p>Could not fetch the note {error.message}</p>;
}
