import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contacts } from './contacts';
import { profile } from './profile';

describe('primary portfolio positioning', () => {
  it('leads with Full-Stack Product Engineer', () => {
    expect(profile.title).toBe('Full-Stack Product Engineer');
    expect(profile.direction.split(' · ')[0]).toBe(profile.title);
  });

  it('links to the published Full-Stack CV rather than the backend CV', () => {
    expect(contacts.resumeUrl).toBe(
      './resume/Ilya-Gurikov-CV-FullStack-Product-Engineer-EN.pdf',
    );
    const pdf = readFileSync(contacts.resumeUrl.replace(/^\.\//, 'public/'));
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
  });
});
