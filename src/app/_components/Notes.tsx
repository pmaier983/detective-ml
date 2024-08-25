import { useCallback, useState } from "react"
import { useCaseStore } from "~/app/_state/caseStore"

export const Notes = () => {
  const [newNote, setNewNote] = useState("")
  const [isAddingNode, setIsAddingNote] = useState(false)
  const { notes, setNotes } = useCaseStore((state) => ({
    notes: state.notes,
    setNotes: state.setNotes,
  }))

  const submitNewNote = () => {
    // Don't add empty notes
    if (newNote.trim().length !== 0) {
      setNotes([...notes, newNote])
    }

    setNewNote("")
    setIsAddingNote(false)
  }

  const startAddingANewNote = () => {
    setIsAddingNote(true)
  }

  // Focus the textarea immediately after clicking the "Add note" button
  const newNodeTextareaRef = useCallback((node: HTMLTextAreaElement) => {
    node?.focus()
  }, [])

  return (
    <form
      className="flex flex-1 flex-col justify-between rounded-lg p-6 text-white"
      onSubmit={submitNewNote}
    >
      <div className="flex flex-1 flex-col overflow-hidden pb-2">
        <h4 className="self-start pb-2 text-lg font-bold">Case Notes</h4>
        <ul className="flex-1 list-inside list-disc space-y-2 overflow-y-auto text-sm">
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
      {isAddingNode ? (
        <textarea
          ref={newNodeTextareaRef}
          className="flex flex-1 border-[1px] border-white bg-inherit p-2"
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              submitNewNote()
            }
          }}
        />
      ) : (
        <button
          className="group flex justify-center gap-2 rounded-md border border-white p-4 text-sm"
          onClick={startAddingANewNote}
        >
          +
          <span className="group-hover:underline group-active:decoration-double">
            Add note
          </span>
        </button>
      )}
    </form>
  )
}
