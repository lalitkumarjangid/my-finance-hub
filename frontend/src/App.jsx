// import React from 'react';
// import {Routes, Route, BrowserRouter} from "react-router-dom"
// import SigninPage from './Pages/signinPage';
// import "./index.css"
// import Dashboard from './Pages/dashboard';
// import SendMoney from './Pages/sendMoney';
// import SignupPage from './Pages/signupPage';



// function App() {
//   return (
//     <div>
//        {/* <BrowserRouter>
//         <Routes>
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/signin" element={<SigninPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/send" element={<SendMoney />} />
//         </Routes>
//       </BrowserRouter> */}
//       <h1 className= " text-3xl font-bold text-red-500 ">Hi</h1>
//     </div>
//   )
// }
// // import SigninPage from './Pages/signinPage';
// export default App;

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SigninPage from './Pages/signinPage';
import Dashboard from './Pages/dashboard';
import SendMoney from './Pages/sendMoney';
import SignupPage from './Pages/signupPage';
import './index.css'; // Import Tailwind CSS here
import { Index } from './Pages/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/" element={<Index />} />
        {/* Move your h1 inside the Routes component */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

