import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

interface WalletState {
  address: string | null
  isConnected: boolean
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    provider: null,
    signer: null
  })

  const AUTO_CONNECT_KEY = 'ethglobal:autoConnect'
  const [isManualConnecting, setIsManualConnecting] = useState(false)

  const connectWallet = async () => {
    setIsManualConnecting(true)
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()
        
        // Force a fresh state update
        setWallet({
          address: accounts[0],
          isConnected: true,
          provider,
          signer
        })

        // Enable auto-connect for future reloads
        try { localStorage.setItem(AUTO_CONNECT_KEY, 'true') } catch {}
        
        return true
      } else {
        alert('MetaMask is not installed!')
        return false
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      return false
    } finally {
      setIsManualConnecting(false)
    }
  }

  const disconnectWallet = () => {
    // Force immediate state update
    setWallet({
      address: null,
      isConnected: false,
      provider: null,
      signer: null
    })

    // Disable auto-connect so a refresh won't reconnect automatically
    try { localStorage.setItem(AUTO_CONNECT_KEY, 'false') } catch {}
    
    // Also clear any cached connection data
    try { localStorage.removeItem(AUTO_CONNECT_KEY) } catch {}
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined' && !isManualConnecting) {
        try {
          const autoConnect = (() => {
            try { return localStorage.getItem(AUTO_CONNECT_KEY) === 'true' } catch { return false }
          })()

          if (!autoConnect) return

          const provider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await provider.listAccounts()

          if (accounts.length > 0) {
            const signer = await provider.getSigner()
            setWallet({
              address: accounts[0].address,
              isConnected: true,
              provider,
              signer
            })
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error)
        }
      }
    }

    // Only run auto-connect on initial load, not on every render
    if (!isManualConnecting) {
      checkConnection()
    }

    // Listen for account changes
    let handler: ((accounts: string[]) => void) | null = null
    if (typeof window.ethereum !== 'undefined') {
      handler = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          // Respect auto-connect preference
          const autoConnect = (() => {
            try { return localStorage.getItem(AUTO_CONNECT_KEY) === 'true' } catch { return false }
          })()
          if (autoConnect) {
            checkConnection()
          }
        }
      }
      window.ethereum.on('accountsChanged', handler)
    }

    return () => {
      if (handler && typeof window.ethereum !== 'undefined') {
        // @ts-ignore - MetaMask provider typing may vary
        window.ethereum.removeListener?.('accountsChanged', handler)
      }
    }
  }, [isManualConnecting])

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    formatAddress
  }
}
