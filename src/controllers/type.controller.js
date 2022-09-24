import Type from "../models/Type"

export const createType = async(req,res) => {
    
    const {name} = req.body

    const newType = new Type({name});

    const typeSaved = await newType.save()

    res.status(201).json(typeSaved)
}

export const getTypes = async (req,res) => {
    
    const types = await Type.find();
    
    res.json(types)
}

export const getTypeByID = async (req,res) => {

    const types = await Type.findById(req.params.typeID)

    res.status(200).json(types)

}

export const updateTypeByID = async (req,res) => {
    const updatedType = await Type.findByIdAndUpdate(req.params.typeID, req.body, {
        new:true
    })
    res.status(200).json(updatedType)
}

export const deleteTypeByID = async (req,res) => {
    
    await Type.findByIdAndDelete(req.params.typeID)

    res.status(204).json()
}