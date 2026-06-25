import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import Analytics from './pages/Analytics'
import Budgets from './pages/Budgets'
import Transactions from './pages/Transactions'
import Settings from './pages/Settings'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/add' element={<AddTransaction />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/budgets' element={<Budgets />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App