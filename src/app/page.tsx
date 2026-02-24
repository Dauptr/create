'use client'

import { useState, useEffect, useRef } from 'react'

// Types
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface GeneratedImage {
  id: string
  prompt: string
  imageUrl: string
  model: string
  style: string
  createdAt: string
}

type NavSection = 'create' | 'database' | 'chat' | 'youtube' | 'tiktok'

// Icons
const CreateIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 5v14m-7-7h14"/>
  </svg>
)

const DatabaseIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 7v10c0 2 4 4 8 4s8-2 8-4V7M4 7c0 2 4 4 8 4s8-2 8-4M4 7c0-2 4-4 8-4s8 2 8 4"/>
  </svg>
)

const ChatIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
)

export default function Home() {
  const [nav, setNav] = useState<NavSection>('create')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-full bg-[#050507] text-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`w-60 h-full bg-[rgba(10,10,15,0.95)] border-r border-[rgba(255,255,255,0.08)] 
          flex flex-col p-6 z-50 transition-transform duration-300 backdrop-blur-xl
          fixed left-0 top-0 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="font-['JetBrains_Mono',monospace] text-lg font-bold mb-8 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]"></span>
          NEXUS
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <NavItem 
            active={nav === 'create'} 
            onClick={() => { setNav('create'); setSidebarOpen(false) }}
            icon={<CreateIcon />}
          >
            Create Image
          </NavItem>
          <NavItem 
            active={nav === 'database'} 
            onClick={() => { setNav('database'); setSidebarOpen(false) }}
            icon={<DatabaseIcon />}
          >
            Database
          </NavItem>
          <NavItem 
            active={nav === 'chat'} 
            onClick={() => { setNav('chat'); setSidebarOpen(false) }}
            icon={<ChatIcon />}
          >
            AI Chat
          </NavItem>
          <NavItem 
            active={nav === 'youtube'} 
            onClick={() => { setNav('youtube'); setSidebarOpen(false) }}
            icon={<YouTubeIcon />}
          >
            YouTube
          </NavItem>
          <NavItem 
            active={nav === 'tiktok'} 
            onClick={() => { setNav('tiktok'); setSidebarOpen(false) }}
            icon={<TikTokIcon />}
          >
            TikTok
          </NavItem>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="text-xs text-[#94a3b8]">NEXUS OS v3.2</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-60 h-full flex flex-col bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_40%)]">
        {/* Topbar */}
        <header className="h-[60px] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-8 bg-[rgba(5,5,7,0.8)] backdrop-blur-sm z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              <MenuIcon />
            </button>
            <div className="font-semibold">{nav.toUpperCase().replace('-', ' ')}</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto flex justify-center">
          {nav === 'create' && <CreatePage />}
          {nav === 'database' && <DatabasePage />}
          {nav === 'chat' && <ChatPage />}
          {nav === 'youtube' && <YouTubePage />}
          {nav === 'tiktok' && <TikTokPage />}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// Navigation Item Component
function NavItem({ 
  children, 
  active, 
  onClick, 
  icon 
}: { 
  children: React.ReactNode
  active: boolean
  onClick: () => void
  icon: React.ReactNode
}) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium
        ${active 
          ? 'bg-[rgba(99,102,241,0.15)] text-indigo-400' 
          : 'text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f8fafc]'
        }`}
    >
      {icon}
      {children}
    </div>
  )
}

// Create Image Page
function CreatePage() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('dall-e-3')
  const [style, setStyle] = useState('photorealistic')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<string | null>(null)
  const [logs, setLogs] = useState<{ time: string; msg: string; type: 'info' | 'success' | 'error' | 'warn' }[]>([])
  const [showResult, setShowResult] = useState(false)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  const log = (msg: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }])
  }

  const clearLogs = () => setLogs([])

  const generateImage = async () => {
    if (!prompt.trim()) return

    setShowResult(false)
    setResult(null)
    clearLogs()
    setLoading(true)
    setProgress(0)

    // Progress animation
    progressInterval.current = setInterval(() => {
      setProgress(prev => Math.min(prev + 0.5, 95))
    }, 100)

    log(`Requesting image generation...`, 'info')

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      log(`Response: Base64 image received (${data.base64?.length || 0} chars)`, 'success')
      
      if (progressInterval.current) clearInterval(progressInterval.current)
      setProgress(100)
      
      setResult(data.image)
      setShowResult(true)
      log('Image successfully rendered.', 'success')

    } catch (error: unknown) {
      if (progressInterval.current) clearInterval(progressInterval.current)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log(`Error: ${errorMessage}`, 'error')
    } finally {
      setLoading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const saveToDatabase = async () => {
    if (!result) return
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageUrl: result, model, style }),
      })
      if (res.ok) {
        log('Saved to Database.', 'success')
        alert('Image saved!')
      }
    } catch {
      log('Save Error', 'error')
    }
  }

  const downloadImage = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = `nexus_${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="w-full max-w-[700px] bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
      <h2 className="text-center text-xl font-semibold mb-6">Create Image</h2>

      {/* Model & Style Selectors */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs text-[#94a3b8] mb-2">Model</label>
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f8fafc] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
          >
            <option value="dall-e-3">DALL-E 3</option>
            <option value="stable-diffusion">Stable Diffusion</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-[#94a3b8] mb-2">Style</label>
          <select 
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-3 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f8fafc] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
          >
            <option value="photorealistic">Photorealistic</option>
            <option value="anime">Anime</option>
            <option value="digital-art">Digital Art</option>
          </select>
        </div>
      </div>

      {/* Prompt Input */}
      <textarea 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your vision..."
        className="w-full h-28 p-4 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f8fafc] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all resize-none mb-4"
      />

      {/* Generate Button */}
      <button 
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
        className="w-full py-4 rounded-xl bg-indigo-500 text-white font-semibold shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:brightness-110 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? 'Generating...' : '✨ Generate Image'}
      </button>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="h-1 bg-[rgba(255,255,255,0.1)] rounded mt-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Result Area */}
      {showResult && result && (
        <div className="mt-6">
          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-black min-h-[200px] flex items-center justify-center">
            <img src={result} alt="Generated" className="w-full" />
          </div>
          <div className="flex gap-2 mt-4">
            <button 
              onClick={downloadImage}
              className="flex-1 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              Download
            </button>
            <button 
              onClick={saveToDatabase}
              className="flex-1 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              Save to DB
            </button>
          </div>
        </div>
      )}

      {/* Debug Console */}
      <div className="mt-6 bg-black border border-[#333] rounded-lg font-['JetBrains_Mono',monospace] text-xs text-[#ccc] max-h-[250px] overflow-hidden">
        <div className="px-3 py-2 border-b border-[#333] text-indigo-400 flex justify-between items-center">
          <span>Z.AI Engine Console</span>
          <button 
            onClick={clearLogs}
            className="px-2 py-1 text-[10px] rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]"
          >
            Clear
          </button>
        </div>
        <div className="p-3 overflow-y-auto max-h-[200px] whitespace-pre-wrap break-all leading-relaxed">
          {logs.length === 0 && <div className="text-[#94a3b8]">System Ready.</div>}
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={`${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : log.type === 'warn' ? 'text-amber-400' : ''}`}
            >
              [{log.time}] {log.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Database Page
function DatabasePage() {
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/images')
      const data = await res.json()
      if (data.success) {
        setImages(data.images)
      }
    } catch {
      console.error('Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (id: string) => {
    try {
      await fetch(`/api/images?id=${id}`, { method: 'DELETE' })
      setImages(prev => prev.filter(img => img.id !== id))
    } catch {
      console.error('Failed to delete')
    }
  }

  return (
    <div className="w-full max-w-[900px] bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
      <h2 className="text-center text-xl font-semibold mb-6">Image Database</h2>
      
      {loading ? (
        <div className="text-center text-[#94a3b8] py-8">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-center text-[#94a3b8] py-8">No saved images.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div 
              key={img.id}
              className="bg-black rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)] group"
            >
              <img 
                src={img.imageUrl} 
                alt={img.prompt}
                className="w-full aspect-square object-cover"
              />
              <div className="p-2">
                <div className="text-xs text-[#94a3b8] truncate">{img.prompt?.substring(0, 30)}...</div>
                <button 
                  onClick={() => deleteImage(img.id)}
                  className="mt-2 text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Chat Page
function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: ChatMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        }),
      })

      const data = await res.json()

      if (res.ok && data.message) {
        setMessages(prev => [...prev, data.message])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + (data.error || 'Unknown error') }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Failed to connect' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[800px] bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
      <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
      
      {/* Chat Log */}
      <div className="h-80 overflow-y-auto mb-4 p-4 bg-black rounded-lg">
        {messages.length === 0 ? (
          <div className="text-[#94a3b8]">AI Ready. Ask me anything!</div>
        ) : (
          messages.map((msg, i) => (
            <div 
              key={i}
              className={`mb-2 ${msg.role === 'user' ? 'text-indigo-400' : 'text-[#f8fafc]'}`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask..."
          className="flex-1 p-4 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f8fafc] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
        />
        <button 
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-4 rounded-xl bg-indigo-500 text-white font-semibold shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:brightness-110 transition-all disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}

// YouTube Video interface
interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  channel: string
  publishedAt: string
  description: string
  url: string
}

// YouTube Page
function YouTubePage() {
  const [query, setQuery] = useState('')
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const searchVideos = async (page: number = 1) => {
    if (!query.trim()) return

    setLoading(true)
    setPlayingVideo(null)

    try {
      const res = await fetch('/api/youtube-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, page }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setVideos(data.videos)
        setCurrentPage(data.pagination.currentPage)
        setTotalPages(data.pagination.totalPages)
        setTotalResults(data.pagination.totalResults)
        setHasMore(data.pagination.hasMore)
        setSearchPerformed(true)
      } else {
        console.error('Search error:', data.error)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    searchVideos(1)
  }

  const nextPage = () => {
    if (hasMore) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      searchVideos(newPage)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      searchVideos(newPage)
    }
  }

  const playVideo = (videoId: string) => {
    setPlayingVideo(videoId)
  }

  return (
    <div className="w-full max-w-[1000px]">
      {/* Search Card */}
      <div className="bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)] mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <YouTubeIcon />
          YouTube Search
        </h2>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for videos..."
            className="flex-1 p-4 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f8fafc] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-8 py-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setPlayingVideo(null)}
                className="p-2 rounded-lg bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                className="absolute inset-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {searchPerformed && (
        <div className="bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">
              Results {totalResults > 0 && `(${totalResults} found)`}
            </h3>
            {totalPages > 1 && (
              <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#94a3b8]">
              <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              Searching...
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 text-[#94a3b8]">
              No videos found. Try a different search.
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => playVideo(video.id)}
                    className="flex gap-4 p-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] cursor-pointer transition-all group"
                  >
                    <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#f8fafc] line-clamp-2 mb-1 group-hover:text-indigo-400 transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-[#94a3b8] mb-2">
                        {video.channel} • {video.publishedAt}
                      </p>
                      <p className="text-sm text-[#64748b] line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1 || loading}
                    className="px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <div className="text-sm text-[#94a3b8]">
                    {currentPage} / {totalPages}
                  </div>
                  <button
                    onClick={nextPage}
                    disabled={!hasMore || loading}
                    className="px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// TikTok Video interface
interface TikTokVideo {
  id: string
  title: string
  thumbnail: string
  author: string
  publishedAt: string
  description: string
  url: string
  embedUrl: string
}

// TikTok Page
function TikTokPage() {
  const [query, setQuery] = useState('')
  const [allVideos, setAllVideos] = useState<TikTokVideo[]>([]) // All videos from search
  const [displayedVideos, setDisplayedVideos] = useState<TikTokVideo[]>([]) // Currently shown 5 videos
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [shortsMode, setShortsMode] = useState(false)
  const [currentShortIndex, setCurrentShortIndex] = useState(0)
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set())
  const [logs, setLogs] = useState<{ time: string; msg: string; type: 'info' | 'success' | 'error' }[]>([])
  const [playingVideo, setPlayingVideo] = useState<TikTokVideo | null>(null)
  const [swipeStartY, setSwipeStartY] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | null>(null)
  const [isRandomMode, setIsRandomMode] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set())

  const log = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [...prev.slice(-20), { time: new Date().toLocaleTimeString(), msg, type }])
  }

  const searchVideos = async () => {
    if (!query.trim()) return

    setLoading(true)
    setShortsMode(false)
    log(`Searching for newest: "${query}"...`, 'info')

    try {
      const res = await fetch('/api/tiktok-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        const fetchedVideos = data.allVideos || data.videos || []
        setAllVideos(fetchedVideos)
        setDisplayedVideos(fetchedVideos.slice(0, 5)) // Show first 5
        setCurrentPage(1)
        setTotalResults(fetchedVideos.length)
        setSearchPerformed(true)
        setCurrentShortIndex(0)
        log(`Found ${fetchedVideos.length} newest videos`, 'success')
      } else {
        log(`Error: ${data.error}`, 'error')
      }
    } catch (error) {
      log('Search failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchVideos()
  }

  // Load next 5 videos
  const loadNext5 = () => {
    const nextPageNum = currentPage + 1
    const startIndex = currentPage * 5
    const endIndex = startIndex + 5
    const nextVideos = allVideos.slice(startIndex, endIndex)
    
    if (nextVideos.length > 0) {
      setDisplayedVideos(nextVideos)
      setCurrentPage(nextPageNum)
      log(`Loaded videos ${startIndex + 1}-${Math.min(endIndex, allVideos.length)} of ${allVideos.length}`, 'success')
    }
  }

  // Load previous 5 videos
  const loadPrev5 = () => {
    if (currentPage > 1) {
      const prevPageNum = currentPage - 1
      const startIndex = (prevPageNum - 1) * 5
      const endIndex = startIndex + 5
      const prevVideos = allVideos.slice(startIndex, endIndex)
      
      setDisplayedVideos(prevVideos)
      setCurrentPage(prevPageNum)
      log(`Loaded videos ${startIndex + 1}-${endIndex} of ${allVideos.length}`, 'info')
    }
  }

  const hasMore = currentPage * 5 < allVideos.length
  const hasPrev = currentPage > 1

  const playVideo = (video: TikTokVideo) => {
    setPlayingVideo(video)
    log(`Playing video: ${video.id}`, 'success')
  }

  const closeVideo = () => {
    setPlayingVideo(null)
    log('Video player closed', 'info')
  }

  const toggleLike = (videoId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(videoId)) {
        newSet.delete(videoId)
        log(`Unliked video: ${videoId}`, 'info')
      } else {
        newSet.add(videoId)
        log(`Liked video: ${videoId}`, 'success')
      }
      return newSet
    })
  }

  const nextShort = () => {
    if (isRandomMode) {
      // Random mode: pick a random video
      const randomIndex = Math.floor(Math.random() * allVideos.length)
      setCurrentShortIndex(randomIndex)
      setSwipeDirection('up')
      setTimeout(() => setSwipeDirection(null), 300)
      log(`Random video: ${randomIndex + 1}/${allVideos.length}`, 'info')
    } else if (currentShortIndex < allVideos.length - 1) {
      setCurrentShortIndex(prev => prev + 1)
      setSwipeDirection('up')
      setTimeout(() => setSwipeDirection(null), 300)
      log(`Navigating to video ${currentShortIndex + 2}/${allVideos.length}`, 'info')
    }
    // Mark as watched
    if (allVideos[currentShortIndex]) {
      setWatchedVideos(prev => new Set([...prev, allVideos[currentShortIndex].id]))
    }
  }

  const prevShort = () => {
    if (!isRandomMode && currentShortIndex > 0) {
      setCurrentShortIndex(prev => prev - 1)
      setSwipeDirection('down')
      setTimeout(() => setSwipeDirection(null), 300)
      log(`Navigating to video ${currentShortIndex}/${allVideos.length}`, 'info')
    }
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartY(e.touches[0].clientY)
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return
    const currentY = e.touches[0].clientY
    const diff = swipeStartY - currentY
    
    if (diff > 50) {
      setSwipeDirection('up')
    } else if (diff < -50) {
      setSwipeDirection('down')
    }
  }

  const handleTouchEnd = () => {
    if (swipeDirection === 'up') {
      nextShort()
    } else if (swipeDirection === 'down' && !isRandomMode) {
      prevShort()
    }
    setIsSwiping(false)
    setSwipeDirection(null)
  }

  // Mouse wheel handler for desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 30) {
      nextShort()
    } else if (e.deltaY < -30 && !isRandomMode) {
      prevShort()
    }
  }

  const openOnTikTok = (url: string) => {
    window.open(url, '_blank')
    log(`Opening on TikTok: ${url}`, 'info')
  }

  const playCurrentShort = () => {
    if (allVideos[currentShortIndex]) {
      setPlayingVideo(allVideos[currentShortIndex])
      log(`Playing video in player`, 'success')
    }
  }

  const startPage = (currentPage - 1) * 5 + 1
  const endPage = Math.min(currentPage * 5, allVideos.length)

  return (
    <div className="w-full max-w-[1200px]">
      {/* Search Card */}
      <div className="bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <TikTokIcon />
            TikTok Search
          </h2>
          {searchPerformed && allVideos.length > 0 && (
            <button
              onClick={() => setShortsMode(!shortsMode)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                shortsMode 
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' 
                  : 'bg-[rgba(255,255,255,0.05)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.1)]'
              }`}
            >
              {shortsMode ? '📱 Shorts Mode' : '📋 List Mode'}
            </button>
          )}
        </div>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for newest TikTok videos..."
            className="flex-1 p-4 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[#f8fafc] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-8 py-4 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
          >
            {loading ? 'Searching...' : 'Search Newest'}
          </button>
        </form>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          {/* Video Title Overlay */}
          <div className="absolute top-4 left-4 z-20 text-white pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              <TikTokIcon />
              <span className="font-medium">Now Playing</span>
            </div>
            <p className="text-sm text-white/70 line-clamp-1 max-w-[300px]">{playingVideo.title}</p>
          </div>
          
          {/* TikTok Embed Player - Full Screen */}
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="relative w-full max-w-[400px] h-full">
              {/* TikTok Embed iframe */}
              <iframe
                src={playingVideo.embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
                style={{ border: 'none' }}
              />
              {/* Click blocker overlay - prevents redirects to TikTok */}
              <div 
                className="absolute inset-0 z-10"
                style={{ pointerEvents: 'all', background: 'transparent' }}
              />
            </div>
          </div>
          
          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20">
            <div className="flex items-center justify-between max-w-[400px] mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center font-bold text-white">
                  @{playingVideo.author?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">@{playingVideo.author}</div>
                  <div className="text-white/50 text-xs">{playingVideo.publishedAt}</div>
                </div>
              </div>
              <button
                onClick={() => toggleLike(playingVideo.id)}
                className={`p-3 rounded-full transition-all ${
                  likedVideos.has(playingVideo.id) 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <svg width="24" height="24" fill={likedVideos.has(playingVideo.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shorts Mode Player */}
      {shortsMode && allVideos.length > 0 && (
        <div className="flex gap-6">
          {/* Main Shorts Player */}
          <div className="flex-1 flex justify-center">
            <div 
              className="relative w-[340px] h-[600px] bg-black rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              {/* Swipe Transition Animation */}
              <div className={`absolute inset-0 z-30 pointer-events-none transition-all duration-300 ${
                swipeDirection === 'up' ? 'animate-pulse bg-gradient-to-t from-white/20 to-transparent' :
                swipeDirection === 'down' ? 'animate-pulse bg-gradient-to-b from-white/20 to-transparent' : ''
              }`} />

              {/* Video Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
              
              {/* Dynamic Gradient Background */}
              <div 
                className="absolute inset-0 opacity-30 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(${(currentShortIndex * 40) % 360}, 70%, 50%), 
                    hsl(${(currentShortIndex * 40 + 60) % 360}, 70%, 40%), 
                    hsl(${(currentShortIndex * 40 + 120) % 360}, 70%, 30%))`
                }}
              />

              {/* Active Video Indicator - Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300"
                  style={{ width: `${((currentShortIndex + 1) / allVideos.length) * 100}%` }}
                />
              </div>

              {/* TikTok Logo Watermark */}
              <div className="absolute top-4 left-4 opacity-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>

              {/* Random Mode Badge */}
              {isRandomMode && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium animate-pulse">
                  🎲 Random Mode
                </div>
              )}

              {/* Watched Badge */}
              {watchedVideos.has(allVideos[currentShortIndex]?.id) && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px]">
                  ✓ Watched
                </div>
              )}

              {/* Navigation Arrows */}
              {!isRandomMode && (
                <button 
                  onClick={prevShort}
                  disabled={currentShortIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
              )}
              <button 
                onClick={nextShort}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-all"
              >
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              {/* Swipe Indicator */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-32 flex flex-col items-center gap-1 opacity-50">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24" className="animate-bounce">
                  <path d="M12 4v16m0 0l-6-6m6 6l6-6"/>
                </svg>
                <span className="text-white text-[10px]">Swipe</span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-16 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center font-bold text-sm">
                    @{allVideos[currentShortIndex]?.author?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">@{allVideos[currentShortIndex]?.author}</div>
                    <div className="text-xs text-white/70">{allVideos[currentShortIndex]?.publishedAt}</div>
                  </div>
                  <button className="ml-2 px-3 py-1 rounded-full border border-white/50 text-xs font-medium hover:bg-white/20 transition-all">
                    Follow
                  </button>
                </div>
                <p className="text-sm line-clamp-2">{allVideos[currentShortIndex]?.title}</p>
              </div>

              {/* Right Side Actions */}
              <div className="absolute right-3 bottom-20 flex flex-col gap-4">
                <button 
                  onClick={() => toggleLike(allVideos[currentShortIndex]?.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-12 h-12 rounded-full bg-black/50 flex items-center justify-center transition-all ${
                    likedVideos.has(allVideos[currentShortIndex]?.id) ? 'text-red-500 scale-110' : 'text-white hover:scale-110'
                  }`}>
                    <svg width="26" height="26" fill={likedVideos.has(allVideos[currentShortIndex]?.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs">{likedVideos.has(allVideos[currentShortIndex]?.id) ? 'Liked' : 'Like'}</span>
                </button>

                <button 
                  onClick={playCurrentShort}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white hover:scale-110 transition-all shadow-lg shadow-pink-500/50">
                    <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs">Play</span>
                </button>
              </div>

              {/* Video Counter */}
              <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-xs text-white">
                {currentShortIndex + 1} / {allVideos.length}
              </div>
            </div>
          </div>

          {/* Console Preview Panel */}
          <div className="w-[400px] space-y-4">
            {/* Video Info Console */}
            <div className="bg-[rgba(20,20,25,0.8)] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.08)] bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                <div className="flex items-center gap-2 text-pink-400 font-medium text-sm">
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                  VIDEO INFO CONSOLE
                </div>
              </div>
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Video ID:</span>
                  <span className="text-pink-400">{allVideos[currentShortIndex]?.id?.slice(0, 20)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Author:</span>
                  <span className="text-white">@{allVideos[currentShortIndex]?.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Published:</span>
                  <span className="text-white">{allVideos[currentShortIndex]?.publishedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94a3b8]">Status:</span>
                  <span className="text-emerald-400">● Newest</span>
                </div>
                <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="text-[#94a3b8]">Title:</span>
                  <p className="text-white mt-1 line-clamp-2">{allVideos[currentShortIndex]?.title}</p>
                </div>
                <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="text-[#94a3b8]">Description:</span>
                  <p className="text-white mt-1 line-clamp-3">{allVideos[currentShortIndex]?.description}</p>
                </div>
                <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#94a3b8]">Watched:</span>
                    <span className="text-emerald-400">{watchedVideos.size} videos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Liked:</span>
                    <span className="text-red-400">{likedVideos.size} videos</span>
                  </div>
                </div>
                <button 
                  onClick={playCurrentShort}
                  className="w-full mt-3 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-sm hover:opacity-90 transition-all"
                >
                  ▶ Play Video
                </button>
              </div>
            </div>

            {/* Activity Log Console */}
            <div className="bg-[rgba(20,20,25,0.8)] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.08)] bg-black/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                    ACTIVITY LOG
                  </div>
                  <button 
                    onClick={() => setLogs([])}
                    className="text-[10px] px-2 py-1 rounded bg-[rgba(255,255,255,0.05)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.1)]"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="p-3 h-[200px] overflow-y-auto font-mono text-xs space-y-1">
                {logs.length === 0 ? (
                  <div className="text-[#94a3b8]">No activity yet...</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={`${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-[#94a3b8]'}`}>
                      <span className="text-white/50">[{log.time}]</span> {log.msg}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              {/* Random Mode Toggle */}
              <button 
                onClick={() => {
                  setIsRandomMode(!isRandomMode)
                  log(isRandomMode ? 'Sequential mode enabled' : 'Random mode enabled', 'info')
                }}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                  isRandomMode 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                {isRandomMode ? '🎲 Random Mode ON' : '🎲 Enable Random Mode'}
              </button>
              
              {/* Navigation */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={prevShort}
                  disabled={currentShortIndex === 0 || isRandomMode}
                  className="py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button 
                  onClick={nextShort}
                  className="py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:opacity-90 transition-all"
                >
                  {isRandomMode ? '🎲 Random' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Mode (Default) */}
      {!shortsMode && searchPerformed && (
        <div className="bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">
              Newest Videos {totalResults > 0 && <span className="text-[#94a3b8]">({totalResults} found)</span>}
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
              Showing {startPage}-{endPage} of {totalResults}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#94a3b8]">
              <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              Searching for newest videos...
            </div>
          ) : displayedVideos.length === 0 ? (
            <div className="text-center py-12 text-[#94a3b8]">
              No videos found. Try a different search.
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {displayedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    onClick={() => playVideo(video)}
                    className="flex gap-4 p-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] cursor-pointer transition-all group"
                  >
                    <div className="relative w-28 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
                      <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        #{startPage + index}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-pink-500/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#f8fafc] line-clamp-2 mb-2 group-hover:text-pink-400 transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-[#94a3b8] mb-2">
                        @{video.author} • {video.publishedAt}
                      </p>
                      <p className="text-sm text-[#64748b] line-clamp-3">
                        {video.description}
                      </p>
                      <a 
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block mt-2 text-xs text-pink-400 hover:text-pink-300 transition-colors"
                      >
                        View on TikTok ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  onClick={loadPrev5}
                  disabled={!hasPrev || loading}
                  className="px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous 5
                </button>
                <div className="text-sm text-[#94a3b8]">
                  Page {currentPage} • Videos {startPage}-{endPage}
                </div>
                <button
                  onClick={loadNext5}
                  disabled={!hasMore || loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next 5 →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
