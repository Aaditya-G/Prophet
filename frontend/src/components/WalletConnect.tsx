import { useWallet } from '../hooks/useWallet'
import { gsap } from 'gsap'
import { useRef, useEffect, useState } from 'react'
import Beams from './Beams'
import metamaskLogo from '../assets/MetaMask-icon-fox.svg'

export const WalletConnect = () => {
  const { connectWallet, formatAddress, address, isConnected } = useWallet()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      )
    }
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await connectWallet()
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-eth-green text-eth-dark px-3 py-1 rounded-full text-sm font-semibold">
          {formatAddress(address)}
        </div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-eth-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Beams Background */}
      <div className="absolute inset-0 w-full h-full">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#c77dff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Prophet
          </h1>
          <p className="text-gray-300 text-lg px-12">
            Analyze and receive Recommendations on DAO proposals
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={metamaskLogo} alt="MetaMask Logo" className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Connect MetaMask
            </h2>
            <p className="text-gray-300">
              Connect your wallet to access Prophet's DAO proposal review and recommendation tools.
            </p>
          </div>

          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/30 transition-all duration-200 text-lg border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  )
}
