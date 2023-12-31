import type { NextApiRequest, NextApiResponse } from 'next'
 
const fs = require('fs');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentDataStr = fs.readFileSync('./db.json', 'utf-8', handleError)
  console.log("current data: ")
  console.log(currentDataStr)
  const currentData = JSON.parse(currentDataStr)

  console.log("req: " + req)
  console.log("req.body: " + req.body)
  const newData = [...currentData, {title: req.body}]
  const newDataStr = JSON.stringify(newData)

  res.status(200).json(newData)
  fs.writeFileSync('./db.json', newDataStr, error => {
    if (error) {
      console.error(error)
      return
    }
  })
}

function handleError(error) {
  if (error) {
    console.error(error)
  }
}