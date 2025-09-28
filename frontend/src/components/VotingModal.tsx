/**
 * Voting Transaction Modal
 * Handles vote confirmation and transaction status
 */

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { votingService, VOTE_SUPPORT, type VoteSupport, type VoteResult } from '../services/votingService';

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  proposalTitle: string;
  voteType: VoteSupport;
  onVoteSuccess?: (txHash: string) => void;
}

export const VotingModal: React.FC<VotingModalProps> = ({
  isOpen,
  onClose,
  proposalId,
  proposalTitle,
  voteType,
  onVoteSuccess
}) => {
  const [isVoting, setIsVoting] = useState(false);
  const [voteReason, setVoteReason] = useState('');
  const [voteResult, setVoteResult] = useState<VoteResult | null>(null);
  const [txStatus, setTxStatus] = useState<'pending' | 'confirming' | 'confirmed' | 'failed'>('pending');
  const modalRef = React.useRef<HTMLDivElement>(null);

  const voteTypeLabels = {
    [VOTE_SUPPORT.AGAINST]: 'Against',
    [VOTE_SUPPORT.FOR]: 'For',
    [VOTE_SUPPORT.ABSTAIN]: 'Abstain'
  };

  const voteTypeColors = {
    [VOTE_SUPPORT.AGAINST]: 'text-red-400',
    [VOTE_SUPPORT.FOR]: 'text-green-400',
    [VOTE_SUPPORT.ABSTAIN]: 'text-gray-400'
  };

  const voteTypeBgColors = {
    [VOTE_SUPPORT.AGAINST]: 'bg-red-500',
    [VOTE_SUPPORT.FOR]: 'bg-green-500',
    [VOTE_SUPPORT.ABSTAIN]: 'bg-gray-500'
  };

  // Animation effects, scroll prevention, and keyboard support
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';
      
      // Add keyboard event listener for ESC key
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !isVoting) {
          handleClose();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }

      // Cleanup function
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.top = '';
        document.body.style.left = '';
      };
    } else {
      // Restore body scrolling when modal is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
    }
  }, [isOpen, isVoting]);

  const handleVote = async () => {
    if (!votingService.isConnected()) {
      const connected = await votingService.connectWallet();
      if (!connected) {
        setVoteResult({
          success: false,
          error: 'Failed to connect wallet',
          message: 'Please install MetaMask and try again'
        });
        return;
      }
    }

    setIsVoting(true);
    setTxStatus('pending');

    try {
      // First validate the proposal exists
      const validation = await votingService.validateProposal(proposalId);
      if (!validation.exists) {
        setVoteResult({
          success: false,
          error: 'Proposal not found',
          message: `Proposal ${proposalId}${validation.mappedId ? ` (mapped to ${validation.mappedId})` : ''} does not exist on the Uniswap governance contract. Please check the proposal ID.`
        });
        setTxStatus('failed');
        return;
      }

      const result = await votingService.castVote(
        proposalId,
        voteType,
        voteReason.trim() || undefined
      );

      setVoteResult(result);

      if (result.success && result.txHash) {
        setTxStatus('confirming');
        
        // Wait for transaction confirmation
        const confirmResult = await votingService.waitForTransaction(result.txHash);
        
        if (confirmResult.success) {
          setTxStatus('confirmed');
          onVoteSuccess?.(result.txHash);
        } else {
          setTxStatus('failed');
          setVoteResult(confirmResult);
        }
      } else {
        setTxStatus('failed');
      }
    } catch (error) {
      console.error('Vote error:', error);
      setVoteResult({
        success: false,
        error: 'Unexpected error',
        message: 'An unexpected error occurred while voting'
      });
      setTxStatus('failed');
    } finally {
      setIsVoting(false);
    }
  };

  const handleClose = () => {
    if (!isVoting) {
      setVoteResult(null);
      setVoteReason('');
      setTxStatus('pending');
      onClose();
    }
  };

  const getStatusIcon = () => {
    switch (txStatus) {
      case 'pending':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'confirming':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          </div>
        );
      case 'confirmed':
        return (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'failed':
        return (
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
    }
  };

  const getStatusMessage = () => {
    switch (txStatus) {
      case 'pending':
        return 'Preparing vote transaction...';
      case 'confirming':
        return 'Waiting for transaction confirmation...';
      case 'confirmed':
        return 'Vote confirmed on-chain!';
      case 'failed':
        return voteResult?.message || 'Transaction failed';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ 
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}
      onClick={(e) => {
        // Close modal when clicking outside
        if (e.target === e.currentTarget && !isVoting) {
          handleClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/20 max-h-[90vh] overflow-y-auto"
        style={{ 
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => {
          // Prevent modal from closing when clicking inside
          e.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Cast Your Vote</h2>
          <button
            onClick={handleClose}
            disabled={isVoting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Proposal Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{proposalTitle}</h3>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${voteTypeBgColors[voteType]} text-white`}>
              Vote {voteTypeLabels[voteType]}
            </span>
            <span className="text-gray-400 text-sm">Proposal #{proposalId}</span>
          </div>
        </div>

        {/* Vote Reason */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Reason (Optional)
          </label>
          <textarea
            value={voteReason}
            onChange={(e) => setVoteReason(e.target.value)}
            placeholder="Explain your voting decision..."
            disabled={isVoting}
            className="w-full px-3 py-2 rounded-lg text-white text-sm focus:outline-none placeholder-gray-400 resize-none"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(197, 255, 74, 0.2)'
            }}
            rows={3}
          />
        </div>

        {/* Transaction Status */}
        {voteResult && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
            <div className="flex items-center space-x-3 mb-2">
              {getStatusIcon()}
              <span className="text-sm font-medium text-white">{getStatusMessage()}</span>
            </div>
            
            {voteResult.txHash && (
              <div className="mt-2">
                <a
                  href={`https://etherscan.io/tx/${voteResult.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c77dff] hover:text-[#9d4edd] transition-colors flex items-center space-x-1"
                >
                  <span>View on Etherscan</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            disabled={isVoting}
            className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {txStatus === 'confirmed' ? 'Close' : 'Cancel'}
          </button>
          
          {txStatus !== 'confirmed' && (
            <button
              onClick={handleVote}
              disabled={isVoting}
              className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#c77dff', color: '#10002b' }}
            >
              {isVoting ? 'Voting...' : `Vote ${voteTypeLabels[voteType]}`}
            </button>
          )}
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="text-xs text-yellow-300">
              <p className="mb-1">
                This will cast a vote on the Uniswap governance contract. Make sure you understand the proposal before voting.
              </p>
              <p className="text-yellow-400">
                <strong>Note:</strong> If this proposal doesn't exist on-chain, the vote will fail. Use the browser console to find valid proposal IDs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingModal;
