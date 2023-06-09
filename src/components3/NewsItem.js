import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,publishedAt,source}=this.props;
    return (
      <div>
            <div className="card">
              <div style={{display:'flex',justifyContent: 'end',position:'absolute',right:0}}>
                <span className="badge rounded-pill bg-danger">{source}</span>
              </div>
                <a rel="noreferrer" target="_blank" href={newsUrl}><img height="161" width="287" className="card-img-top" src={imageUrl?imageUrl:"https://www.thestatesman.com/wp-content/uploads/2023/02/whatsapp-thestatesman.jpg"} alt="news"/></a>
                <div className="card-body">
                  <h5 className="card-title">{title?title.slice(0,45).trim():""}{title!==null && title.length>45?"...":""}</h5>
                  <p className="card-text">{description?description.slice(0,50).trim():""}{description && description.length>45?"...":""}</p>
                  <p className="card-text"><small className="text-muted">Published by {author?author:"Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                  <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
