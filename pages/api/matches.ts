import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var matchesStr = fs.readFileSync('./db.json', 
      'utf-8').toString();
  if (!matchesStr) {
    matchesStr = '[]'
  }
  const matches = JSON.parse(matchesStr)
  console.log(matches)
  res.status(200).json(matches)
}