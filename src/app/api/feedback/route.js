import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis - uses env vars automatically
// Will fall back to localStorage on client if no Redis configured
function getRedis() {
  const url = process.env.STORAGE_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.STORAGE_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const FEEDBACK_KEY = 'feg-feedback-notes';

// GET all feedback notes
export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ notes: [], fallback: true });
    }
    const notes = await redis.get(FEEDBACK_KEY);
    return NextResponse.json({ notes: notes || [] });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ notes: [], error: error.message }, { status: 500 });
  }
}

// POST a new feedback note
export async function POST(request) {
  try {
    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: 'Redis not configured' }, { status: 503 });
    }

    const note = await request.json();

    // Validate required fields
    if (!note.text || !note.reviewer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get existing notes
    const existing = (await redis.get(FEEDBACK_KEY)) || [];

    // Add the new note with a server-generated ID and timestamp
    const newNote = {
      ...note,
      id: Date.now() + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };

    const updated = [...existing, newNote];
    await redis.set(FEEDBACK_KEY, updated);

    return NextResponse.json({ note: newNote, total: updated.length });
  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a feedback note or all notes
export async function DELETE(request) {
  try {
    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: 'Redis not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    if (noteId === 'all') {
      await redis.set(FEEDBACK_KEY, []);
      return NextResponse.json({ cleared: true });
    }

    if (noteId) {
      const existing = (await redis.get(FEEDBACK_KEY)) || [];
      const updated = existing.filter(n => n.id !== noteId);
      await redis.set(FEEDBACK_KEY, updated);
      return NextResponse.json({ deleted: noteId, remaining: updated.length });
    }

    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
