import type { Schema, SectionDef } from './sections';

/**
 * Validation for admin section writes.
 * Flat string fields validate against the section schema; nested lists
 * (service slides) are shape-checked structurally. Returns the normalized
 * item list or a list of human-readable errors.
 */

export interface ValidationError {
  field: string;
  message: string;
}

const SLIDE_REQUIRED = ['id', 'label', 'title', 'description', 'image'] as const;

function validateSlides(slides: unknown, prefix: string): ValidationError[] {
  if (!Array.isArray(slides)) return [];
  const errors: ValidationError[] = [];
  slides.forEach((slide, index) => {
    if (slide === null || typeof slide !== 'object') {
      errors.push({ field: `${prefix}.${index}`, message: 'Slide must be an object' });
      return;
    }
    const record = slide as Record<string, unknown>;
    for (const key of SLIDE_REQUIRED) {
      const value = record[key];
      if (typeof value !== 'string' || value.trim().length === 0) {
        errors.push({ field: `${prefix}.${index}.${key}`, message: `Slide ${index + 1}: ${key} is required` });
      } else if (value.length > 600) {
        errors.push({ field: `${prefix}.${index}.${key}`, message: `Slide ${index + 1}: ${key} too long` });
      }
    }
  });
  return errors;
}

export function validateItems(
  section: SectionDef,
  items: unknown,
): { ok: true; items: Record<string, unknown>[] } | { ok: false; errors: ValidationError[] } {
  if (!Array.isArray(items)) {
    return { ok: false, errors: [{ field: 'items', message: 'items must be an array' }] };
  }
  if (items.length > 60) {
    return { ok: false, errors: [{ field: 'items', message: 'too many items (max 60)' }] };
  }

  const errors: ValidationError[] = [];
  const schema: Schema = section.schema;

  const normalized = items.map((raw, index) => {
    if (raw === null || typeof raw !== 'object') {
      errors.push({ field: `items.${index}`, message: 'Item must be an object' });
      return {};
    }
    const item = raw as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const [field, rule] of Object.entries(schema)) {
      let value: unknown = item[field];

      // Convenience flattening for pricing (priceStandard/pricePremium -> price{})
      if (field === 'priceStandard') value = item.priceStandard ?? (item.price as Record<string, unknown> | undefined)?.Standard;
      if (field === 'pricePremium') value = item.pricePremium ?? (item.price as Record<string, unknown> | undefined)?.Premium;

      // Array-ish fields arrive as newline-joined strings from the admin form.
      if (field === 'tags' || field === 'features' || field === 'slides') {
        if (field === 'slides') {
          out.slides = Array.isArray(value) ? value : [];
          errors.push(...validateSlides(value, `items.${index}.slides`));
          continue;
        }
        const list =
          typeof value === 'string'
            ? value.split('\n').map((s) => s.trim()).filter(Boolean)
            : Array.isArray(value)
              ? value.map((v) => String(v).trim()).filter(Boolean)
              : [];
        if (rule.required && list.length === 0) {
          errors.push({ field: `items.${index}.${field}`, message: `${field} is required` });
        }
        if (list.join('\n').length > (rule.max ?? 2000)) {
          errors.push({ field: `items.${index}.${field}`, message: `${field} is too long` });
        }
        out[field] = list;
        continue;
      }

      if (typeof value === 'string') value = value.trim();
      if (value === undefined || value === null || value === '') {
        if (rule.required) {
          errors.push({ field: `items.${index}.${field}`, message: `${field} is required` });
        }
        continue; // optional fields simply omitted
      }
      if (typeof value === 'string' && rule.max && value.length > rule.max) {
        errors.push({ field: `items.${index}.${field}`, message: `${field} exceeds ${rule.max} characters` });
        continue;
      }
      if (field === 'featured') {
        out.featured = value === true || value === 'true';
        continue;
      }
      if (field === 'rating') {
        const rating = Number(value);
        out.rating = Number.isFinite(rating) ? Math.min(5, Math.max(1, Math.round(rating))) : 5;
        continue;
      }
      out[field] = value;
    }

    return out;
  });

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, items: normalized };
}
