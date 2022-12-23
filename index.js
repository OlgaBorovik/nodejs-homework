const {listContacts, addContact, removeContact, getContactById} = require ("./contacts.js")

const invokeAction = async ({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const contacts = await listContacts()
            console.table(contacts);
            break;
        case "add":
            await addContact(name, email, phone)
            break;
        case "remove":
            await removeContact(id)
            console.log("removed")
            break;
        case "getById":
            const contact = await getContactById(id)
            if (!contact) {
                throw new Error (`Contact with id: ${id} not found`)
            }
            console.log(contact)
            break;
        
    }
}
// invokeAction({ action: "list" })
// invokeAction({ action: "getById", id: "5" })
// invokeAction({action: "remove", id: '3x1'})


//     "name": "Alex Goward",
//     "email": "Donec.elementum@scelerisque.net",
//     "phone": "(748) 206-7777"

invokeAction({action:"add", name: "Masha", email: "2@mail.com", phone:"222-22-22"})