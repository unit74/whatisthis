import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebMain from '../src/pages/WebMain/WebMain';
import Header from '../src/component/Header/Header';
// import Custom from '../src/customcomponent/customReceiveModal/CustomreceiveModal';
import List from '../src/pages/ReceivedList/ReceivedList';
import ResultList from '../src/pages/ResultList/ResultList';
import Mypage from '../src/pages/Mypage/Mypage';
import Request from '../src/component/calendar/calendar';
import Mypass from '../src/component/Inmypage/Mypassword/Mypassword';

// import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <div>
      <Router basename='/webmain'>

        <Routes>
          <Route path='/' element={[<Header/>, <WebMain/>]}/>
          {/* <Route path='/WebMain/Custom' element={[<Custom/>]}/> */}
          <Route path='/list' element={[<Header/>, <List/>]}/>
          <Route path='/resultlist' element={[<Header/>, <ResultList/>]}/>
          <Route path='/mypage' element={[<Header/>, <Mypage/>]}/>
          <Route path='/request' element={[<Header/>, <Request/>]}/>
          <Route path='/pass' element={[<Header/>, <Mypass/>]}/>

          {/* <Route path="/CreateRoomModal" element={<PrivateRoute authenticated={access} component={<CreateRoomModal/>} />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;