import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export const runtime = 'nodejs';

interface TikTokVideo {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  publishedAt: string;
  description: string;
  url: string;
  embedUrl: string;
}

function extractTikTokId(url: string): { id: string; author: string } | null {
  // Pattern: https://www.tiktok.com/@username/video/1234567890123456789
  const longPattern = /tiktok\.com\/@([\w.-]+)\/video\/(\d+)/;
  const match = url.match(longPattern);

  if (match) {
    return { author: match[1], id: match[2] };
  }

  // Short URL pattern: https://vm.tiktok.com/ZMxxxx/
  const shortPattern = /vm\.tiktok\.com\/([\w]+)/;
  const shortMatch = url.match(shortPattern);

  if (shortMatch) {
    return { author: 'unknown', id: shortMatch[1] };
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, page = 1, offset = 0 } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    console.log('[TikTok Search] Query:', query, 'Page:', page, 'Offset:', offset);

    const zai = await ZAI.create();

    // Search for newest TikTok videos with recency keywords
    const currentYear = new Date().getFullYear();
    const searchQuery = `${query} newest latest ${currentYear} site:tiktok.com`;

    const results = await zai.functions.invoke('web_search', {
      query: searchQuery,
      num: 30, // Get more results for better pagination
    });

    console.log('[TikTok Search] Found', results.length, 'results');

    // Parse and filter TikTok results
    const videos: TikTokVideo[] = [];

    for (const item of results) {
      const extracted = extractTikTokId(item.url);

      if (extracted && !videos.find(v => v.id === extracted.id)) {
        videos.push({
          id: extracted.id,
          title: item.name || 'TikTok Video',
          thumbnail: '/tiktok-placeholder.png',
          author: extracted.author,
          publishedAt: item.date || 'Recent',
          description: item.snippet || '',
          url: item.url,
          embedUrl: `https://www.tiktok.com/embed/v2/${extracted.id}`,
        });
      }
    }

    console.log('[TikTok Search] Parsed', videos.length, 'unique videos');

    // Pagination: 5 results per page
    const pageSize = 5;
    const startIndex = offset;
    const endIndex = startIndex + pageSize;
    const paginatedVideos = videos.slice(startIndex, endIndex);
    const hasMore = endIndex < videos.length;
    const totalPages = Math.ceil(videos.length / pageSize);

    return NextResponse.json({
      success: true,
      videos: paginatedVideos,
      allVideos: videos, // Send all videos for shorts mode
      pagination: {
        currentPage: page,
        totalPages,
        totalResults: videos.length,
        hasMore,
        pageSize,
        nextOffset: hasMore ? endIndex : null,
      },
    });

  } catch (error: unknown) {
    console.error('[TikTok Search] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
