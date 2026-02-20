"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface SocialLink {
  platform: string
  url: string
  icon?: React.ReactNode
}

export function SocialLinks({ links }: { links: SocialLink[] }) {
  if (!links || links.length === 0) return null

  return (
    <div className="flex gap-2 flex-wrap">
      {links.map((link, idx) => (
        <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            {link.icon && <span className="mr-2">{link.icon}</span>}
            {link.platform}
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </a>
      ))}
    </div>
  )
}
