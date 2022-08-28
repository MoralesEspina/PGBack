import Client from "../models/Client"

export const createClient = async(req,res) => {
    
    const {name,nit,phoneNumber,direction,latitude, length, references} = req.body

    const newClient = new Client({name,nit,phoneNumber,direction, references, latitude, length});

    const clientSaved = await newClient.save()

    res.status(201).json(clientSaved)
}

export const getClients = async (req,res) => {
    
    const clients = await Client.find();
    
    res.json(clients)
}

export const getClientByID = async (req,res) => {

    const client = await Client.findById(req.params.clientID)

    res.status(200).json(client)

}

export const updateClientByID = async (req,res) => {
    const updatedClient = await Client.findByIdAndUpdate(req.params.clientID, req.body, {
        new:true
    })
    res.status(200).json(updatedClient)
}

export const deleteClientByID = async (req,res) => {
    
    await Client.findByIdAndDelete(req.params.clientID)

    res.status(204).json()
}

export const getDirection = async (req,res) => {


}