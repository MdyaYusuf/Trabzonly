import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostDetailArticle } from '../components/PostDetailArticle'
import { PostDetailBreadcrumb } from '../components/PostDetailBreadcrumb'
import { PostDetailComments } from '../components/PostDetailComments'
import { PostDetailHeader } from '../components/PostDetailHeader'
import { PostDetailSidebar } from '../components/PostDetailSidebar'
import {
  defaultPostDetail,
  postDetailById,
} from '../utils/postDetailPlaceholders'

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>()
  const post = postDetailById[postId ?? ''] ?? defaultPostDetail
  const [textScale, setTextScale] = useState(1)

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PostDetailBreadcrumb post={post} />

      <div className="w-full bg-background py-space-lg">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <PostDetailHeader
            post={post}
            textScale={textScale}
            onTextScaleChange={setTextScale}
          />

          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
            <article className="flex flex-col gap-space-lg lg:col-span-8">
              <PostDetailArticle post={post} textScale={textScale} />
              <PostDetailComments post={post} />
            </article>
            <PostDetailSidebar post={post} />
          </div>
        </div>
      </div>
    </main>
  )
}
