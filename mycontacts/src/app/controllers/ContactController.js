
const { response } = require('express');
const ContactsRepository = require('../repositories/ContactsRepository')

class ContactController {
    async index (request, response){
        const {orderBy} = request.query;
        const contacts = await ContactsRepository.findAll(orderBy);

        response.json(contacts)
    }

    async show(request, response){
        const { id } = request.params;

        const contact = await ContactsRepository.findById(id)

        if(!contact){

            return response.status(400).json({erro: 'User not found'});
        }

        response.json(contact)
    }

    async store(request, response){
        const {name, email, phone, category_id} = request.body
        if(!name){
            return response.status(400).json({erro: "Name is required"})
        }
        const contactExists = await ContactsRepository.findByEmail(email);
        if(contactExists){
            return response.status(400).json({erro: "This e-mail is alredy in use"})
        }

        const contact = await ContactsRepository.create({
            name, email, phone, category_id
        });
        return response.json(contact)
    }

    async update(request, response){
        const { id } = request.params

        const {name, email, phone, category_id} = request.body

        const contactExists = ContactsRepository.findById(id);

        if(!contactExists){
            return response.status(404).json({erro:'User not found'})
        }
        if(!name){
            return response.status(400).json({erro: "Name is required"})
        }
        const contactByEmail = await ContactsRepository.findByEmail(email);

        if(contactByEmail && contactByEmail.id != id ){
            return response.status(400).json({erro: "This e-mail is alredy in use"})
        }

        const contact = await ContactsRepository.update(id, {
            name, email, phone, category_id
        })

        response.json(contact)

    }

    async delete(request, response){
        const { id } = request.params;
        
        await ContactsRepository.delete(id);

        response.sendStatus(204);
    }
}

//singleton

module.exports = new ContactController();
