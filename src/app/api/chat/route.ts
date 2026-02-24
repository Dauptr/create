import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    console.log('[Chat] Received messages:', messages?.length);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('[Chat] Invalid messages');
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    console.log('[Chat] Calling AI...');

    // Simple messages array without extra parameters
    const completion = await zai.chat.completions.create({
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'system' | 'user' | 'assistant',
        content: msg.content,
      })),
    });

    const aiResponse = completion.choices[0]?.message?.content;

    console.log('[Chat] AI response:', aiResponse?.substring(0, 50));

    if (!aiResponse) {
      console.log('[Chat] No response from AI');
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: {
        role: 'assistant',
        content: aiResponse,
      },
    });

  } catch (error: unknown) {
    console.error('[Chat] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
