import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TakeQuizHeader } from '../components/TakeQuizHeader'
import { TakeQuizProgress } from '../components/TakeQuizProgress'
import { TakeQuizQuestionPanel } from '../components/TakeQuizQuestionPanel'
import { TakeQuizSidebar } from '../components/TakeQuizSidebar'
import {
  buildQuizResultFromAnswers,
  getTakeQuizSession,
} from '../utils/takeQuizPlaceholders'
import type { QuizResultProfile } from '../utils/takeQuizTypes'

export type QuizResultLocationState = {
  result: QuizResultProfile
}

export function TakeQuizPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const session = getTakeQuizSession(quizId)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [remainingSeconds, setRemainingSeconds] = useState(session.timeLimitSeconds)
  const startedAtRef = useRef(Date.now())
  const finishedRef = useRef(false)

  const question = session.questions[currentIndex]
  const answeredIds = new Set(Object.keys(answers))

  function finishQuiz(finalAnswers: Record<string, string>) {
    if (finishedRef.current) {
      return
    }

    finishedRef.current = true
    const elapsedSeconds = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000),
    )
    const result = buildQuizResultFromAnswers(session, finalAnswers, elapsedSeconds)

    navigate(`/quizler/${session.id}/sonuc`, {
      replace: true,
      state: { result } satisfies QuizResultLocationState,
    })
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(id)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(id)
    }
  }, [])

  useEffect(() => {
    if (remainingSeconds > 0 || finishedRef.current) {
      return
    }

    finishQuiz(answers)
  }, [remainingSeconds, answers])

  function selectOption(optionId: string) {
    if (!question) {
      return
    }

    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionId,
    }))
  }

  function goPrevious() {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  function goNextOrFinish(nextAnswers: Record<string, string>) {
    if (currentIndex >= session.questions.length - 1) {
      finishQuiz(nextAnswers)
      return
    }

    setCurrentIndex((prev) => prev + 1)
  }

  function skipQuestion() {
    if (!question) {
      return
    }

    const nextAnswers = { ...answers }
    delete nextAnswers[question.id]
    setAnswers(nextAnswers)
    goNextOrFinish(nextAnswers)
  }

  function confirmAnswer() {
    goNextOrFinish(answers)
  }

  if (!question) {
    return null
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <TakeQuizHeader session={session} />
        <TakeQuizProgress
          currentIndex={currentIndex}
          total={session.questions.length}
          answeredIds={answeredIds}
          questionIds={session.questions.map((q) => q.id)}
          remainingSeconds={remainingSeconds}
          onJump={setCurrentIndex}
        />

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-8">
            <TakeQuizQuestionPanel
              question={question}
              selectedOptionId={answers[question.id]}
              isFirst={currentIndex === 0}
              isLast={currentIndex === session.questions.length - 1}
              onSelect={selectOption}
              onPrevious={goPrevious}
              onSkip={skipQuestion}
              onConfirm={confirmAnswer}
            />
          </div>
          <div className="lg:col-span-4">
            <TakeQuizSidebar session={session} question={question} />
          </div>
        </div>
      </div>
    </main>
  )
}
