import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
  onCollapseChange?: (collapsed: boolean) => void
}

const menuItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'proposals', label: 'Proposals', icon: '📋' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'markets', label: 'Markets', icon: '📈' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export const Sidebar = ({ isOpen, onClose, activeSection, onSectionChange, onCollapseChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(sidebarRef.current, 
        { x: -300 },
        { x: 0, duration: 0.3, ease: "power2.out" }
      )
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
    } else {
      gsap.to(sidebarRef.current, 
        { x: -300, duration: 0.3, ease: "power2.in" }
      )
      gsap.to(overlayRef.current,
        { opacity: 0, duration: 0.3 }
      )
    }
  }, [isOpen])

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    if (onCollapseChange) {
      onCollapseChange(newCollapsed)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transform transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto ${
          isCollapsed ? 'lg:w-16' : 'lg:w-64'
        } w-64`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-eth-green rounded-full flex items-center justify-center">
                  <span className="text-eth-dark font-bold text-sm">E</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">ETHGlobal</h2>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleCollapse}
                className="hidden lg:block w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <span className="text-gray-600 text-sm">
                  {isCollapsed ? '→' : '←'}
                </span>
              </button>
              <button
                onClick={onClose}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id)
                  onClose()
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-eth-green text-eth-dark'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            {!isCollapsed && <p className="text-gray-600 text-sm mb-2">Connected Wallet</p>}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {!isCollapsed && <span className="text-gray-800 text-sm font-medium">MetaMask</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
