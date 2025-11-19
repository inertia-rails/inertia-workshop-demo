import { useState, useEffect, useRef } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { EditorState, $getRoot, $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { $convertToMarkdownString } from '@lexical/markdown'
import { TRANSFORMERS } from '@lexical/markdown'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListNode, ListItemNode } from '@lexical/list'
import { CodeNode, CodeHighlightNode } from '@lexical/code'
import { LinkNode } from '@lexical/link'
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $isHeadingNode, $isQuoteNode } from '@lexical/rich-text'
import { $isListNode } from '@lexical/list'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'

const theme = {
  paragraph: 'mb-2',
  heading: {
    h1: 'text-2xl font-bold mb-2',
    h2: 'text-xl font-bold mb-2',
    h3: 'text-lg font-bold mb-2',
  },
  list: {
    nested: {
      listitem: 'ml-4',
    },
    ol: 'list-decimal list-inside mb-2',
    ul: 'list-disc list-inside mb-2',
    listitem: 'mb-1',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    code: 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono',
  },
  code: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono block mb-2',
  quote: 'border-l-4 border-gray-300 pl-4 italic mb-2',
}

function EditorResetPlugin({
  resetTrigger
}: {
  resetTrigger: number
}) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (resetTrigger > 0) {
      editor.update(() => {
        const root = $getRoot()
        root.clear()
      })
    }
  }, [editor, resetTrigger])

  return null
}

// Toolbar Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [blockType, setBlockType] = useState('paragraph')

  const formatText = (format: 'bold' | 'italic' | 'code') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const formatHeading = (headingSize: 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize))
      }
    })
  }

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode())
      }
    })
  }

  const updateToolbar = () => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsCode(selection.hasFormat('code'))

      // Get block type
      const anchorNode = selection.anchor.getNode()
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow()

      if ($isHeadingNode(element)) {
        setBlockType(element.getTag().toLowerCase())
      } else if ($isListNode(element)) {
        setBlockType(element.getListType())
      } else if ($isQuoteNode(element)) {
        setBlockType('quote')
      } else {
        setBlockType(element.getType())
      }
    }
  }

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar()
      })
    })
  }, [editor])

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        type="button"
        onClick={() => formatText('bold')}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${isBold ? 'bg-sky-100 text-sky-700' : 'text-gray-700'}`}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => formatText('italic')}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${isItalic ? 'bg-sky-100 text-sky-700' : 'text-gray-700'}`}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => formatText('code')}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${isCode ? 'bg-sky-100 text-sky-700' : 'text-gray-700'}`}
        title="Code"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => formatHeading('h1')}
        className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-bold ${blockType === 'h1' ? 'bg-sky-100 text-sky-700' : 'text-gray-700'}`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h2')}
        className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-bold ${blockType === 'h2' ? 'bg-sky-100 text-sky-700' : 'text-gray-700'}`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h3')}
        className={`px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sm font-bold ${blockType === 'h3' ? 'bg-sky-100 text-sky-700' : 'text-gray-700'}`}
        title="Heading 3"
      >
        H3
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={formatQuote}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${blockType === 'quote' ? 'bg-sky-100 text-sky-700' : 'text-gray-700'}`}
        title="Quote"
      >
        Quote
      </button>
    </div>
  )
}

interface LexicalRichTextEditorProps {
  name: string
  placeholder?: string
  className?: string
}

export default function LexicalRichTextEditor({
  name,
  placeholder = 'Write your reply...',
  className = '',
}: LexicalRichTextEditorProps) {
  const [markdownValue, setMarkdownValue] = useState('')
  const [resetTrigger, setResetTrigger] = useState(0)
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const initialConfig = {
    namespace: 'RichTextEditor',
    theme,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
    ],
    onError: (error: Error) => {
      console.error(error)
    },
  }

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS)
      setMarkdownValue(markdown)
    })
  }

  // Watch for form reset events
  useEffect(() => {
    const hiddenInput = hiddenInputRef.current
    if (!hiddenInput) return

    const form = hiddenInput.closest('form')
    if (form) {
      const handleReset = () => {
        setResetTrigger(prev => prev + 1)
        setMarkdownValue('')
      }
      form.addEventListener('reset', handleReset)
      return () => {
        form.removeEventListener('reset', handleReset)
      }
    }
  }, [])

  return (
    <div className={className}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <ToolbarPlugin />
          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="min-h-[100px] w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none prose prose-sm max-w-none"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="absolute top-3 left-4 text-gray-400 pointer-events-none">
                      {placeholder}
                    </div>
                  }
                />
              }
              placeholder={
                <div className="absolute top-3 left-4 text-gray-400 pointer-events-none">
                  {placeholder}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary as any}
            />
            <OnChangePlugin onChange={handleChange} />
            <HistoryPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <EditorResetPlugin resetTrigger={resetTrigger} />
            <ListPlugin />
          </div>
        </div>
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          value={markdownValue}
        />
      </LexicalComposer>
    </div>
  )
}
