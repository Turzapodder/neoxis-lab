import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailsPage } from '@/views/ProjectDetails';
import { ContentProvider } from '@/components/content/ContentProvider';
import { loadSiteContent } from '@/lib/cms-bridge';
import { buildProjectMetadata } from '@/lib/seo';
import { projectJsonLd } from '@/lib/jsonld';
import { PROJECT_DETAILS_MAP, SPACE_PROJECT_DETAIL } from '@/data/projectDetails';

export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

/** Generate metadata + static params from CMS projects (falls back to bundled data). */
async function resolveProject(id: string) {
  const content = await loadSiteContent();
  const cmsProject = content.projects.find((p) => p.id === id);
  const detail = PROJECT_DETAILS_MAP[id];
  return { cmsProject, detail };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const { cmsProject } = await resolveProject(id);
  if (!cmsProject) return { title: 'Project Not Found' };

  return buildProjectMetadata({
    id: cmsProject.id,
    title: cmsProject.title.replace(/\.$/, ''),
    subtitle: `"${cmsProject.category}"`,
    service: cmsProject.category,
    industry: cmsProject.year,
    year: cmsProject.year,
    heroImage1: cmsProject.image,
    heroImage2: cmsProject.image,
    purpose: { heading: '', description: [], bullets: [] },
    purposeImages: [],
    goals: { heading: '', description: [], points: [] },
    testimonial: { quote: '', clientName: '', clientRole: '', clientImage: '' },
    showcaseImage: cmsProject.image,
    nextProject: { id: '', title: '' },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const content = await loadSiteContent();

  // Case-study narrative stays template-based; CMS controls the tile + SEO data.
  const knownIds = new Set([
    ...content.projects.map((p) => p.id),
    ...Object.keys(PROJECT_DETAILS_MAP),
  ]);
  if (!knownIds.has(id)) notFound();

  const cmsProject = content.projects.find((p) => p.id === id);
  const project = cmsProject
    ? {
        ...SPACE_PROJECT_DETAIL,
        id: cmsProject.id,
        title: cmsProject.title.replace(/\.$/, ''),
        subtitle: `"${cmsProject.category}"`,
        service: cmsProject.category,
        industry: cmsProject.year,
        year: cmsProject.year,
        heroImage1: cmsProject.image,
        heroImage2: cmsProject.image,
        showcaseImage: cmsProject.image,
      }
    : (PROJECT_DETAILS_MAP[id] ?? SPACE_PROJECT_DETAIL);

  return (
    <ContentProvider content={content}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <ProjectDetailsPage projectId={project.id} />
    </ContentProvider>
  );
}
