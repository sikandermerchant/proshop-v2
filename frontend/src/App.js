import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  const { userInfo } = useSelector(state => state.auth);  // ✅ Get userInfo from Redux store
  return (
    <>
      {/* ✅ Add `key` so Header & Outlet re-render when userInfo changes */}
      <Header key={userInfo ? userInfo._id : "guest"} />
      <main className='py-3'>
        <Container>
          <Outlet key={userInfo ? userInfo._id : "guest"} />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
    
  )
}

export default App