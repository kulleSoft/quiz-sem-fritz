import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const quizButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-lg font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform-gpu hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        primary: "quiz-gradient-orange text-quiz-navy quiz-shadow-glow hover:opacity-90",
        secondary: "quiz-gradient-blue text-white hover:opacity-90",
        outline: "border-2 border-quiz-orange text-quiz-orange bg-transparent hover:quiz-gradient-orange hover:text-quiz-navy",
      },
      size: {
        default: "h-14 px-8 py-3",
        lg: "h-16 px-10 py-4 text-xl",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface QuizButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof quizButtonVariants> {
  asChild?: boolean
}

const QuizButton = React.forwardRef<HTMLButtonElement, QuizButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(quizButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
QuizButton.displayName = "QuizButton"

export { QuizButton, quizButtonVariants }