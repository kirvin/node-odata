should = require('should')
request = require('supertest')
odata = require('../.')
support = require('./support')

bookSchema =
  title: String

conn = 'mongodb://localhost/odata-test'

describe 'options.maxTop', ->

  it 'should work', (done) ->
    server = odata(conn)
    server.set 'maxTop', 1
    server.register
      url: 'book'
      model: bookSchema
    app = server._app
    support conn, (books) ->
      request(app)
        .get("/odata/book?$top=10")
        .end (err, res) ->
          return done(err)  if(err)
          res.body.value.length.should.be.equal(1)
          done()

  describe 'global-limit and query-limit', ->
    it 'should use global-limit if it is minimum', (done) ->
      server = odata(conn)
      server.set 'maxTop', 1
      server.register
        url: 'book'
        model: bookSchema
      app = server._app
      support conn, (books) ->
        request(app)
          .get("/odata/book?$top=2")
          .end (err, res) ->
            return done(err)  if(err)
            res.body.value.length.should.be.equal(1)
            done()
    it 'should use query-limit if it is minimum', (done) ->
      conn = 'mongodb://localhost/odata-test'
      server = odata(conn)
      server.set 'maxTop', 2
      server.register
        url: 'book'
        model: bookSchema
      app = server._app
      support conn, (books) ->
        request(app)
          .get("/odata/book?$top=1")
          .end (err, res) ->
            return done(err)  if(err)
            res.body.value.length.should.be.equal(1)
            done()

  describe 'query-limit and resource-limit', ->
    it 'should use global-limit if it is minimum', (done) ->
      server = odata(conn)
      server.register
        url: 'book'
        model: bookSchema
        options:
          maxTop: 2
      app = server._app
      support conn, (books) ->
        request(app)
          .get("/odata/book?$top=1")
          .end (err, res) ->
            return done(err)  if(err)
            res.body.value.length.should.be.equal(1)
            done()
    it 'should use query-limit if it is minimum', (done) ->
      conn = 'mongodb://localhost/odata-test'
      server = odata(conn)
      server.register
        url: 'book'
        model: bookSchema
        options:
          maxTop: 1
      app = server._app
      support conn, (books) ->
        request(app)
          .get("/odata/book?$top=2")
          .end (err, res) ->
            return done(err)  if(err)
            res.body.value.length.should.be.equal(1)
            done()
