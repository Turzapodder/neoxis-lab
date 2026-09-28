'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
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

/* ── Inline image picker with upload ────────────────────────────────────── */

function ImageField({
  value,
  onChange,
  label,
  required,
  error,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
  error?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
      <span className="mb-1.5 block font-neue text-xs text-neutral-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className="flex items-start gap-3">
        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-black/[0.03]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-neutral-300">
              <ImagePlus className="h-4 w-4" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or https://..."
            className={`w-full rounded-lg border bg-black/[0.04] px-3 py-2 font-neue text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none ${
              error ? 'border-red-400' : 'border-black/10 focus:border-neutral-900/40'
            }`}
          />
          <label className="mt-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1 font-neue text-[11px] font-medium text-neutral-700 transition-colors hover:bg-black/[0.04]">
            {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ImagePlus className="h-3 w-3" />}
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
          {(uploadError || error) && (
            <p className="mt-1 font-neue text-[11px] text-red-600">{uploadError || error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Slide editor (services section) ───────────────────────────────────── */

function SlidesEditor({
  slides,
  onChange,
}: {
  slides: Slide[];
  onChange: (next: Slide[]) => void;
}) {
  const update = (index: number, patch: Partial<Slide>) => {
    onChange(slides.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)));
  };

  return (
    <div className="flex flex-col gap-3">
      {slides.map((slide, index) => (
        <div key={index} className="rounded-xl border border-black/10 bg-black/[0.02] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-clash text-xs font-bold text-neutral-500">Slide {index + 1}</span>
            <button
              type="button"
              onClick={() => onChange(slides.filter((_, i) => i !== index))}
              className="cursor-pointer rounded-full p-1 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove slide ${index + 1}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <input
              value={slide.label}
              onChange={(e) => update(index, { label: e.target.value })}
              placeholder="Short label"
              className="rounded-lg border border-black/10 bg-white px-3 py-2 font-neue text-xs focus:border-neutral-900/40 focus:outline-none"
            />
            <input
              value={slide.title}
              onChange={(e) => update(index, { title: e.target.value })}
              placeholder="Slide title"
              className="rounded-lg border border-black/10 bg-white px-3 py-2 font-neue text-xs focus:border-neutral-900/40 focus:outline-none"
            />
            <textarea
              value={slide.description}
              onChange={(e) => update(index, { description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 font-neue text-xs focus:border-neutral-900/40 focus:outline-none sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <ImageField
                label="Slide image"
                value={slide.image}
                onChange={(url) => update(index, { image: url })}
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
        className="self-start cursor-pointer rounded-full border border-dashed border-black/20 px-4 py-1.5 font-neue text-xs text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
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
      const res = await fetch(`/api/admin/sections/${sectionKey}`);
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

  /* Client-side required-field validation, mirroring the API's rules. */
  const validateLocally = (): ItemErrors => {
    if (!meta) return {};
    const errors: ItemErrors = {};
    items.forEach((item, index) => {
      const itemError: Record<string, string> = {};
      for (const [field, rule] of Object.entries(meta.schema)) {
        if (!rule.required || field === 'slides') continue;
        const value = item[field];
        const empty =
          value == null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'string' && value.trim().length === 0);
        if (empty) itemError[field] = `${FIELD_LABELS[field] ?? field} is required`;
      }
      if (Object.keys(itemError).length > 0) errors[index] = itemError;
    });
    return errors;
  };

  const handleSave = async () => {
    setNotice(null);
    const localErrors = validateLocally();
    if (Object.keys(localErrors).length > 0) {
      setItemErrors(localErrors);
      const count = Object.keys(localErrors).length;
      setNotice({
        kind: 'err',
        text: `Fill the required fields on ${count} item${count > 1 ? 's' : ''} before publishing.`,
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/sections/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
        setNotice({ kind: 'err', text: data.details?.map((d) => d.message).join(' · ') || data.error || 'Save failed' });
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
    const inputClass = `w-full rounded-lg border bg-black/[0.04] px-3 py-2 font-neue text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none ${
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
        />
      );
    }

    if (field === 'featured') {
      return (
        <label
          key={field}
          className="flex cursor-pointer items-center gap-2 self-end pb-2 font-neue text-xs text-neutral-700"
        >
          <input
            type="checkbox"
            checked={value === true || value === 'true'}
            onChange={(e) => setField(itemIndex, field, e.target.checked)}
            className="h-4 w-4 rounded border-black/20 accent-neutral-950"
          />
          {label}
        </label>
      );
    }

    return (
      <div key={field}>
        <span className="mb-1.5 block font-neue text-xs text-neutral-600">
          {label}
          {rule.required && <span className="text-red-500"> *</span>}
        </span>
        {TEXTAREA_FIELDS.has(field) || field === 'tags' ? (
          <textarea
            rows={field === 'features' ? 5 : 2}
            value={Array.isArray(value) ? (value as string[]).join('\n') : asString(value)}
            onChange={(e) => setField(itemIndex, field, e.target.value)}
            className={inputClass}
          />
        ) : (
          <input
            type="text"
            value={asString(value)}
            onChange={(e) => setField(itemIndex, field, e.target.value)}
            className={inputClass}
          />
        )}
        {fieldError && <p className="mt-1 font-neue text-[11px] text-red-600">{fieldError}</p>}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-neutral-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !meta) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="font-neue text-sm text-red-600">{error || 'Section not found'}</p>
        <Link href="/admin" className="mt-4 inline-block font-neue text-xs text-neutral-500 underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-neue text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Content Sections
          </p>
          <h1 className="mt-1 font-clash text-2xl font-bold tracking-tight text-neutral-950">{meta.label}</h1>
          <p className="font-neue text-xs text-neutral-500">{meta.description}</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-neutral-950 px-6 py-2.5 font-clash text-sm font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving…' : 'Save & Publish'}
        </button>
      </div>

      {notice && (
        <p
          role={notice.kind === 'err' ? 'alert' : 'status'}
          className={`mb-4 flex items-center gap-2 rounded-xl border px-4 py-2.5 font-neue text-sm ${
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
      <div className="flex flex-col gap-4">
        {items.map((item, itemIndex) => {
          const key = asString(item.id) || String(itemIndex);
          const isCollapsed = collapsed[key] === true;
          const hasError = itemErrors[itemIndex] !== undefined;
          return (
            <div
              key={key}
              className={`rounded-2xl border bg-white p-5 shadow-sm ${
                hasError ? 'border-red-300' : 'border-black/10'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="shrink-0 font-clash text-xs font-bold text-neutral-300">
                    {String(itemIndex + 1).padStart(2, '0')}
                  </span>
                  <h2 className="min-w-0 truncate font-clash text-sm font-bold text-neutral-950">
                    {itemTitle(item, itemIndex) || 'Untitled'}
                  </h2>
                  {dirty && hasError && (
                    <span className="shrink-0 rounded-full bg-red-50 px-2 py-0.5 font-neue text-[10px] font-semibold text-red-600">
                      fix fields
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveItem(itemIndex, -1)}
                    disabled={itemIndex === 0}
                    aria-label="Move up"
                    className="cursor-pointer rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900 disabled:cursor-default disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(itemIndex, 1)}
                    disabled={itemIndex === items.length - 1}
                    aria-label="Move down"
                    className="cursor-pointer rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900 disabled:cursor-default disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateItem(itemIndex)}
                    aria-label="Duplicate item"
                    className="cursor-pointer rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollapsed((prev) => ({ ...prev, [key]: !isCollapsed }))}
                    aria-label={isCollapsed ? 'Expand item' : 'Collapse item'}
                    className="cursor-pointer rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-black/[0.06] hover:text-neutral-900"
                  >
                    {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(itemIndex)}
                    aria-label="Remove item"
                    className="cursor-pointer rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <div className="mt-4 border-t border-black/[0.06] pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Object.entries(meta.schema)
                      .filter(([field]) => field !== 'slides')
                      .map(([field, rule]) => renderField(itemIndex, field, rule, item[field]))}
                  </div>

                  {/* Services slides */}
                  {'slides' in meta.schema && (
                    <div className="mt-4 border-t border-black/[0.06] pt-4">
                      <span className="mb-2 block font-neue text-xs font-semibold text-neutral-600">
                        Showcase slides ({Array.isArray(item.slides) ? (item.slides as unknown[]).length : 0})
                      </span>
                      <SlidesEditor
                        slides={Array.isArray(item.slides) ? (item.slides as unknown as Slide[]) : []}
                        onChange={(next) => setField(itemIndex, 'slides', next)}
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
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-black/20 py-4 font-neue text-sm text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-900"
      >
        <Plus className="h-4 w-4" />
        Add item to {meta.label}
      </button>
      <div ref={listEndRef} />

      {/* Unsaved-changes bar */}
      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/95 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <p className="font-neue text-xs text-neutral-600">
              Unsaved changes — remember to publish.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void load()}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 font-neue text-xs font-medium text-neutral-700 transition-colors hover:bg-black/[0.04]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Discard
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-neutral-950 px-5 py-2 font-clash text-sm font-semibold text-white transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
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
