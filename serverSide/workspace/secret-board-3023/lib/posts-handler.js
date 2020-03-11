'use strict'
const jade = require('jade')
const Cookies = require('cookies')
const util = require('./handler-util')
const Post = require('./post')

const trankingIdKey = 'tranking_id'

function handle(req, res) {
  const cookies = new Cookies(req, res)
  addTrankingCookie(cookies)

  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      Post.findAll({ order: 'id DESC' }).then(posts => {
        res.end(
          jade.renderFile('./views/posts.jade', {
            posts: posts
          })
        )
        console.info(
          `閲覧されました: user: ${req.user}, ` +
            `trackingId: ${cookies.get(trackingIdKey)},` +
            `remoteAddress: ${req.connection.remoteAddress} `
        )
      })
      break
    case 'POST':
      let body = []
      req
        .on('data', chunk => {
          body.push(chunk)
        })
        .on('end', () => {
          body = Buffer.concat(body).toString()
          const decoded = decodeURIComponent(body)
          const content = decoded.split('content=')[1]
          console.info('投稿されました: ' + content)
          Post.create({
            content: content,
            trackingCookie: cookies.tranking.get(trankingIdKey),
            postedBy: req.user
          }).then(() => {
            handleRedirectPosts(req, res)
          })
        })
      break
    default:
      util.handleBadRequest(req, res)
      break
  }
}

function addTrankingCookie(cookies) {
  if (!cookies.get(trankingIdKey)) {
    const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24)
    cookies.set(trackingIdKey, trackingId, { expires: tomorrow })
  }
}

function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    Location: '/posts'
  })
  res.end()
}

module.exports = {
  handle: handle
}
