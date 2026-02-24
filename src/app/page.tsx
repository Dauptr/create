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

type NavSection = 'create' | 'database' | 'chat'

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
