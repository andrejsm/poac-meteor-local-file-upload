let { onCreated, events, helpers } = destructTemplate('body')

onCreated(function() {
    this.image = new ReactiveVar('')
})

events({

    'click button'(_, t) {
        let file = t.find('input').files[0]
        let reader = new FileReader
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            t.image.set(reader.result)
            Meteor.call('storeImage', reader.result, console.log.bind(console))
        }
    },

})

helpers({

    image() {
        return Template.instance().image.get()
    }

})
