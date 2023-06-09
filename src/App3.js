import React, { Component } from 'react'
import Navbar from './components3/Navbar'
import News from './components3/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state={progress: 0}
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  pageSize = 6;
  apiKey=process.env.REACT_APP_NEWS_API_KEY;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color='#a83242' height='3px' progress={this.state.progress} />
          <Routes>
            <Route exact path="/" element={<News key="/" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"general"} country="in" />} />
            <Route exact path="/business" element={<News key="/business" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"business"} country="in" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"entertainment"} country="in" />} />
            <Route exact path="/general" element={<News key="general" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"general"} country="in" />} />
            <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"health"} country="in" />} />
            <Route exact path="/science" element={<News key="science" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"science"} country="in" />} />
            <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"sports"} country="in" />} />
            <Route exact path="/technology" element={<News key="technology" setProgress={this.setProgress} apiKey={this.apiKey} pagesize={this.pageSize} category={"technology"} country="in" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

