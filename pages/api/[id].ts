import * as AWS from 'aws-sdk/global'
import * as DynamoDB from 'aws-sdk/clients/dynamodb'
import { NextApiResponse, NextApiRequest } from 'next'

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  },
  region: 'ap-northeast-2'
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const docClient = new DynamoDB.DocumentClient()

  const params = {
    TableName: 'shk-share',
    Key: {
      id: req.query.id
    }
  }

  try {
    const result = await docClient.get(params).promise()
    if (result.Item) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify(result.Item)
      )
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end('Not Found')
    }
  } catch (err) {
    console.error(err)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
  }
}

export default handler