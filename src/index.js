import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './component/Chat';
import Dene from './component/classChart'; 
import HomePage from './component/HomePage'; 
import Layout from './component/Layout';
import Vector from './component/Vector';
import Watch from './component/Watch'; 
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="terminal" element={<Dene />} />
          <Route path="watch" element={<Watch />} />
          <Route path="chat" element={<Chat />} />
          <Route path="vector" element={<Vector />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);