import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from './redux/actions/user';
import AccountPage from './pages/AccountPage';
import AddNewPlacesPage from './pages/AddNewPlacesPage';
import PlacePage from './pages/PlacePage';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/account/:subpage' element = {<AccountPage />} />
        <Route path='/account/:subpage/:action' element={<AddNewPlacesPage />} />
        <Route path = '/place/:id' element={<PlacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
