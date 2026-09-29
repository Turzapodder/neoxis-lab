'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  ImagePlus,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react';
import { adminFetch } from '@/lib/admin-fetch';
import { SectionEditorSkeleton } from '@/components/ui/Skeleton';

/* ── Types mirroring the section registry API contract ─────────────────── */

interface FieldRule {
  required?: boolean;
  max?: number;
}

interface SectionMeta {
  key: string;
  label: string;
  description: string;
  schema: Record<string, FieldRule>;
  items: Record<string, unknown>[];
}

type ItemErrors = Record<number, Record<string, string>>;

/* Field labels & hint text per schema key (UI nicety, not validation). */
const FIELD_LABELS: Record<string, string> = {
  id: 'ID (slug)',
  num: 'Number',
  title: 'Title',
  year: 'Year',
  category: 'Category',
  image: 'Image',
  colSpanClass: 'Grid span class (optional)',
  logoType: 'Logo type (infinity/speed/wordmark/monogram)',
  tags: 'Tags (one per line)',
  slides: 'Showcase slides',
  name: 'Name',
  duration: 'Duration',
  priceStandard: 'Standard price',
  pricePremium: 'Premium price',
  unit: 'Unit (e.g. /Project)',
  tagline: 'Tagline',
  features: 'Features (one per line)',
  featured: 'Featured plan',
  role: 'Role',
  location: 'Location',
  bio: 'Bio',
  socialX: 'X / Twitter URL',
  socialDribbble: 'Dribbble URL',
  socialLinkedin: 'LinkedIn URL',
  portfolio: 'Portfolio URL',
  github: 'GitHub URL',
  lead: 'Lead quote',
  rest: 'Rest of quote',
  rating: 'Rating (1–5)',
  question: 'Question',
  answer: 'Answer',
  number: 'Number',
  subtitle: 'Subtitle',
  logo: 'Hero logo (aurea/aura)',
  value: 'Value',
  label: 'Label',
  icon: 'Icon (starburst/users/rocket/globe)',
};

const TEXTAREA_FIELDS = new Set(['features', 'answer', 'rest', 'bio', 'tagline', 'description']);
const URL_FIELDS = new Set(['image', 'socialX', 'socialDribbble', 'socialLinkedin', 'portfolio', 'github']);

/* ── Image recommendations per section ──────────────────────────────────── */

interface ImageSpec {
  /** Human-readable recommendation, e.g. "1600 × 1000 (16:10)". */
  rec: string;
  /** Recommended width/height ratio. */
  ratio: number;
  /** Below this width the image will look soft in the layout. */
  minWidth: number;
}

const DEFAULT_IMAGE_SPEC: ImageSpec = { rec: '1200 × 800 (3:2)', ratio: 1.5, minWidth: 800 };

const IMAGE_SPECS: Record<string, ImageSpec> = {
  projects: { rec: '1600 × 1000 (16:10) — wide work tile', ratio: 1.6, minWidth: 1200 },
  team: { rec: '800 × 800 (1:1) — square portrait', ratio: 1, minWidth: 600 },
  testimonials: { rec: '400 × 400 (1:1) — square avatar', ratio: 1, minWidth: 200 },
  hero: { rec: '1200 × 900 (4:3) — hero slider card', ratio: 4 / 3, minWidth: 900 },
};

const imageSpecFor = (sectionKey: string, field: string): ImageSpec => {
  if (sectionKey === 'services' && field !== 'image') {
    // Service slide images.
    return { rec: '1200 × 800 (3:2) — showcase slide', ratio: 1.5, minWidth: 800 };
  }
  return IMAGE_SPECS[sectionKey] ?? DEFAULT_IMAGE_SPEC;
};

/* ── Per-field validation ───────────────────────────────────────────────── */

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const URL_RE = /^(https?:\/\/\S+|\/\S+)$/i;

/** Validate one field; returns a human error message or null when fine. */
function validateField(
  field: string,
  rule: FieldRule,
  value: unknown,
): string | null {
  const empty =
    value == null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

  if (rule.required && empty) {
    return `${FIELD_LABELS[field] ?? field} is required`;
  }
  if (empty) return null;

  if (field === 'id' && typeof value === 'string' && !SLUG_RE.test(value.trim())) {
    return 'ID must be a lowercase slug — letters, numbers and dashes (e.g. brand-identity)';
  }
  if (URL_FIELDS.has(field) && typeof value === 'string' && !URL_RE.test(value.trim())) {
    return 'Enter a full URL (https://…) or a site path starting with / (e.g. /images/…)';
  }
  if (field === 'rating') {
    const rating = Number(value);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return 'Rating must be a number from 1 to 5';
    }
  }
  if (
    typeof value === 'string' &&
    rule.max &&
    value.length > rule.max &&
    !TEXTAREA_FIELDS.has(field)
  ) {
    return `${FIELD_LABELS[field] ?? field} exceeds ${rule.max} characters`;
  }
  if (Array.isArray(value) && field === 'features' && rule.max) {
    if (value.join('\n').length > rule.max) return `Features exceed ${rule.max} characters`;
  }
  return null;
}

interface Slide {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

const asString = (value: unknown): string =>
  typeof value === 'string' ? value : value == null ? '' : String(value);

/** Build a blank item straight from the schema so new items pass validation. */
function blankItem(schema: Record<string, FieldRule>): Record<string, unknown> {
  const item: Record<string, unknown> = {
    id: `item-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
  };
  for (const field of Object.keys(schema)) {
    if (field === 'id') continue;
    if (field === 'tags' || field === 'features' || field === 'slides') item[field] = [];
    else if (field === 'featured') item[field] = false;
    else if (field === 'rating') item[field] = '5';
    else item[field] = '';
  }
  return item;
}

const itemTitle = (item: Record<string, unknown>, index: number): string =>
  asString(item.title) ||
  asString(item.name) ||
  asString(item.question) ||
  asString(item.lead) ||
  asString(item.value) ||
  `Item ${index + 1}`;

/* ── Inline image picker with upload + dimension guidance ───────────────── */

function ImageField({
  value,
  onChange,
  label,
  required,
  error,
  spec,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
  error?: string;
  spec: ImageSpec;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  // Probe the image to report real dimensions vs the recommendation.
  useEffect(() => {
    setDims(null);
    setLoadFailed(false);
    if (!value || !URL_RE.test(value.trim())) return;
    const img = new Image();
    img.onload = () => setDims({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => setLoadFailed(true);
    img.src = value;
  }, [value]);

  const ratioWarning = useMemo(() => {
    if (!dims) return null;
    if (dims.w < spec.minWidth) {
      return `Only ${dims.w}px wide — recommended at least ${spec.minWidth}px or it will look soft.`;
    }
    const actual = dims.w / dims.h;
    if (Math.abs(actual - spec.ratio) / spec.ratio > 0.3) {
      return `Aspect ratio ${dims.w}×${dims.h} differs a lot from the recommended ${spec.rec}. It may be cropped or leave gaps.`;
    }
    return null;
  }, [dims, spec]);

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setUploadError(data.error || 'Upload failed');
        return;
      }
      onChange(data.url);
    } catch {
      setUploadError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="mb-1.5 flex items-baseline justify-between gap-2 font-neue text-[13px] font-medium text-neutral-700">
        <span>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
        <span className="text-[11px] font-normal text-neutral-400">{spec.rec}</span>
      </span>
      <div className="flex items-start gap-3">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-black/[0.03]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-neutral-300">
              <ImagePlus className="h-5 w-5" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or https://..."
            className={`w-full rounded-lg border bg-black/[0.04] px-3 py-2.5 font-neue text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none ${
              error ? 'border-red-400' : 'border-black/10 focus:border-neutral-900/40'
            }`}
          />
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 font-neue text-xs font-medium text-neutral-700 transition-colors hover:bg-black/[0.04]">
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {uploading ? 'Uploading…' : 'Upload image'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleFile(file);
                  e.target.value = '';
                }}
              />
            </label>
            {dims && (
              <span
                className={`rounded-full px-2 py-1 font-neue text-[11px] font-medium ${
                  ratioWarning ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {dims.w} × {dims.h}px
              </span>
            )}
          </div>
          {uploadError && <p className="mt-1 font-neue text-xs text-red-600">{uploadError}</p>}
          {loadFailed && (
            <p className="mt-1 font-neue text-xs text-amber-600">
              Image could not be loaded — check the URL.
            </p>
          )}
          {ratioWarning && !error && (
            <p className="mt-1 font-neue text-xs leading-snug text-amber-600">{ratioWarning}</p>
          )}
          {error && <p className="mt-1 font-neue text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Slide editor (services section) ───────────────────────────────────── */

function SlidesEditor({
  slides,
  onChange,
  spec,
}: {
  slides: Slide[];
  onChange: (next: Slide[]) => void;
  spec: ImageSpec;
}) {
  const update = (index: number, patch: Partial<Slide>) => {
    onChange(slides.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)));
  };

  return (
    <div className="flex flex-col gap-3">
      {slides.map((slide, index) => (
        <div key={index} className="rounded-xl border border-black/10 bg-black/[0.02] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-clash text-sm font-bold text-neutral-600">
              Slide {index + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(slides.filter((_, i) => i !== index))}
              className="cursor-pointer rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove slide ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={slide.label}
              onChange={(e) => update(index, { label: e.target.value })}
              placeholder="Short label"
              className="rounded-lg border border-black/10 bg-white px-3 py-2.5 font-neue text-sm focus:border-neutral-900/40 focus:outline-none"
            />
            <input
              value={slide.title}
              onChange={(e) => update(index, { title: e.target.value })}
              placeholder="Slide title"
              className="rounded-lg border border-black/10 bg-white px-3 py-2.5 font-neue text-sm focus:border-neutral-900/40 focus:outline-none"
            />
            <textarea
              value={slide.description}
              onChange={(e) => update(index, { description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="rounded-lg border border-black/10 bg-white px-3 py-2.5 font-neue text-sm focus:border-neutral-900/40 focus:outline-none sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <ImageField
                label="Slide image"
                value={slide.image}
                onChange={(url) => update(index, { image: url })}
                spec={spec}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...slides,
            { id: `slide-${Date.now().toString(36)}`, label: '', title: '', description: '', image: '' },
          ])
        }
        className="self-start cursor-pointer rounded-full border border-dashed border-black/20 px-4 py-2 font-neue text-sm text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
      >
        + Add slide
      </button>
    </div>
  );
}

/* ── Main editor page ───────────────────────────────────────────────────── */

export default function SectionEditorPage() {
  const params = useParams<{ key: string }>();
  const sectionKey = params.key;

  const [meta, setMeta] = useState<SectionMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err' | 'warn'; text: string } | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState('');
  const [itemErrors, setItemErrors] = useState<ItemErrors>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const listEndRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch(`/api/admin/sections/${sectionKey}`);
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error || 'Failed to load section');
        return;
      }
      const data = (await res.json()) as SectionMeta;
      setMeta(data);
      setSavedSnapshot(JSON.stringify(data.items));
      setItemErrors({});
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }, [sectionKey]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const items = useMemo(() => meta?.items ?? [], [meta]);
  const dirty = savedSnapshot !== '' && JSON.stringify(items) !== savedSnapshot;

  const setItems = (next: Record<string, unknown>[]) => {
    setMeta((prev) => (prev ? { ...prev, items: next } : prev));
  };

  const setField = (itemIndex: number, field: string, value: unknown) => {
    setItems(items.map((item, i) => (i === itemIndex ? { ...item, [field]: value } : item)));
    setItemErrors((prev) => {
      if (!prev[itemIndex]?.[field]) return prev;
      const next = { ...prev };
      const fields = { ...next[itemIndex] };
      delete fields[field];
      if (Object.keys(fields).length === 0) delete next[itemIndex];
      else next[itemIndex] = fields;
      return next;
    });
  };

  /** Validate one field right now and store/clear its error (for onBlur). */
  const blurValidate = (itemIndex: number, field: string, rule: FieldRule, value: unknown) => {
    const message = validateField(field, rule, value);
    setItemErrors((prev) => {
      const forItem = { ...(prev[itemIndex] ?? {}) };
      if (message) forItem[field] = message;
      else delete forItem[field];
      const next = { ...prev };
      if (Object.keys(forItem).length > 0) next[itemIndex] = forItem;
      else delete next[itemIndex];
      return next;
    });
  };

  /* Item operations — all local until Save. */
  const addItem = () => {
    if (!meta) return;
    const fresh = blankItem(meta.schema);
    setItems([...items, fresh]);
    setCollapsed((prev) => ({ ...prev, [String(fresh.id)]: false }));
    setNotice(null);
    requestAnimationFrame(() => listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }));
  };

  const duplicateItem = (index: number) => {
    const source = items[index];
    const clone: Record<string, unknown> = JSON.parse(JSON.stringify(source));
    clone.id = `${asString(source.id) || 'item'}-copy-${Date.now().toString(36)}`;
    const next = [...items];
    next.splice(index + 1, 0, clone);
    setItems(next);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    setNotice({ kind: 'warn', text: 'Item removed — click “Save & Publish” to make it permanent.' });
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  /* Client-side validation of every item against schema + field rules. */
  const validateAll = (): ItemErrors => {
    if (!meta) return {};
    const errors: ItemErrors = {};
    items.forEach((item, index) => {
      const itemError: Record<string, string> = {};
      for (const [field, rule] of Object.entries(meta.schema)) {
        if (field === 'slides') continue;
        const message = validateField(field, rule, item[field]);
        if (message) itemError[field] = message;
      }
      if (Object.keys(itemError).length > 0) errors[index] = itemError;
    });
    return errors;
  };

  const handleSave = async () => {
    setNotice(null);
    const localErrors = validateAll();
    if (Object.keys(localErrors).length > 0) {
      setItemErrors(localErrors);
      const first = Object.keys(localErrors)[0];
      setNotice({
        kind: 'err',
        text: `Fix ${Object.keys(localErrors).length} item${Object.keys(localErrors).length > 1 ? 's' : ''} before publishing — problems are highlighted in red (first: item ${Number(first) + 1}).`,
      });
      return;
    }

    setSaving(true);
    try {
      const res = await adminFetch(`/api/admin/sections/${sectionKey}`, {
        method: 'PUT',
        body: JSON.stringify({ items }),
      });
      const data = (await res.json()) as {
        error?: string;
        details?: { field: string; message: string }[];
      };
      if (!res.ok) {
        // Map server validation errors back onto their fields.
        const mapped: ItemErrors = {};
        for (const detail of data.details ?? []) {
          const match = detail.field.match(/^items\.(\d+)\.([^.]+)/);
          if (match) {
            const index = Number(match[1]);
            const field = match[2];
            (mapped[index] ??= {})[field] ??= detail.message;
          }
        }
        setItemErrors(mapped);
        setNotice({
          kind: 'err',
          text: data.details?.map((d) => d.message).join(' · ') || data.error || 'Save failed',
        });
        return;
      }
      setNotice({ kind: 'ok', text: 'Saved — live on the site.' });
      setItemErrors({});
      await load();
    } catch {
      setNotice({ kind: 'err', text: 'Network error' });
    } finally {
      setSaving(false);
    }
  };

  /* Render one flat field (everything except slides). */
  const renderField = (itemIndex: number, field: string, rule: FieldRule, value: unknown) => {
    const label = FIELD_LABELS[field] ?? field;
    const fieldError = itemErrors[itemIndex]?.[field];
    const errorId = `item-${itemIndex}-${field}-error`;
    const inputClass = `w-full rounded-lg border bg-black/[0.04] px-3 py-2.5 font-neue text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none ${
      fieldError ? 'border-red-400' : 'border-black/10 focus:border-neutral-900/40'
    }`;

    if (field === 'image') {
      return (
        <ImageField
          key={field}
          label={label}
          required={rule.required}
          value={asString(value)}
          onChange={(url) => setField(itemIndex, field, url)}
          error={fieldError}
          spec={imageSpecFor(sectionKey, field)}
        />
      );
    }

    if (field === 'featured') {
      return (
        <label
          key={field}
          className="flex cursor-pointer items-center gap-2.5 self-end pb-2.5 font-neue text-sm text-neutral-700"
        >
          <input
            type="checkbox"
            checked={value === true || value === 'true'}
            onChange={(e) => setField(itemIndex, field, e.target.checked)}
            className="h-4.5 w-4.5 rounded border-black/20 accent-neutral-950"
          />
          {label}
        </label>
      );
    }

    const showMax = typeof value === 'string' && rule.max && value.length > rule.max * 0.8;

    return (
      <div key={field}>
        <label
          htmlFor={`item-${itemIndex}-${field}`}
          className="mb-1.5 flex items-baseline justify-between gap-2 font-neue text-[13px] font-medium text-neutral-700"
        >
          <span>
            {label}
            {rule.required && <span className="text-red-500"> *</span>}
          </span>
          {showMax && (
            <span
              className={`text-[11px] font-normal ${
                (value as string).length > rule.max! ? 'text-red-500' : 'text-neutral-400'
              }`}
            >
              {(value as string).length}/{rule.max}
            </span>
          )}
        </label>
        {TEXTAREA_FIELDS.has(field) || field === 'tags' ? (
          <textarea
            id={`item-${itemIndex}-${field}`}
            rows={field === 'features' ? 5 : 2}
            value={Array.isArray(value) ? (value as string[]).join('\n') : asString(value)}
            onChange={(e) => setField(itemIndex, field, e.target.value)}
            onBlur={() => blurValidate(itemIndex, field, rule, value)}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? errorId : undefined}
            className={inputClass}
          />
        ) : (
          <input
            id={`item-${itemIndex}-${field}`}
            type={field === 'rating' ? 'number' : 'text'}
            min={field === 'rating' ? 1 : undefined}
            max={field === 'rating' ? 5 : undefined}
            value={asString(value)}
            onChange={(e) => setField(itemIndex, field, e.target.value)}
            onBlur={() => blurValidate(itemIndex, field, rule, value)}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? errorId : undefined}
            className={inputClass}
          />
        )}
        {fieldError && (
          <p id={errorId} role="alert" className="mt-1 font-neue text-xs text-red-600">
            {fieldError}
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return <SectionEditorSkeleton />;
  }

  if (error || !meta) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="font-neue text-sm text-red-600">{error || 'Section not found'}</p>
        <Link href="/admin" className="mt-4 inline-block font-neue text-sm text-neutral-500 underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-full">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-neue text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Content Sections
          </p>
          <h1 className="mt-1 font-clash text-3xl font-bold tracking-tight text-neutral-950">
            {meta.label}
          </h1>
          <p className="mt-0.5 font-neue text-sm text-neutral-500">{meta.description}</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 font-clash text-sm font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="h-4 w-4" aria-hidden="true" />
          )}
          {saving ? 'Saving…' : 'Save & Publish'}
        </button>
      </div>

      {notice && (
        <p
          role={notice.kind === 'err' ? 'alert' : 'status'}
          className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-3 font-neue text-sm ${
            notice.kind === 'ok'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : notice.kind === 'warn'
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {notice.kind === 'err' && <AlertCircle className="h-4 w-4 shrink-0" />}
          {notice.text}
        </p>
      )}

      {/* Items */}
      <div className="flex flex-col gap-5">
        {items.map((item, itemIndex) => {
          const key = asString(item.id) || String(itemIndex);
          const isCollapsed = collapsed[key] === true;
          const hasError = itemErrors[itemIndex] !== undefined;
          return (
            <div
              key={key}
              className={`rounded-2xl border bg-white p-6 shadow-sm ${
                hasError ? 'border-red-300' : 'border-black/10'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="shrink-0 font-clash text-sm font-bold text-neutral-300">
                    {String(itemIndex + 1).padStart(2, '0')}
                  </span>
                  <h2 className="min-w-0 truncate font-clash text-base font-bold text-neutral-950">
                    {itemTitle(item, itemIndex) || 'Untitled'}
                  </h2>
                  {hasError && (
                    <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 font-neue text-[11px] font-semibold text-red-600">
                      fix {Object.keys(itemErrors[itemIndex]).length} field
                      {Object.keys(itemErrors[itemIndex]).length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveItem(itemIndex, -1)}
                    disabled={itemIndex === 0}
                    aria-label="Move up"
                    title="Move up"
                    className="cursor-pointer rounded-full p-2 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900 disabled:cursor-default disabled:opacity-30"
                  >
                    <ChevronUp className="h-4.5 w-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(itemIndex, 1)}
                    disabled={itemIndex === items.length - 1}
                    aria-label="Move down"
                    title="Move down"
                    className="cursor-pointer rounded-full p-2 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900 disabled:cursor-default disabled:opacity-30"
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateItem(itemIndex)}
                    aria-label="Duplicate item"
                    title="Duplicate"
                    className="cursor-pointer rounded-full p-2 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900"
                  >
                    <Copy className="h-4.5 w-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollapsed((prev) => ({ ...prev, [key]: !isCollapsed }))}
                    aria-label={isCollapsed ? 'Expand item' : 'Collapse item'}
                    className="cursor-pointer rounded-full p-2 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900"
                  >
                    {isCollapsed ? <ChevronDown className="h-4.5 w-4.5" /> : <ChevronUp className="h-4.5 w-4.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(itemIndex)}
                    aria-label="Remove item"
                    title="Remove"
                    className="cursor-pointer rounded-full p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <div className="mt-5 border-t border-black/[0.06] pt-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {Object.entries(meta.schema)
                      .filter(([field]) => field !== 'slides')
                      .map(([field, rule]) => renderField(itemIndex, field, rule, item[field]))}
                  </div>

                  {/* Services slides */}
                  {'slides' in meta.schema && (
                    <div className="mt-5 border-t border-black/[0.06] pt-5">
                      <span className="mb-2.5 block font-neue text-sm font-semibold text-neutral-700">
                        Showcase slides (
                        {Array.isArray(item.slides) ? (item.slides as unknown[]).length : 0})
                      </span>
                      <SlidesEditor
                        slides={Array.isArray(item.slides) ? (item.slides as unknown as Slide[]) : []}
                        onChange={(next) => setField(itemIndex, 'slides', next)}
                        spec={imageSpecFor(sectionKey, 'slide')}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add item */}
      <button
        type="button"
        onClick={addItem}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-black/20 py-5 font-neue text-sm font-medium text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-900"
      >
        <Plus className="h-4.5 w-4.5" />
        Add item to {meta.label}
      </button>
      <div ref={listEndRef} />

      {/* Unsaved-changes bar */}
      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/95 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <p className="font-neue text-sm text-neutral-600">Unsaved changes — remember to publish.</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void load()}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-black/10 px-4 py-2.5 font-neue text-sm font-medium text-neutral-700 transition-colors hover:bg-black/[0.04]"
              >
                <RotateCcw className="h-4 w-4" />
                Discard
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 font-clash text-sm font-semibold text-white transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-4 w-4" aria-hidden="true" />
                )}
                {saving ? 'Saving…' : 'Save & Publish'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-16" />
    </div>
  );
}
