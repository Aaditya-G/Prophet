import { useState, useEffect } from 'react'
import { proposalAPI } from '../services/api'

export const BackendStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkHealth = async () => {
    try {
      setStatus('checking')
      await proposalAPI.healthCheck()
      setStatus('connected')
      setLastChecked(new Date())
    } catch (error) {
      setStatus('error')
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkHealth()
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
      case 'checking':
      default:
        return 'text-yellow-400'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Backend Connected'
      case 'error':
        return 'Backend Error'
      case 'checking':
      default:
        return 'Checking...'
    }
  }

  return (
    <div className="flex items-center space-x-2 text-xs">
      <div className={`w-2 h-2 rounded-full ${
        status === 'connected' ? 'bg-green-400' :
        status === 'error' ? 'bg-red-400' :
        'bg-yellow-400'
      }`}></div>
      <span className={getStatusColor()}>{getStatusText()}</span>
      {lastChecked && (
        <span className="text-gray-500">
          ({lastChecked.toLocaleTimeString()})
        </span>
      )}
    </div>
  )
}
