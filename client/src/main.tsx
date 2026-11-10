import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider} from "react-router"
import './App/Layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './App/Router/Routes';
import { store, StoreContext } from './Lib/stores/store';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 3. Added the required value prop to your context */}
    <StoreContext.Provider value={store}> 
      <QueryClientProvider client={queryClient}>
        <ToastContainer position='bottom-right'
        hideProgressBar theme='colored'
        aria-label={undefined}>

        </ToastContainer>
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreContext.Provider>
  </StrictMode>,
)