import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './loading'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalarticles, setTotalarticles] = useState(0);

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  useEffect(() => {
    document.title = 'NewsMonkey - ' + capitalizeFirstLetter(props.category);
    updatePage();
    // eslint-disable-next-line
  }, []);

  const updatePage = async () => {
    setLoading(true);
    props.setProgress(10);
    setPage(page + 1);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalarticles(parsedData.totalResults);
    props.setProgress(100);
  }
  // handleNext = async () => {
  //   this.setState({page: page+1})
  //   this.updatePage(page+1);
  // }
  // handlePrev = async () => {
  //   this.setState({page: page-1})
  //   this.updatePage(page-1);
  const fetchData = async () => {
    setLoading(true);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pagesize}`);
    setPage(page + 1);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
    setTotalarticles(parsedData.totalResults);
  }
  return (
    <>
      <h2 className='text-center my-2'>News-Monkey {capitalizeFirstLetter(props.category)} Top Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll dataLength={articles.length} next={fetchData}
        hasMore={articles.length < totalarticles} loader={loading && <Spinner />}>
        <div className='container my-3'>
          <div className="row">
            {articles.map((element) => {
              return (<div className="col-md-4 my-1" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
              </div>)
            }
            )}
          </div>
        </div>
      </InfiniteScroll>
      {/* {!loading && <div className="container d-flex justify-content-between mt-4">
          <div className={`btn btn-dark btn-md ${page <= 1 ? 'disabled' : ''}`} onClick={this.handlePrev}>&larr; Page {page <= 1 ? "" : page - 1}</div>
          <p>{page}</p>
          <div className={`btn btn-dark btn-md ${page + 1 > Math.ceil(totalarticles / (props.pagesize)) ? "disabled" : ""}`} onClick={this.handleNext}>Page {page + 1 >Math.ceil(totalarticles / (props.pagesize)) ? "" : page + 1} &rarr;</div>
        </div>} */}
    </>
  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'business'
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News


