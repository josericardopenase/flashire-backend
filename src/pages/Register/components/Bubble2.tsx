import { Box } from "@chakra-ui/react"
import React from "react"

export default function Bubble2() {
	const size = 200

	return (
		<Box zIndex="-2" width={size} height={size} right={-size / 4} bottom={-size / 3} borderRadius="50%" position="absolute">
			<svg width="244" viewBox="0 0 694 507" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M605.555 66.9998C449.968 -34.287 304.53 -7.57079 213.5 67C62.2345 190.915 -115.113 408.99 99.746 482.262C314.605 555.534 516.753 442.659 599.848 374.51C677.025 302.533 761.143 168.287 605.555 66.9998Z"
					fill="black"
					opacity="0.1"
				/>
			</svg>
		</Box>
	)
}
