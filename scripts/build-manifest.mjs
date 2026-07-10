#!/usr/bin/env node
// Regenerates posts/posts.json and projects/projects.json from frontmatter
// in posts/*.md and projects/*.md. Run after adding/editing a post or
// project: `node scripts/build-manifest.mjs`
//
// Frontmatter format (top of each .ko.md / .en.md file):
//   ---
//   key: value
//   ---
// Shared fields (date/tag/read for posts; tag/year/order for projects) are
// read from the .ko.md file. Language-specific fields (title/excerpt for
// posts; name/type/status/blurb for projects) are read from each language
// file separately.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^["']|["']$/g, '');
    fields[key] = value;
  }
  return fields;
}

function loadSlugs(dir) {
  const files = readdirSync(join(root, dir)).filter((f) => f.endsWith('.md'));
  const slugs = new Map(); // slug -> { ko: fields, en: fields }
  for (const file of files) {
    const m = file.match(/^(.+)\.(ko|en)\.md$/);
    if (!m) continue;
    const [, slug, lang] = m;
    const raw = readFileSync(join(root, dir, file), 'utf8');
    const fields = parseFrontmatter(raw);
    if (!fields.slug) fields.slug = slug;
    if (!slugs.has(slug)) slugs.set(slug, {});
    slugs.get(slug)[lang] = fields;
  }
  return slugs;
}

function requireField(fields, key, context) {
  if (!fields || fields[key] === undefined || fields[key] === '') {
    throw new Error(`Missing "${key}" in frontmatter for ${context}`);
  }
  return fields[key];
}

function buildPosts() {
  const slugs = loadSlugs('posts');
  const posts = [];
  for (const [slug, { ko, en }] of slugs) {
    if (!ko || !en) throw new Error(`posts/${slug}: needs both .ko.md and .en.md`);
    posts.push({
      slug,
      date: requireField(ko, 'date', `posts/${slug}.ko.md`),
      tag: requireField(ko, 'tag', `posts/${slug}.ko.md`),
      read: requireField(ko, 'read', `posts/${slug}.ko.md`),
      title: { ko: requireField(ko, 'title', `posts/${slug}.ko.md`), en: requireField(en, 'title', `posts/${slug}.en.md`) },
      excerpt: { ko: requireField(ko, 'excerpt', `posts/${slug}.ko.md`), en: requireField(en, 'excerpt', `posts/${slug}.en.md`) }
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

function buildProjects() {
  const slugs = loadSlugs('projects');
  const projects = [];
  for (const [slug, { ko, en }] of slugs) {
    if (!ko || !en) throw new Error(`projects/${slug}: needs both .ko.md and .en.md`);
    projects.push({
      slug,
      tag: requireField(ko, 'tag', `projects/${slug}.ko.md`),
      year: requireField(ko, 'year', `projects/${slug}.ko.md`),
      order: Number(ko.order || 0),
      name: requireField(ko, 'name', `projects/${slug}.ko.md`),
      type: { ko: requireField(ko, 'type', `projects/${slug}.ko.md`), en: requireField(en, 'type', `projects/${slug}.en.md`) },
      status: { ko: requireField(ko, 'status', `projects/${slug}.ko.md`), en: requireField(en, 'status', `projects/${slug}.en.md`) },
      blurb: { ko: requireField(ko, 'blurb', `projects/${slug}.ko.md`), en: requireField(en, 'blurb', `projects/${slug}.en.md`) }
    });
  }
  projects.sort((a, b) => a.order - b.order);
  projects.forEach((p) => delete p.order);
  return projects;
}

const posts = buildPosts();
const projects = buildProjects();

writeFileSync(join(root, 'posts/posts.json'), JSON.stringify({ posts }, null, 2) + '\n');
writeFileSync(join(root, 'projects/projects.json'), JSON.stringify({ projects }, null, 2) + '\n');

console.log(`posts/posts.json: ${posts.length} posts`);
console.log(`projects/projects.json: ${projects.length} projects`);
