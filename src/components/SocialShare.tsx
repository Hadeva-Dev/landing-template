'use client'

import { useState } from 'react'
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export default function SocialShare({
  url = "http://localhost:3000",
  title = "Your Brand - Product Description",
  description = "Your compelling product description and value proposition goes here.",
  className = ""
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-sm font-medium text-gray-600">Share:</span>
      
      <button
        onClick={() => openShare('twitter')}
        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:scale-105"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => openShare('linkedin')}
        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:scale-105"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => openShare('facebook')}
        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:scale-105"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>
      
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-700 transition-colors duration-200 hover:scale-105"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}