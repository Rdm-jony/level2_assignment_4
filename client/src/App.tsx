import { RouterProvider } from 'react-router'
import { router } from './routes/routes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/ui/theme-provider'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster position='top-center' />
        </Provider>
      </ThemeProvider>

    </>
  )



}

export default App
