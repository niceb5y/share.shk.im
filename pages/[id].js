import react, { Component } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import { DateTime } from 'luxon'
import fetch from 'isomorphic-unfetch'

class Download extends Component {
  static async getInitialProps({ query }) {
    const { id } = query
    let fetchError = false
    const data = await fetch(`https://share.shk.im/api/${id}`)
      .then(res => res.json())
      .catch(err => {
        fetchError = true
      })
    return { ...data, fetchError }
  }

  render() {
    return this.props.fetchError ? (
      <div>
        <Head>
          <title>🤔 - SHK/Share</title>
        </Head>
        <div className="block">
          <h2 className="display-3">🤔</h2>
          <p className="lead py-3">파일이 존재하지 않습니다.</p>
          <Link href="/">
            <a className="btn btn-outline-primary" role="button">
              메인으로 돌아가기
            </a>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <Head>
          <title>{decodeURI(this.props.filename)} - SHK/Share</title>
        </Head>
        <div className="block">
          <h2 className="display-3">{decodeURI(this.props.filename)}</h2>
          <p className="lead pt-3 text-muted">
            {DateTime.fromSeconds(this.props.date)
              .setLocale('ko')
              .toLocaleString(DateTime.DATETIME_SHORT)}{' '}
            · {this.props.size}
          </p>
          <p className="text-muted">SHA256: {this.props.hash}</p>
          <a
            href={`https://dl.shk.im/${this.props.id}/${this.props.filename}`}
            download={this.props.filename}
            className="btn btn-outline-primary btn"
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
