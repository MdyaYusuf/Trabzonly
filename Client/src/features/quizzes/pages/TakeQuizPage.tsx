import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import { TakeQuizHeader } from '../components/TakeQuizHeader'
import {
  TakeQuizProgress,
  type QuestionStatus,
} from '../components/TakeQuizProgress'
import {
  TakeQuizQuestionPanel,
  type TakeQuestionFeedback,
} from '../components/TakeQuizQuestionPanel'
import { TakeQuizSidebar } from '../components/TakeQuizSidebar'
import quizService from '../quizService'
import type { QuizTakeAnswerDto, QuizTakeDto, UserQuizResultResponseDto } from '../quizTypes'
import {
  QUIZ_SECONDS_PER_QUESTION,
  secondsToTimeSpanString,
  shuffleInPlace,
} from '../utils/quizFormat'

export type QuizResultLocationState = {
  result: UserQuizResultResponseDto
  quizTitle: string
  correctCount: number
  totalCount: number
}

type QuestionPhase = 'answering' | 'checking' | 'revealed'

export function TakeQuizPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const [quiz, setQuiz] = useState<QuizTakeDto | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState<QuizTakeAnswerDto[]>([])
  const [phase, setPhase] = useState<QuestionPhase>('answering')
  const [remainingSeconds, setRemainingSeconds] = useState(QUIZ_SECONDS_PER_QUESTION)
  const [feedbackByQuestion, setFeedbackByQuestion] = useState<
    Record<string, TakeQuestionFeedback>
  >({})
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const startedAtRef = useRef(Date.now())
  const resolveLockRef = useRef(false)
  const finishedRef = useRef(false)
  const selectedAnswersRef = useRef<Record<string, string>>({})
  const feedbackByQuestionRef = useRef<Record<string, TakeQuestionFeedback>>({})

  selectedAnswersRef.current = selectedAnswers
  feedbackByQuestionRef.current = feedbackByQuestion

  useEffect(() => {
    if (!isAuthenticated || !quizId) {
      return
    }

    let cancelled = false

    async function loadQuiz() {
      setIsLoading(true)
      setLoadError(false)

      const result = await quizService.getTake(quizId!)

      if (cancelled) {
        return
      }

      if (result.success && result.data && result.data.questions.length > 0) {
        const ordered = [...result.data.questions].sort((a, b) => a.sortOrder - b.sortOrder)
        setQuiz({ ...result.data, questions: ordered })
        startedAtRef.current = Date.now()
        finishedRef.current = false
        setCurrentIndex(0)
        setFeedbackByQuestion({})
        setSelectedAnswers({})
        toast.info('Quiz başladı. Bol şans!')
      } else {
        setQuiz(null)
        setLoadError(true)
      }

      setIsLoading(false)
    }

    void loadQuiz()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, quizId])

  const question = quiz?.questions[currentIndex] ?? null

  useEffect(() => {
    if (!question) {
      return
    }

    resolveLockRef.current = false
    setPhase('answering')
    setRemainingSeconds(QUIZ_SECONDS_PER_QUESTION)
    setShuffledOptions(shuffleInPlace([...question.answers]))
  }, [question?.id])

  useEffect(() => {
    if (phase !== 'answering' || !question) {
      return
    }

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
  }, [phase, question?.id])

  async function resolveAnswer(answerId: string | null) {
    if (!quiz || !question || resolveLockRef.current || finishedRef.current) {
      return
    }

    resolveLockRef.current = true
    setPhase('checking')

    const result = await quizService.checkAnswer({
      quizId: quiz.id,
      questionId: question.id,
      answerId,
    })

    if (!result.success || !result.data) {
      resolveLockRef.current = false
      setRemainingSeconds(QUIZ_SECONDS_PER_QUESTION)
      setPhase('answering')
      return
    }

    if (answerId) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [question.id]: answerId,
      }))
    }

    const feedback: TakeQuestionFeedback = {
      isCorrect: result.data.isCorrect,
      correctAnswerId: result.data.correctAnswerId,
      explanation: result.data.explanation,
      selectedAnswerId: answerId,
    }

    setFeedbackByQuestion((prev) => ({
      ...prev,
      [question.id]: feedback,
    }))
    setPhase('revealed')
  }

  useEffect(() => {
    if (phase !== 'answering' || remainingSeconds > 0) {
      return
    }

    void resolveAnswer(null)
  }, [phase, remainingSeconds])

  async function submitAndFinish(finalAnswers: Record<string, string>) {
    if (!quiz || finishedRef.current || isSubmitting) {
      return
    }

    finishedRef.current = true
    setIsSubmitting(true)

    const elapsedSeconds = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000),
    )

    const answers = Object.entries(finalAnswers).map(([questionId, answerId]) => ({
      questionId,
      answerId,
    }))

    const result = await quizService.submit({
      quizId: quiz.id,
      completionTime: secondsToTimeSpanString(elapsedSeconds),
      answers,
    })

    if (!result.success || !result.data) {
      finishedRef.current = false
      setIsSubmitting(false)
      return
    }

    const correctCount = Object.values(feedbackByQuestionRef.current).filter(
      (item) => item.isCorrect,
    ).length

    navigate(`/quizler/${quiz.id}/sonuc`, {
      replace: true,
      state: {
        result: result.data,
        quizTitle: quiz.title,
        correctCount,
        totalCount: quiz.questions.length,
      } satisfies QuizResultLocationState,
    })
  }

  function goNext() {
    if (!quiz || !question) {
      return
    }

    if (currentIndex >= quiz.questions.length - 1) {
      void submitAndFinish(selectedAnswersRef.current)
      return
    }

    setCurrentIndex((prev) => prev + 1)
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!quizId) {
    return <Navigate to="/quizler" replace />
  }

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <div className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
          <p className="font-body text-body-md text-on-surface-variant">Quiz yükleniyor...</p>
        </div>
      </main>
    )
  }

  if (loadError || !quiz || !question) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-space-md px-4 py-space-xl sm:px-6 lg:px-12">
          <p className="font-body text-body-md text-on-surface-variant">
            Quiz yüklenemedi veya artık aktif değil.
          </p>
          <button
            type="button"
            onClick={() => {
              navigate('/quizler')
            }}
            className="font-label w-fit bg-primary-container px-space-md py-space-sm text-label-md font-bold text-on-primary uppercase"
          >
            Quiz listesine dön
          </button>
        </div>
      </main>
    )
  }

  const statuses: QuestionStatus[] = quiz.questions.map((q, index) => {
    const feedback = feedbackByQuestion[q.id]

    if (feedback) {
      return feedback.isCorrect ? 'correct' : 'incorrect'
    }

    if (index === currentIndex) {
      return 'current'
    }

    return 'upcoming'
  })

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-md px-4 py-space-md sm:px-6 lg:px-12">
        <TakeQuizHeader
          title={quiz.title}
          categoryName={quiz.categoryName}
          questionCount={quiz.questions.length}
        />
        <TakeQuizProgress
          currentIndex={currentIndex}
          total={quiz.questions.length}
          statuses={statuses}
        />

        <div className="grid grid-cols-1 items-start gap-space-md lg:grid-cols-12 lg:gap-gutter">
          <div className="lg:col-span-8">
            <TakeQuizQuestionPanel
              questionNumber={currentIndex + 1}
              categoryLabel={quiz.categoryName}
              points={question.points}
              prompt={question.text}
              options={shuffledOptions}
              phase={phase}
              feedback={feedbackByQuestion[question.id] ?? null}
              remainingSeconds={remainingSeconds}
              onSelect={(optionId) => {
                void resolveAnswer(optionId)
              }}
              onNext={goNext}
              isLast={currentIndex === quiz.questions.length - 1}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="lg:col-span-4">
            <TakeQuizSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
