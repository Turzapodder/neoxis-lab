import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailsPage } from '@/views/ProjectDetails';
import { ContentProvider } from '@/components/content/ContentProvider';
import { loadSiteContent, resolveProjectDetail } from '@/lib/cms-bridge';
import { buildProjectMetadata } from '@/lib/seo';
import { projectJsonLd } from '@/lib/jsonld';

export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

/** CMS content plus the case study it resolves to for `id` (null when unknown). */
async function loadProject(id: string) {
  const content = await loadSiteContent();
  return { content, project: resolveProjectDetail(content, id) };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const { project } = await loadProject(id);
  return project ? buildProjectMetadata(project) : { title: 'Project Not Found' };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const { content, project } = await loadProject(id);
  if (!project) notFound();

  return (
    <ContentProvider content={content}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <ProjectDetailsPage key={project.id} project={project} />
    </ContentProvider>
  );
}
