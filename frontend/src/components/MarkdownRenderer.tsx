import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  maxLength?: number;
}

export const MarkdownRenderer = ({ content, className = '', maxLength }: MarkdownRendererProps) => {
  // Clean up the markdown content
  const cleanContent = (text: string): string => {
    // Remove img tags completely
    let cleaned = text.replace(/<img[^>]*>/gi, '');
    
    // Remove markdown image syntax
    cleaned = cleaned.replace(/!\[.*?\]\([^)]+\)/g, '');
    
    // Remove image links like [2322048×1024 415 KB](https://us1.discourse-cdn.com/...)
    cleaned = cleaned.replace(/\[[^\]]*×[^\]]*\]\([^)]+\)/g, '');
    
    // Remove any remaining image-related links
    cleaned = cleaned.replace(/\[[^\]]*\.(jpg|jpeg|png|gif|webp|svg)[^\]]*\]\([^)]+\)/gi, '');
    
    // Remove Snapshot links
    cleaned = cleaned.replace(/\[Snapshot\]\(https:\/\/sn[^)]+\)/gi, '');
    
    // Remove excessive line breaks
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    
    // Remove markdown headers that are too long
    cleaned = cleaned.replace(/^#{1,6}\s+.{100,}$/gm, (match) => {
      const text = match.replace(/^#{1,6}\s+/, '');
      return text.length > 100 ? text.substring(0, 100) + '...' : match;
    });
    
    // Clean up bullet points
    cleaned = cleaned.replace(/^\s*[-*+]\s+/gm, '• ');
    
    // Clean up numbered lists (1., 2., etc.)
    cleaned = cleaned.replace(/^\s*(\d+)\.\s+/gm, '$1. ');
    
    // Remove excessive spaces
    cleaned = cleaned.replace(/\s{2,}/g, ' ');
    
    // Add proper spacing after headers
    cleaned = cleaned.replace(/^(#{1,6}\s+.*)$/gm, '$1\n');
    
    // Add proper spacing after bullet points
    cleaned = cleaned.replace(/^(•\s+.*)$/gm, '$1\n');
    
    // Add proper spacing after numbered lists
    cleaned = cleaned.replace(/^(\d+\.\s+.*)$/gm, '$1\n');
    
    return cleaned.trim();
  };

  const processedContent = cleanContent(content);
  const displayContent = maxLength && processedContent.length > maxLength 
    ? processedContent.substring(0, maxLength) + '...' 
    : processedContent;

  return (
    <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-lg font-semibold text-white mb-2 mt-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-semibold text-white mb-2 mt-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-semibold text-white mb-1 mt-2">{children}</h3>,
          p: ({ children }) => <p className="text-gray-300 mb-2 leading-relaxed text-sm">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 mb-2 space-y-1 ml-4 text-sm">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 mb-2 space-y-1 ml-4 text-sm">{children}</ol>,
          li: ({ children }) => <li className="text-gray-300 mb-1 text-sm">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-white text-sm">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-200 text-sm">{children}</em>,
          code: ({ children }) => (
            <code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded text-xs font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto text-xs mb-2">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#c77dff] pl-4 italic text-gray-300 my-2 text-sm">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#c77dff] hover:text-[#9d4edd] underline text-sm"
            >
              {children}
            </a>
          ),
        }}
      >
        {displayContent}
      </ReactMarkdown>
    </div>
  );
};

// Utility function to extract clean text from markdown
export const extractCleanText = (markdown: string, maxLength: number = 200): string => {
  // Remove markdown syntax
  const clean = markdown
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/^\s*[-*+]\s+/gm, '• ') // Convert bullets
    .replace(/\n{2,}/g, ' ') // Replace multiple newlines with space
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
    .trim();

  return clean.length > maxLength ? clean.substring(0, maxLength) + '...' : clean;
};
