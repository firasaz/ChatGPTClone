import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const callApi = async (
  endpoint,
  operation = 'GET',
  body = {},
  options = {}
) => {
  try {
    const reqOptions = {
      method: operation,
      headers: { 'Content-Type': 'application/json' },
      ...options,
    }
    if (operation !== 'GET') {
      reqOptions.body = body
    }
    console.log(reqOptions)
    const res = await fetch(endpoint, reqOptions)
    return res
  } catch (err) {
    console.error('Error in fetch request:', err)
    return 'something went wrong...'
  }
}
