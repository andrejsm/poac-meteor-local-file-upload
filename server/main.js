let fs = Npm.require('fs')
let path = Npm.require('path')

Meteor.methods({

    storeImage(dataUri) {
        let buff = new Buffer(dataUri.split(',')[1], 'base64')
        let stream = fs.createWriteStream(path.join(process.env.PWD, 'uploads', 'filename.png'))
        stream.write(buff)
        stream.end()

        return dataUri
    },
})

Picker.route('(.*)', (params, req, res, next) => {
    let pathname = req._parsedUrl.path
    if (pathname.slice(0, 7) === '/files/') {
        let filename = path.join(process.env.PWD, 'uploads', pathname.slice(7))
        if (fs.existsSync(filename)) {
            res.writeHead(200, {
                'Content-Type': 'image/png',
            })

            let readStream = fs.createReadStream(filename)
            readStream.on('data', (data) => res.write(data))
            readStream.on('end', () => response.end())
        }
        else {
            res.writeHead(404, 'meh, no such a file')
            res.end(filename)
        }
    }
    else {
        next()
    }
})
