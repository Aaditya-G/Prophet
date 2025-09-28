import { useState, useEffect, useRef } from 'react'
import { useWallet } from '../../hooks/useWallet'
import { useProposals } from '../../hooks/useProposals'
import { StaggeredMenu } from '../../components/StaggeredMenu'
import Silk from '../../components/Silk'
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from '../../components/StaggeredMenu'
import gsap from 'gsap'

interface ProfilePageProps {
  onSectionChange?: (section: string) => void
}

interface UserProfile {
  address: string
  displayName: string
  bio: string
  constitution: string
  votingHistory: {
    totalVotes: number
    forVotes: number
    againstVotes: number
    abstainVotes: number
  }
  preferences: {
    notifications: boolean
    autoConnect: boolean
    theme: 'dark' | 'light'
  }
}

export const ProfilePage = ({ onSectionChange }: ProfilePageProps) => {
  const profileRef = useRef<HTMLDivElement>(null)
  const { address, formatAddress, disconnectWallet } = useWallet()
  const { allProposals } = useProposals(50)
  
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'constitution' | 'voting' | 'settings'>('overview')
  
  // Mock user profile data
  const [profile, setProfile] = useState<UserProfile>({
    address: address || '',
    displayName: 'DeFi Enthusiast',
    bio: 'Passionate about decentralized governance and protocol improvements.',
    constitution: `I believe in the power of decentralized governance to create more transparent, fair, and efficient systems. My voting principles are:

1. Technical Excellence: I support proposals that improve protocol security, efficiency, and scalability.

2. Community Benefit: I prioritize changes that benefit the broader ecosystem and user base.

3. Long-term Vision: I consider the long-term implications of governance decisions on protocol sustainability.

4. Transparency: I value clear communication and detailed explanations in proposals.

5. Risk Management: I carefully evaluate potential risks and mitigation strategies.

This constitution guides my voting decisions and helps maintain consistency in my governance participation.`,
    votingHistory: {
      totalVotes: 0,
      forVotes: 0,
      againstVotes: 0,
      abstainVotes: 0
    },
    preferences: {
      notifications: true,
      autoConnect: true,
      theme: 'dark'
    }
  })

  const [editForm, setEditForm] = useState({
    displayName: profile.displayName,
    bio: profile.bio,
    constitution: profile.constitution
  })

  // Menu items for StaggeredMenu
  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to Home page', link: '#home', onClick: () => { console.log('Home clicked'); onSectionChange?.('home') } },
    { label: 'Proposals', ariaLabel: 'View all Proposals', link: '#proposals', onClick: () => { console.log('Proposals clicked'); onSectionChange?.('proposals') } },
    { label: 'FAQ', ariaLabel: 'View FAQ', link: '#faq', onClick: () => { console.log('FAQ clicked'); onSectionChange?.('faq') } },
    { label: 'Markets', ariaLabel: 'View Markets', link: '#markets', onClick: () => { console.log('Markets clicked'); onSectionChange?.('markets') } },
    { label: 'Profile', ariaLabel: 'View Profile', link: '#profile', onClick: () => { console.log('Profile clicked'); onSectionChange?.('profile') } }
  ]

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Discord', link: 'https://discord.com' },
    { label: 'GitHub', link: 'https://github.com' }
  ]

  // Calculate actual voting history from proposals
  useEffect(() => {
    if (allProposals.length > 0 && address) {
      // For now, we'll show 0 votes since we don't have actual voting data
      // In a real implementation, you would query the blockchain for actual votes
      const actualVotingHistory = {
        totalVotes: 0,
        forVotes: 0,
        againstVotes: 0,
        abstainVotes: 0
      }
      
      setProfile(prev => ({
        ...prev,
        votingHistory: actualVotingHistory
      }))
    }
  }, [allProposals, address])

  useEffect(() => {
    if (profileRef.current) {
      gsap.fromTo(profileRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }
  }, [])

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      displayName: editForm.displayName,
      bio: editForm.bio,
      constitution: editForm.constitution
    }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      displayName: profile.displayName,
      bio: profile.bio,
      constitution: profile.constitution
    })
    setIsEditing(false)
  }

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 'constitution', 
      label: 'Constitution', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'voting', 
      label: 'Voting History', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c77dff] to-[#9d4edd] flex items-center justify-center">
            <span className="text-2xl font-bold text-[#10002b]">
              {profile.displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{profile.displayName}</h2>
            <p className="text-gray-400">{formatAddress(profile.address)}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-400">Active Voter</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Bio</h3>
            <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Total Votes</h3>
          </div>
          <p className={`text-3xl font-bold ${profile.votingHistory.totalVotes === 0 ? 'text-gray-500 underline' : 'text-white'}`}>
            {profile.votingHistory.totalVotes}
          </p>
          <p className="text-sm text-gray-400 mt-1">Lifetime participation</p>
        </div>

        <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">For Votes</h3>
          </div>
          <p className={`text-3xl font-bold ${profile.votingHistory.forVotes === 0 ? 'text-gray-500 underline' : 'text-green-400'}`}>
            {profile.votingHistory.forVotes}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {profile.votingHistory.totalVotes > 0 
              ? `${Math.round((profile.votingHistory.forVotes / profile.votingHistory.totalVotes) * 100)}% of total`
              : '0% of total'
            }
          </p>
        </div>

        <div className="rounded-3xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Against Votes</h3>
          </div>
          <p className={`text-3xl font-bold ${profile.votingHistory.againstVotes === 0 ? 'text-gray-500 underline' : 'text-red-400'}`}>
            {profile.votingHistory.againstVotes}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {profile.votingHistory.totalVotes > 0 
              ? `${Math.round((profile.votingHistory.againstVotes / profile.votingHistory.totalVotes) * 100)}% of total`
              : '0% of total'
            }
          </p>
        </div>
      </div>
    </div>
  )

  const renderConstitution = () => (
    <div className="space-y-6">
      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Voting Constitution</h2>
            <p className="text-gray-400">Your principles and guidelines for governance participation</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl font-semibold transition-colors duration-200"
              style={{ backgroundColor: '#c77dff', color: '#10002b' }}
            >
              Edit Constitution
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={editForm.displayName}
                onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#c77dff]"
                placeholder="Enter your display name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#c77dff] resize-none"
                placeholder="Tell us about yourself"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Constitution
              </label>
              <textarea
                value={editForm.constitution}
                onChange={(e) => setEditForm(prev => ({ ...prev, constitution: e.target.value }))}
                rows={12}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#c77dff] resize-none"
                placeholder="Define your voting principles and guidelines..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                style={{ backgroundColor: '#c77dff', color: '#10002b' }}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl font-semibold transition-colors duration-200 bg-white/10 text-white hover:bg-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">My Voting Constitution</h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {profile.constitution}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderVotingHistory = () => (
    <div className="space-y-6">
      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
        <h2 className="text-2xl font-bold text-white mb-6">Voting Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${profile.votingHistory.totalVotes === 0 ? 'text-gray-500 underline' : 'text-white'}`}>
              {profile.votingHistory.totalVotes}
            </div>
            <div className="text-sm text-gray-400">Total Votes</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${profile.votingHistory.forVotes === 0 ? 'text-gray-500 underline' : 'text-green-400'}`}>
              {profile.votingHistory.forVotes}
            </div>
            <div className="text-sm text-gray-400">For</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${profile.votingHistory.againstVotes === 0 ? 'text-gray-500 underline' : 'text-red-400'}`}>
              {profile.votingHistory.againstVotes}
            </div>
            <div className="text-sm text-gray-400">Against</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${profile.votingHistory.abstainVotes === 0 ? 'text-gray-500 underline' : 'text-yellow-400'}`}>
              {profile.votingHistory.abstainVotes}
            </div>
            <div className="text-sm text-gray-400">Abstain</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Voting Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">For Votes</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-400 transition-all duration-500"
                    style={{ 
                      width: `${profile.votingHistory.totalVotes > 0 ? (profile.votingHistory.forVotes / profile.votingHistory.totalVotes) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">
                  {profile.votingHistory.totalVotes > 0 
                    ? `${Math.round((profile.votingHistory.forVotes / profile.votingHistory.totalVotes) * 100)}%`
                    : '0%'
                  }
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Against Votes</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-400 transition-all duration-500"
                    style={{ 
                      width: `${profile.votingHistory.totalVotes > 0 ? (profile.votingHistory.againstVotes / profile.votingHistory.totalVotes) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">
                  {profile.votingHistory.totalVotes > 0 
                    ? `${Math.round((profile.votingHistory.againstVotes / profile.votingHistory.totalVotes) * 100)}%`
                    : '0%'
                  }
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Abstain Votes</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-500"
                    style={{ 
                      width: `${profile.votingHistory.totalVotes > 0 ? (profile.votingHistory.abstainVotes / profile.votingHistory.totalVotes) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">
                  {profile.votingHistory.totalVotes > 0 
                    ? `${Math.round((profile.votingHistory.abstainVotes / profile.votingHistory.totalVotes) * 100)}%`
                    : '0%'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-400">No voting activity yet</p>
          <p className="text-sm text-gray-500 mt-2">Start participating in governance to see your voting history</p>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <p className="text-sm text-gray-400">Receive notifications for new proposals and voting reminders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.preferences.notifications}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, notifications: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#c77dff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c77dff]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Auto-Connect Wallet</h3>
              <p className="text-sm text-gray-400">Automatically connect wallet on app startup</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.preferences.autoConnect}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, autoConnect: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#c77dff]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c77dff]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Theme</h3>
              <p className="text-sm text-gray-400">Choose your preferred theme</p>
            </div>
            <select
              value={profile.preferences.theme}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences, theme: e.target.value as 'dark' | 'light' }
              }))}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#c77dff]"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(199, 125, 255, 0.2)' }}>
        <h3 className="text-lg font-semibold text-white mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Disconnect Wallet</h4>
              <p className="text-sm text-gray-400">Disconnect your wallet from this application</p>
            </div>
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 rounded-xl font-semibold transition-colors duration-200 bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'constitution':
        return renderConstitution()
      case 'voting':
        return renderVotingHistory()
      case 'settings':
        return renderSettings()
      default:
        return renderOverview()
    }
  }

  return (
    <div ref={profileRef} className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#10002b' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
      <Silk
          speed={1.8}
          scale={0.3}
          color="#5a189a"
          noiseIntensity={0.1}
          rotation={0}
        />
        <div
          style={{
            position: 'absolute',
            width: '55vw',
            height: '55vw',
            right: '-5vw',
            bottom: '-10vw',
            background: 'radial-gradient(closest-side, rgba(199,125,255,0.20), rgba(199,125,255,0) 70%)',
            filter: 'blur(90px)'
          }}
        />
      </div>

      {/* StaggeredMenu */}
      <StaggeredMenu
        position="left"
        colors={['#10002b', '#c77dff']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#c77dff"
        openMenuButtonColor="#c77dff"
        accentColor="#c77dff"
        changeMenuColorOnOpen={false}
      />

      {/* Main Content */}
      <div className="px-6 py-4 relative z-20">
        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your search request..."
                className="px-4 py-2 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none w-64"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(199, 125, 255, 0.2)'
                }}
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Wallet Address */}
            {address && (
              <div className="flex items-center space-x-3">
                <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#c77dff', color: '#10002b' }}>
                  {formatAddress(address)}
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
            
            {/* Disconnect Button */}
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 rounded-xl font-semibold transition-colors duration-200"
              style={{ backgroundColor: '#ef4444', color: 'white' }}
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#c77dff]" style={{ border: '1px solid rgba(199, 125, 255, 0.5)', backgroundColor: 'transparent' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth={2} strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4" strokeWidth={2} strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Profile</h1>
                  {address && (
                    <p className="text-sm text-gray-400 font-mono">{address}</p>
                  )}
                </div>
              </div>
              <p className="text-gray-400">Manage your account and voting preferences</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-white/5 rounded-2xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'constitution' | 'voting' | 'settings')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#c77dff] text-[#10002b]'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  )
}
