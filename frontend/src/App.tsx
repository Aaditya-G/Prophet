import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useWallet } from './hooks/useWallet'
import { WalletConnect } from './components/WalletConnect'
import { Dashboard } from './components/Dashboard'
import { ProposalsPage } from './pages/proposals'
import { ProfilePage } from './pages/profile'
import NotFoundPage from './pages/NotFoundPage'
import AIProposalChatbot from './components/AIProposalChatbot'

function App() {
  const { isConnected } = useWallet()
  const [activeSection, setActiveSection] = useState('home')

  if (!isConnected) {
    return <WalletConnect />
  }

  const renderActiveSection = () => {
    console.log('Current active section:', activeSection)
    switch (activeSection) {
      case 'home':
        return <Dashboard onSectionChange={setActiveSection} />
      case 'proposals':
        return <ProposalsPage onSectionChange={setActiveSection} />
      case 'profile':
        return <ProfilePage onSectionChange={setActiveSection} />
      default:
        return <Dashboard onSectionChange={setActiveSection} />
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            {renderActiveSection()}
            {/* AI Proposal Chatbot - Fixed position, only show on proposals page */}
            {activeSection === 'proposals' && <AIProposalChatbot />}
          </div>
        } />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/proposals" element={
          <div>
            <ProposalsPage onSectionChange={setActiveSection} />
            <AIProposalChatbot />
          </div>
        } />
        <Route path="/profile" element={<ProfilePage onSectionChange={setActiveSection} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
