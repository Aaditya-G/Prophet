import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { MarkdownRenderer } from '../../../components/MarkdownRenderer'
import type { BackendProposal } from '../types'
import type { AIAnalysisData } from '../../../services/api'

interface ProposalDetailsProps {
  proposal: BackendProposal | null
  aiAnalysis?: AIAnalysisData
  onClose: () => void
}

export const ProposalDetails = ({ proposal, aiAnalysis, onClose }: ProposalDetailsProps) => {
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    if (proposal && detailsRef.current) {
      gsap.fromTo(detailsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [proposal])

  if (!proposal) return null

  const formatDate = (timestamp: number | undefined): string => {
    if (!timestamp || timestamp === 0) return 'N/A';
    try {
      const date = timestamp > 1e10 ? new Date(timestamp) : new Date(timestamp * 1000);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatAddress = (address: string | undefined): string => {
    if (!address || typeof address !== 'string') return 'N/A';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return createPortal(
    <div 
      ref={detailsRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ 
        backgroundColor: 'rgba(16, 15, 23, 0.98)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
        {/* ... (Rest of the JSX remains the same) ... */}
    </div>,
    document.body
  )
}