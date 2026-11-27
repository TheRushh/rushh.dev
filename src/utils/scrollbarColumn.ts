/**
 * Whether dot column `x` belongs to the dot-matrix scroll indicator.
 * Right-side columns are anchored to the last *fully visible* column: with
 * cols = ceil(width / spacing), the final column's center can sit past the
 * canvas edge when width isn't a multiple of spacing, clipping it.
 */
export const isScrollbarColumn = (x: number, width: number, isMobile: boolean, spacing: number) => {
  const lastVisible = Math.floor(width / spacing) - 1
  if (isMobile) return x === lastVisible
  return x <= 1 || x === lastVisible || x === lastVisible - 1
}
