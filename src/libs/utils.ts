export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15)
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}