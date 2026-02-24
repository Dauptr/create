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

// Watch behavior tracking for AI recommendations
interface WatchBehavior {
  videoId: string
  query: string
  author: string
  watchTime: number // seconds watched
  totalDuration: number
  liked: boolean
  swiped: 'up' | 'down' | 'none'
  watched: boolean // watched to end
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
  const [swipeStartY, setSwipeStartY] = useState(0)
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set())
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [watchHistory, setWatchHistory] = useState<string[]>([])
  const [lastWheelTime, setLastWheelTime] = useState(0)
  const [searchType, setSearchType] = useState<'videos' | 'live' | 'trending' | 'hashtag' | 'user'>('videos')

  // AI Recommendation states
  const [watchBehavior, setWatchBehavior] = useState<WatchBehavior[]>([])
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([])
  const [videoStartTime, setVideoStartTime] = useState<number>(Date.now())
  const [aiLoading, setAiLoading] = useState(false)

  // Popular TikTok search suggestions
  const popularSuggestions = [
    'funny cats', 'dance challenge', 'cooking recipes', 'life hacks',
    'fitness workout', 'cute dogs', 'makeup tutorial', 'gaming clips',
    'travel vlog', 'comedy skit', 'music cover', 'art tutorial',
    'fashion outfit', 'food review', 'prank videos', 'motivation',
    'DIY crafts', 'pet tricks', 'street food', 'viral trends',
    'satisfying videos', 'asmr', 'basketball', 'football highlights',
    'beauty tips', 'skincare routine', 'workout motivation', 'funny fails',
    'magic tricks', 'science experiments', 'coding', 'tech review',
    'car modification', 'motorcycle', 'surfing', 'snowboarding'
  ]

  // Get suggestions based on input
  const getSuggestions = (input: string) => {
    if (!input.trim()) {
      // Show popular suggestions + watch history
      const combined = [...new Set([...watchHistory.slice(-5), ...popularSuggestions.slice(0, 10)])]
      return combined.slice(0, 8)
    }
    
    // Filter suggestions matching input
    const filtered = popularSuggestions.filter(s => 
      s.toLowerCase().includes(input.toLowerCase())
    )
    
    // Add watch history matches
    const historyMatches = watchHistory.filter(h =>
      h.toLowerCase().includes(input.toLowerCase())
    )
    
    return [...new Set([...historyMatches, ...filtered])].slice(0, 8)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSearchSuggestions(getSuggestions(value))
    setShowSuggestions(true)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    // Auto search
    searchVideos()
  }

  const log = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [...prev.slice(-20), { time: new Date().toLocaleTimeString(), msg, type }])
  }

  const searchVideos = async () => {
    if (!query.trim()) return

    setLoading(true)
    setShortsMode(false)
    setShowSuggestions(false)

    // Save to watch history
    setWatchHistory(prev => {
      const newHistory = [...prev.filter(h => h !== query), query]
      return newHistory.slice(-20) // Keep last 20 searches
    })

    try {
      const res = await fetch('/api/tiktok-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, searchType }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        const fetchedVideos = data.videos || []
        setAllVideos(fetchedVideos)
        setDisplayedVideos(fetchedVideos.slice(0, 20)) // Show first 20
        setCurrentPage(1)
        setTotalResults(fetchedVideos.length)
        setSearchPerformed(true)
        setCurrentShortIndex(0)
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
    searchVideos()
  }

  // Load next 20 videos
  const loadNext5 = () => {
    const nextPageNum = currentPage + 1
    const startIndex = currentPage * 20
    const endIndex = startIndex + 20
    const nextVideos = allVideos.slice(startIndex, endIndex)

    if (nextVideos.length > 0) {
      setDisplayedVideos(nextVideos)
      setCurrentPage(nextPageNum)
    }
  }

  // Load previous 20 videos
  const loadPrev5 = () => {
    if (currentPage > 1) {
      const prevPageNum = currentPage - 1
      const startIndex = (prevPageNum - 1) * 20
      const endIndex = startIndex + 20
      const prevVideos = allVideos.slice(startIndex, endIndex)

      setDisplayedVideos(prevVideos)
      setCurrentPage(prevPageNum)
    }
  }

  const hasMore = currentPage * 20 < allVideos.length
  const hasPrev = currentPage > 1

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

  // Record watch behavior for AI recommendations
  const recordWatchBehavior = (swipedDirection: 'up' | 'down' | 'none' = 'none') => {
    if (!allVideos[currentShortIndex]) return

    const watchTime = (Date.now() - videoStartTime) / 1000
    const video = allVideos[currentShortIndex]
    const videoDuration = 15 // Default TikTok duration

    const behavior: WatchBehavior = {
      videoId: video.id,
      query: query,
      author: video.author,
      watchTime: Math.min(watchTime, videoDuration),
      totalDuration: videoDuration,
      liked: likedVideos.has(video.id),
      swiped: swipedDirection,
      watched: watchTime >= videoDuration * 0.8
    }

    setWatchBehavior(prev => [...prev.slice(-50), behavior])
  }

  // Get AI recommendations based on watch behavior
  const getAIRecommendations = async () => {
    if (watchBehavior.length < 3) return

    setAiLoading(true)

    try {
      const res = await fetch('/api/tiktok-ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          watchBehavior: watchBehavior.slice(-20),
          currentQuery: query
        })
      })

      const data = await res.json()
      if (data.success && data.recommendations) {
        setAiRecommendations(data.recommendations)
      }
    } catch (error) {
      console.error('AI recommendation failed')
    } finally {
      setAiLoading(false)
    }
  }

  const nextShort = () => {
    recordWatchBehavior('up')

    if (currentShortIndex < allVideos.length - 1) {
      setCurrentShortIndex(currentShortIndex + 1)
      setVideoStartTime(Date.now())
    }

    if (allVideos[currentShortIndex]) {
      setWatchedVideos(prev => new Set([...prev, allVideos[currentShortIndex].id]))
    }

    // Get AI recommendations every 5 videos
    if (watchBehavior.length > 0 && watchBehavior.length % 5 === 0) {
      getAIRecommendations()
    }
  }

  const prevShort = () => {
    recordWatchBehavior('down')

    if (currentShortIndex > 0) {
      setCurrentShortIndex(currentShortIndex - 1)
      setVideoStartTime(Date.now())
    }
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartY(e.touches[0].clientY)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!swipeStartY) return

    const endY = e.changedTouches[0].clientY
    const diff = swipeStartY - endY

    // Swipe up = next, Swipe down = prev (threshold 50px)
    if (diff > 50) {
      nextShort()
    } else if (diff < -50) {
      prevShort()
    }

    setSwipeStartY(0)
  }

  // Mouse wheel handler for desktop
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now()
    if (now - lastWheelTime < 400) return

    if (e.deltaY > 50) {
      setLastWheelTime(now)
      nextShort()
    } else if (e.deltaY < -50) {
      setLastWheelTime(now)
      prevShort()
    }
  }

  // Auto-play effect - auto-advance after video duration
  useEffect(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
      autoPlayRef.current = null
    }

    if (!shortsMode || allVideos.length === 0) return

    setVideoStartTime(Date.now())

    // Auto-advance after 15 seconds
    autoPlayRef.current = setTimeout(() => {
      setCurrentShortIndex(prev => {
        if (prev < allVideos.length - 1) return prev + 1
        return prev
      })
    }, 15000)

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [currentShortIndex, shortsMode, allVideos.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!shortsMode) return

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevShort()
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextShort()
      } else if (e.key === 'Escape') {
        setShortsMode(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortsMode, currentShortIndex])

  return (
    <div className="w-full max-w-[1200px]">
      {/* Search Card */}
      <div className="bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-8 backdrop-blur-sm shadow-lg mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TikTokIcon />
            TikTok
          </h2>
          {searchPerformed && allVideos.length > 0 && (
            <button
              onClick={() => setShortsMode(true)}
              className="px-4 py-2 rounded-full font-medium text-sm bg-gradient-to-r from-pink-500 to-red-500 text-white"
            >
              ▶ Watch
            </button>
          )}
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search TikTok..."
            className="flex-1 p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-pink-400 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium disabled:opacity-50"
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {/* Quick Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {['trending', 'funny', 'dance', 'cats', 'music', 'gaming'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag)
                searchVideos()
              }}
              className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm hover:bg-pink-500/30 transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Shorts Mode - Fullscreen Auto Player with Smooth Slide */}
      {shortsMode && allVideos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
          {/* Videos Container with Slide Animation */}
          <div
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(-${currentShortIndex * 100}%)`
            }}
          >
            {allVideos.map((video, index) => (
              <div
                key={video.id}
                className="w-full h-full"
                style={{
                  position: 'absolute',
                  top: `${index * 100}%`,
                  left: 0,
                  right: 0
                }}
              >
                {Math.abs(index - currentShortIndex) <= 1 && (
                  <iframe
                    src={`${video.embedUrl}?autoplay=1&muted=0`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; encrypted-media"
                    style={{ border: 'none' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Transparent overlay to capture swipe */}
          <div
            className="absolute inset-0 z-10"
            style={{ touchAction: 'none' }}
            onTouchStart={(e) => setSwipeStartY(e.touches[0].clientY)}
            onTouchEnd={(e) => {
              const diff = swipeStartY - e.changedTouches[0].clientY
              if (diff > 50 && currentShortIndex < allVideos.length - 1) {
                setCurrentShortIndex(currentShortIndex + 1)
              } else if (diff < -50 && currentShortIndex > 0) {
                setCurrentShortIndex(currentShortIndex - 1)
              }
            }}
            onWheel={(e) => {
              if (e.deltaY > 50 && currentShortIndex < allVideos.length - 1) {
                setCurrentShortIndex(currentShortIndex + 1)
              } else if (e.deltaY < -50 && currentShortIndex > 0) {
                setCurrentShortIndex(currentShortIndex - 1)
              }
            }}
          />
        </div>
      )}

      {/* List Mode */}
      {!shortsMode && searchPerformed && (
        <div className="bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 backdrop-blur-sm shadow-lg">
          {loading ? (
            <div className="text-center py-8 text-white/60">
              <div className="animate-spin w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              Loading...
            </div>
          ) : displayedVideos.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No videos found
            </div>
          ) : (
            <>
              <div className="grid gap-3">
                {displayedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      setCurrentShortIndex(index)
                      setShortsMode(true)
                    }}
                    className="flex gap-3 p-3 rounded-xl bg-black/30 border border-white/5 hover:border-pink-500/30 cursor-pointer transition-all"
                  >
                    <div className="w-20 h-28 flex-shrink-0 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white line-clamp-2 text-sm">
                        {video.title}
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        @{video.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  onClick={loadNext5}
                  disabled={loading}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium disabled:opacity-50"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
