import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Meta from './components/Meta';
function App() {
  return (
    <>
      <Meta />
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer position='top-right' closeOnClick />
    </>
  )
}

export default App
