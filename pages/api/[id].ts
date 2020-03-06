import * as AWS from 'aws-sdk/global'
import * as DynamoDB from 'aws-sdk/clients/dynamodb'
import { NextApiResponse, NextApiRequest } from 'next'

AWS.config.update({
  region: 'ap-northeast-2'
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const docClient = new DynamoDB.DocumentClient()

  var params = {
    TableName: 'shk-share',
    Key: {
      id: req.query.id
    }
  }

  try {
    const result = await docClient.get(params).promise()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        id: result.Item['id'],
        filename: result.Item['filename'],
        hash: result.Item['hash'],
        date: result.Item['date'],
        size: result.Item['size']
      })
    )
  } catch (err) {
    console.error(err)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
  }
}
