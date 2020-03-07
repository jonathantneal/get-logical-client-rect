/** Return the size and position of an element relative to the viewport and the flow of content. */
export default function getLogicalClientRect(element) {
	var props = ['left', 'top', 'right', 'bottom', 'width', 'height'] // physical properties
	var rects = element.getBoundingClientRect()
	var style = getComputedStyle(element)
	var isDirectionRTL = /^r/.test(style.direction)           // whether content flow is right to left
	var isWriteModeVrt = /^[hlr]/.test(style['writing-mode']) // whether content flow is vertical
	var isWriteModeInv = /-[br]/.test(style['writing-mode'])  // whether content flow is inverted
	var startI = isWriteModeVrt ? isDirectionRTL ? 2 : 0 : isDirectionRTL ? 3 : 1 // physical property index, starting parallel to content flow
	var startB = isWriteModeVrt ? isWriteModeInv ? 3 : 1 : isWriteModeInv ? 2 : 0 // physical property index, starting perpendicular to content flow
	return {
		inlineSize: rects[props[isWriteModeVrt ? 4 : 5]],       // size, parallel to content flow
		blockSize: rects[props[isWriteModeVrt ? 5 : 4]],        // size, perpendicular to content flow
		inlineStart: rects[props[startI]],                      // position, starting parallel to content flow
		blockStart: rects[props[startB]],                       // position, starting perpendicular to content flow
		inlineEnd: rects[props[(startI + 2) % 4]],              // position, ending parallel to content flow
		blockEnd: rects[props[(startB + 2) % 4]],               // position, ending perpendicular to content flow
		startX: rects[props[isWriteModeVrt ? startI : startB]], // position, starting horizontal to content flow
		startY: rects[props[isWriteModeVrt ? startB : startI]]  // position, starting vertical to content flow
	}
}
