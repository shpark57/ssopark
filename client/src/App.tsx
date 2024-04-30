
import './App.css';

import { LoginProvider} from './contexts/login';


//비로그인 접근가능
import Login from './pages/user/login/defaultLogin/Login';      //로그인화면
import SignUp from './pages/user/login/defaultLogin/SignUp';    //회원가입 화면


//로그인해야만 접근가능.
import Topbar from './components/topbar/Topbar';                //탑바
import Sidebar from './components/sidebar/Sidebar';             //사이드바
import DagAndDrop from './pages/dragAndDrop/DragAndDrop';  //드래그앤드랍 샘플
import Home from './pages/home/Home';                           //홈
import UserList from './pages/user/list/UserList';              //유저 테이블  
import UserModify from './pages/user/modify/UserModify';        //유저 정보 수정
import MoviesList from './pages/movies/list/MoviesList';        //영화 리스트
import MovieAdd from './pages/movies/add/MovieAdd';           //영화 추가
import MoviesView from  './pages/movies/view/MoviesView';     //영화 뷰
import ProductsList from  './pages/producrs/list/ProductsList';     //상품 리스트
import ProductsAdd from  './pages/producrs/add/ProductAdd';     //상품 상품 등록
import ProductsView from  './pages/producrs/view/ProductsView';   //상품 상품 view
import ProductsModify from './pages/producrs/modify/ProductsModify';   //상품 상품 수정

import Sample from './pages/sample/Sample'

import {BrowserRouter as Router, Routes, Route  } from 'react-router-dom'

import GlobalModal from "./components/modal/GlobalModal";
import CartList from "./pages/cart/list/CartList";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import OrderAdd from "./pages/order/add/OrderAdd";
import CartOrderAdd from './pages/order/add/CartOrderAdd';
import Payment from "./pages/payment/Payment";
import OrderList from "./pages/order/list/OrderList";


function App() {


  //sessionStorage를 이용한 로그인처리
  // loggedIn 가 true 면 정상 페이지들을 보여주고
  // loggedIn 가 false 면 로그인 회원가입만 표시
  const loggedIn = Boolean(window.sessionStorage.getItem('loggedIn')) //로그인정보 세션스토리지에 저장

  return (
    <LoginProvider>
    <GlobalModal />
        <Router>
          <Topbar />
          <div className="container">
            <Routes>
              <Route path="/" element={ <Home/>}/>
              <Route path="/moviesList" element={<MoviesList/>}/>
              <Route path="/movieAdd" element={<MovieAdd/>}/>
              <Route path="/dragAndDrop" element={<DagAndDrop/>}/>
              <Route path="/moviesView/:id" element={ <MoviesView/> }/>
              <Route path="/ProductsList" element={ <ProductsList/> }/>
              <Route path="/ProductsAdd" element={ <ProductsAdd/> }/>
              <Route path="/ProductsView/:id" element={ <ProductsView/> }/>
              <Route path="/ProductsModify/:id" element={ <ProductsModify/> }/>
              <Route path="/sample" element={ <Sample/> }/>
              <Route path="/users" element={<UserList/>}/>
              <Route path="/carts" element={<CartList/>}/>
              <Route path="/userModify"     element={ <UserModify/> }/>
              <Route path="/login" element={ <Login/> }/>
              <Route path="/signUp" element={ <SignUp/> }/>
              <Route path="/orderAdd" element={ <OrderAdd/> }/>
              <Route path="/cartOrderAdd" element={ <CartOrderAdd/> }/>
              <Route path="/payment" element={ <Payment/> }/>
              <Route path="/orderList" element={<OrderList/>}/>


            </Routes>
          </div>

          <Footer />
        </Router>
    </LoginProvider>
  );
}

export default App;
