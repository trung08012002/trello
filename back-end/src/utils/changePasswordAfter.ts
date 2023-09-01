function changedPasswordAfter(jwtTimestamp: number | undefined, password_changed_at?: Date): boolean {
  if (password_changed_at) {
    const changedTimestamp = password_changed_at.getTime() > (jwtTimestamp ?? 0)
    return changedTimestamp
  }
  return false
}
export default changedPasswordAfter
