import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";

const PER_PAGE = 12;

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: {
    searchText?: string;
    page: number;
  };
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "All notes" : slug[0];

  return {
    title: `Notes filtered by: ${tag}`,
    description: `Browse notes filtered by: ${tag}`,
    openGraph: {
      title: `Notes filtered by: ${tag}`,
      description: `Browse notes filtered by: ${tag}`,
      url: `https://08-zustand-nine-sigma.vercel.app/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by: ${tag}`,
        },
      ],
    },
  };
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const searchText = searchParams?.searchText ?? "";
  const page = searchParams?.page ?? 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchText, page, tag],
    queryFn: () => fetchNotes(searchText, page, PER_PAGE, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
