import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { SITE } from '@/config/site';
import { getCmsContent } from '@/server/content';
import { CONTACT_EMAIL, SOCIAL_PROFILES } from '@/data/company';

export const dynamic = 'force-dynamic';

const groqClient = createGroq({
  apiKey: process.env.GROQ_API_KEY || 'missing-groq-api-key',
});

/** Model cascade: big → small → compound → smart local fallback. */
const GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'groq/compound-mini'] as const;

interface ChatMessageInput {
  role: 'user' | 'assistant';
  content: string;
}

/* ── Smart local fallback (works with zero API keys) ───────────────────────── */

async function getSmartFallbackResponse(message: string): Promise<string> {
  const cms = await getCmsContent();
  const PRICING_PLANS = cms.pricing;
  const SERVICES = cms.services;
  const PROJECTS = cms.projects;
  const TEAM = cms.team;
  const FAQ_LIST = cms.faqs;
  const TESTIMONIAL_LIST = cms.testimonials;
  const q = message.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('pricing') || q.includes('plan')) {
    const plans = PRICING_PLANS.map(
      (p) =>
        `- **${p.name}** (${p.duration}): ${p.price.Standard}/Project — ${p.tagline}`,
    ).join('\n');
    return `### 💰 neoxis Pricing\n\n${plans}\n\nLock in a plan through the **Let's Build** button or email us at ${CONTACT_EMAIL}!`;
  }

  if (q.includes('service') || q.includes('offer') || q.includes('do you do') || q.includes('capabilit')) {
    const services = SERVICES.map((s) => `- **${s.title}**: ${s.tags.join(' · ')}`).join('\n');
    return `### 🛠️ What neoxis Does\n\n${services}\n\nEvery engagement includes senior people on every project, strategy through build in one team, and clean handover packages.`;
  }

  const projectAliases: Record<string, string> = {
    'neon frame': 'neon-frame-system',
    'music os': 'music-os-ai',
    botly: 'botly-port-app',
    curea: 'curea-studio',
    'sos core': 'sos-core-identity-app',
    space: 'space',
    mobile: 'mobile',
  };

  for (const [alias, id] of Object.entries(projectAliases)) {
    if (q.includes(alias)) {
      const project = PROJECTS.find((p) => p.id === id);
      if (project) {
        return `### 🎨 ${project.title} — Case Study\n\n${project.category}\n\n- **Category**: ${project.category}\n- **Year**: ${project.year}\n- **Full case study**: ${SITE.url}/project/${project.id}\n\nAsk me about the goals we achieved or the process behind it!`;
      }
    }
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
    const projects = PROJECTS.map(
      (p) => `- **${p.title}** (${p.year}) — ${p.category} → ${SITE.url}/project/${p.id}`,
    ).join('\n');
    return `### 📂 Selected Work\n\n${projects}\n\nEvery case study includes the purpose, achieved goals and client testimonial.`;
  }

  if (q.includes('team') || q.includes('who') || q.includes('people') || q.includes('designer')) {
    const team = TEAM.map((m) => `- **${m.name}** — ${m.role}, ${m.location}: ${m.bio}`).join('\n');
    return `### 👥 The neoxis Team\n\n${team}\n\nA small senior team — you work directly with the people designing and building your product.`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('call') || q.includes('touch')) {
    return `### 📬 Contact neoxis\n\n- **Email**: ${CONTACT_EMAIL}\n- **Twitter/X**: ${SOCIAL_PROFILES.x}\n- **Dribbble**: ${SOCIAL_PROFILES.dribbble}\n- **LinkedIn**: ${SOCIAL_PROFILES.linkedin}\n\n${SITE.description} We respond within 24 hours!`;
  }

  if (q.includes('process') || q.includes('workflow') || q.includes('how do you')) {
    return `### ⚡ The neoxis Playbook\n\n1. **Blueprint** — Creative direction & architecture\n2. **Sprints** — High-fidelity UI & motion craft\n3. **Shipping** — Stress-testing & production drop\n\nZero fluff, zero bloated slide decks. Just rapid sprints, tight feedback loops, and elite execution that ships on time.`;
  }

  if (q.includes('faq') || q.includes('refund') || q.includes('ship') || q.includes('fast')) {
    const faq = FAQ_LIST.map((f) => `- **${f.question}**\n  ${f.answer}`).join('\n\n');
    return `### ❓ Frequently Asked\n\n${faq}`;
  }

  if (q.includes('review') || q.includes('testimonial') || q.includes('client')) {
    const t = TESTIMONIAL_LIST[0];
    return `### ⭐ What Clients Say\n\n"${t.lead} ${t.rest}" — **${t.name}**, ${t.role}\n\n4.9/5 average from 60+ project reviews. 95% of clients report better ROI within a month of launch, and 88% come back for a second or third project.`;
  }

  return `### 👋 Hi! I'm the neoxis AI assistant\n\nI can tell you about:\n- 🎨 **Case studies** — Neon Frame System, Music OS AI, Botly Port App and more\n- 🛠️ **Services** — Brand & Identity, Motion & 3D, Web Experiences, Product UI/UX\n- 💰 **Pricing** — Sprint MVP from $500, Growth Scale, Full Ecosystem\n- 👥 **The team** — 12 specialists across design, motion and engineering\n- 📬 **Contact** — ${CONTACT_EMAIL}\n\nWhat would you like to know?`;
}

/* ── Route handler ──────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  let userQuery = '';
  try {
    const body = await request.json();
    const message = body?.message;
    const conversationHistory: ChatMessageInput[] = Array.isArray(body?.conversationHistory)
      ? body.conversationHistory.slice(-4)
      : [];

    userQuery = typeof message === 'string' ? message : '';
    if (!userQuery || userQuery.length > 2000) {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    const cms = await getCmsContent();

    const projectContext = cms.projects
      .map((p) => `- ${p.title} (${p.year}) — ${p.category}. Case study: ${SITE.url}/project/${p.id}`)
      .join('\n');

    const serviceContext = cms.services
      .map((s) => `- ${s.title} [${s.tags.join(', ')}]: ${s.slides.map((sl) => sl.title).join(', ')}`)
      .join('\n');

    const pricingContext = cms.pricing
      .map((p) => `- ${p.name} (${p.duration}): ${p.price.Standard} — ${p.tagline}`)
      .join('\n');

    const teamContext = cms.team
      .map((m) => `- ${m.name} — ${m.role}, ${m.location}: ${m.bio}`)
      .join('\n');

    const testimonialContext = cms.testimonials
      .map((t) => `- "${t.lead}" — ${t.name}, ${t.role}`)
      .join('\n');

    const faqContext = cms.faqs
      .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n\n');

    const prompt = `You are the neoxis AI assistant for a creative design agency's website. Answer using ONLY the context below — never invent projects, prices or people.

ABOUT NEOXIS:
${SITE.description} Tagline: ${SITE.tagline}. 50+ drops shipped, 30+ obsessed clients, 8+ years, 15+ countries. Email: ${CONTACT_EMAIL}

CASE STUDIES:
${projectContext}

SERVICES:
${serviceContext}

PRICING:
${pricingContext}

TEAM:
${teamContext}

CLIENT TESTIMONIALS:
${testimonialContext}

FAQS:
${faqContext}

INSTRUCTIONS:
1. Be concise, friendly and on-brand for a bold creative agency. Use markdown with bold, lists and a tasteful emoji or two.
2. For pricing questions quote the exact plan names and prices. For project questions give the case-study URL.
3. For contact/hiring requests share ${CONTACT_EMAIL}.
4. If the answer is not in the context, say so briefly and point to ${CONTACT_EMAIL}.
5. Keep responses under 180 words unless the user asks for a detailed list.

Recent conversation:
${conversationHistory.map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')}

User: ${userQuery}
Assistant:`;

    for (const model of GROQ_MODELS) {
      try {
        const { text } = await generateText({
          model: groqClient(model),
          prompt,
          maxRetries: 1,
          temperature: 0.7,
        });
        if (text?.trim()) {
          return NextResponse.json({ message: text, success: true });
        }
      } catch (modelError) {
        console.warn(`Groq model ${model} failed:`, modelError);
      }
    }

    // All models failed — smart local response keeps the widget useful.
    return NextResponse.json({ message: await getSmartFallbackResponse(userQuery), success: true });
  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json({ message: await getSmartFallbackResponse(userQuery), success: true });
  }
}
