const { listContacts, addContact, removeContact, getContactById } = require("./contacts.js")
const { Command} = require("commander")

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

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
            break;
        case "get":
            const contact = await getContactById(id)
            if (!contact) {
                throw new Error (`Contact with id: ${id} not found`)
            }
            console.log(contact)
            break;
         default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv)



