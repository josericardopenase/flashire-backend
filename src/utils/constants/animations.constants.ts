import { MotionProps } from "framer-motion"

export const animationBounceButton: MotionProps = {
	whileTap: { scale: 0.5 },
	whileHover: { scale: 1.02 },
}

export const animationAppareDelay: (delay: number) => MotionProps = (delay) => ({
	transition: { delay: delay },
	initial: { scale: 0.6, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
})

export const animationFade: MotionProps = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.4 },
	exit: { opacity: 0 },
}

export const animationUp: MotionProps = {
	initial: { y: 400 },
	animate: { y: 0 },
	exit: { opacity: 0, y: 400 },
}

export const mixAnimations = (animations: MotionProps[]): MotionProps => animations.reduce((r, c) => Object.assign(r, c), {})
