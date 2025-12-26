'use client'

import { createPost } from './actions'
import { useFormStatus } from 'react-dom'
import { useRef } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded transition-colors self-end"
    >
      {pending ? 'Publishing...' : 'Publish Post'}
    </button>
  )
}

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    await createPost(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        className="p-3 rounded bg-zinc-800 border border-zinc-700 focus:border-purple-500 outline-none transition-colors"
        required
      />
      <textarea
        name="content"
        placeholder="Write something..."
        className="p-3 rounded bg-zinc-800 border border-zinc-700 focus:border-purple-500 outline-none transition-colors min-h-[100px]"
      />
      <SubmitButton />
    </form>
  )
}
