import { RouterProvider } from 'react-router'
import { router } from './routes/routes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'
import GlobalModel from './component/GlobalModel'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster/>
        <GlobalModel/>
      </Provider>
    </>
  )



}

export default App
