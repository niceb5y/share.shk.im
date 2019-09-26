import react, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { DateTime } from 'luxon'

class Download extends Component {
  static async getInitialProps({ query }) {
    const { id } = query
    let fetchError = false
    const data = await fetch(`https://api.shk.im/share/${id}`)
      .then(res => res.json())
      .catch(err => {
        fetchError = true
      })
    return { ...data, fetchError }
  }

  render() {
    return this.props.fetchError ? (
      <div>
        <div className="block">
          <h2 className="display-3">🤔</h2>
          <p className="lead py-3">에러가 발생했습니다.</p>
          <Link href="/">
            <a className="btn btn-outline-primary" role="button">
              메인으로 돌아가기
            </a>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <div className="block">
          <h2 className="display-3">{this.props.filename}</h2>
          <p className="lead pt-3 text-muted">
            {DateTime.fromSeconds(this.props.date)
              .setLocale('ko')
              .toLocaleString(DateTime.DATETIME_SHORT)}
            <br />
            <small>sha256: {this.props.hash}</small>
          </p>
          <a
            href={`https://dl.shk.im/${this.props.id}/${this.props.filename}`}
            download={this.props.filename}
            className="btn btn-outline-primary"
            role="button"
          >
            다운로드
          </a>
        </div>
      </div>
    )
  }
}

export default Download
