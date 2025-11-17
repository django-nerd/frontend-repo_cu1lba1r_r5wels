import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // Parse hash from OAuth callback
    const hash = window.location.hash.replace(/^#/, '')
    if (hash) {
      const params = new URLSearchParams(hash)
      if (params.get('error')) {
        setError(decodeURIComponent(params.get('error') || 'Login failed'))
      }
      if (params.get('logged_in') === '1') {
        const name = decodeURIComponent(params.get('name') || '')
        const email = decodeURIComponent(params.get('email') || '')
        setUser({ name, email })
      }
      // Clean up hash from URL
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, document.title, window.location.pathname)
      }
    }
  }, [])

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/login`
  }

  const handleLogout = () => {
    setUser(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {!user ? (
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303C33.602,31.674,29.223,35,24,35c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.64,4.053,28.985,2,24,2C11.85,2,2,11.85,2,24s9.85,22,22,22 s22-9.85,22-22C46,22.659,45.227,21.293,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C33.64,4.053,28.985,2,24,2C16.318,2,9.656,6.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,46c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,37.091,26.715,38,24,38 c-5.176,0-9.543-3.317-11.287-7.946l-6.536,5.036C9.495,41.556,16.227,46,24,46z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-1.592,3.674-5.265,6-9.303,6c-5.176,0-9.543-3.317-11.287-7.946 l-6.536,5.036C9.495,41.556,16.227,46,24,46c7.732,0,22-9.85,22-22C46,22.659,45.227,21.293,43.611,20.083z"/>
            </svg>
            Continue with Google
          </button>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
              <p className="text-sm text-gray-600">Signed in as</p>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-700">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-800 hover:bg-black text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Log out
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/test" className="text-sm text-blue-600 hover:underline">Check backend status</a>
        </div>
      </div>
    </div>
  )
}

export default App
