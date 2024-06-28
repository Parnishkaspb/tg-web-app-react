import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import ProductList from './components/ProductList/ProductList';
import CarNumberList from './components/CarNumberList/CarNumberList';
import FormNumberTemlate from './components/FormNumberTemlate/FormNumberTemlate';
import Form from './components/Form/Form';


function App() {
  const { tg, onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, [])



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
        <Route path={'all_number_template'} element={<CarNumberList />} />
        <Route path={'add_new_number_teplate'} element={<FormNumberTemlate />} />
      </Routes>
    </div>
  );
}

export default App;
