import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './loading'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'business'
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalarticles: 0
    };
    document.title = 'NewsMonkey - ' + this.capitalizeFirstLetter(this.props.category);
  }
  async componentDidMount() {
    this.updatePage();
  }
  async updatePage() {
    this.props.setProgress(10);
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles, loading: false, totalarticles: parsedData.totalResults });
    this.props.setProgress(100);
  }
  // handleNext = async () => {
  //   this.setState({page: this.state.page+1})
  //   this.updatePage(this.state.page+1);
  // }
  // handlePrev = async () => {
  //   this.setState({page: this.state.page-1})
  //   this.updatePage(this.state.page-1);
  // }
  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), loading: false, totalarticles: parsedData.totalResults });
  }
  render() {
    return (
      <>
        <h2 className='text-center my-2'>News-Monkey {this.capitalizeFirstLetter(this.props.category)} Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchData}
          hasMore={this.state.articles.length < this.state.totalarticles} loader={<Spinner />}>
          <div className='container my-3'>
            <div className="row">
              {this.state.articles.map((element) => {
                return (<div className="col-md-4 my-1" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                </div>)
              }
              )}
            </div>
          </div>
        </InfiniteScroll>
        {/* {!this.state.loading && <div className="container d-flex justify-content-between mt-4">
          <div className={`btn btn-dark btn-md ${this.state.page <= 1 ? 'disabled' : ''}`} onClick={this.handlePrev}>&larr; Page {this.state.page <= 1 ? "" : this.state.page - 1}</div>
          <p>{this.state.page}</p>
          <div className={`btn btn-dark btn-md ${this.state.page + 1 > Math.ceil(this.state.totalarticles / (this.props.pagesize)) ? "disabled" : ""}`} onClick={this.handleNext}>Page {this.state.page + 1 >Math.ceil(this.state.totalarticles / (this.props.pagesize)) ? "" : this.state.page + 1} &rarr;</div>
        </div>} */}
      </>
    )
  }
}

export default News


