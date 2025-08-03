import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API functions
export const authAPI = {
  register: async (data: { email: string; username: string; password: string }) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },
  login: async (data: { email: string; password: string }) => {
    // Convert to URL-encoded form data as expected by OAuth2PasswordRequestForm
    const formData = new URLSearchParams()
    formData.append('username', data.email) // Backend expects 'username' field
    formData.append('password', data.password)
    
    const response = await api.post('/auth/login', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },
  me: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

// Items API functions
export const itemsAPI = {
  getAll: async () => {
    const response = await api.get('/items/')
    return response.data
  },
  getById: async (id: number) => {
    const response = await api.get(`/items/${id}`)
    return response.data
  },
  create: async (data: { title: string; description?: string }) => {
    const response = await api.post('/items/', data)
    return response.data
  },
  update: async (id: number, data: { title?: string; description?: string }) => {
    const response = await api.put(`/items/${id}`, data)
    return response.data
  },
  delete: async (id: number) => {
    const response = await api.delete(`/items/${id}`)
    return response.data
  },
} 