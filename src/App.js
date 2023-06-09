import React,{useState} from 'react'
import Navbar from './components2/Navbar'
import News from './components2/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress]=useState(0);
  let pageSize = 6;
  let apiKey=process.env.REACT_APP_NEWS_API_KEY;
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color='#a83242' height='3px' progress={progress} />
          <Routes>
            <Route exact path="/" element={<News key="/" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"general"} country="in" />} />
            <Route exact path="/business" element={<News key="/business" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"business"} country="in" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"entertainment"} country="in" />} />
            <Route exact path="/general" element={<News key="general" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"general"} country="in" />} />
            <Route exact path="/health" element={<News key="health" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"health"} country="in" />} />
            <Route exact path="/science" element={<News key="science" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"science"} country="in" />} />
            <Route exact path="/sports" element={<News key="sports" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"sports"} country="in" />} />
            <Route exact path="/technology" element={<News key="technology" setProgress={setProgress} apiKey={apiKey} pagesize={pageSize} category={"technology"} country="in" />} />
          </Routes>
        </Router>
      </div>
    )
}

export default App;