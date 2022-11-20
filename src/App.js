import logo from './logo.svg';
import './App.css';
import { React, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom'
import Routes from './routes/Routes'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}>
      <div className='mainapp'>
          <Switch>
            <Route path="/" component={Routes} />
          </Switch>
        </div>
      </Suspense>
    </>
  )
}

export default App;
