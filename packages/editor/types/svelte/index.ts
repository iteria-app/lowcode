const world = '';

class Box {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number

  constructor(top: number, left: number, width: number, height: number) {
    this.top = top
    this.left = left
    this.width = width
    this.height = height

    this.right = left + width
    this.bottom = top + height
  }
}

export function elementBoundingBox(element: HTMLElement): Box {
  const styles = getComputedStyle(element)
  const margin = {
    top: Math.max(parseInt(styles.marginTop), 0),
    right: Math.max(parseInt(styles.marginRight), 0),
    bottom: Math.max(parseInt(styles.marginBottom), 0),
    left: Math.max(parseInt(styles.marginLeft), 0)
  }

  const box = new Box(
    element.offsetTop - margin.top,
    element.offsetLeft - margin.left,
    element.offsetWidth + margin.right + margin.left,
    element.offsetHeight + margin.top + margin.bottom,
  )

  let parent = element
  while (
    (parent =
      parent.offsetParent as HTMLElement || parent.ownerDocument?.defaultView?.frameElement as HTMLElement)
  ) {
    box.top += parent.offsetTop
    box.left += parent.offsetLeft
  }

  parent = element
  while (
    (parent =
      parent.parentElement as HTMLElement || parent?.ownerDocument?.defaultView?.frameElement as HTMLElement)
  ) {
    box.top -= parent.scrollTop
    box.left -= parent.scrollLeft
  }

  return box
}
