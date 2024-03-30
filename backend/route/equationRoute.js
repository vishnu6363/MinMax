import express from "express";
import {equations} from '../models/mimaxquations.js';
const router =express.Router();


router.post('/', async(request,response)=>{
    try{
        if(!request.body.parametercount ||
            !request.body.parameteres||
            !request.body.equationType||
            !request.body.equation){
                return response.status(400).send({message:"please send all the filed"});

        }
        const newEquation={
            equation:request.body.equation,
            equationType:request.body.equationType,
            parameteres:request.body.parameteres,
            parametercount :request.body.parametercount


        }
        const equation =await equations.create(newEquation);
        return response.status(201).send(equation);

    }catch(error){
        response.status(500).send({message :error.message});

    }
});

router.get('/', async(request,response)=>{
    try{
        const eqtions=await equations.find({});
        return response.status(201).json(eqtions);

    }catch(error){
        response.status(500).send({message :error.message});

    }
});

router.get('/:id', async(request,response)=>{
    try{
        const {id}=request.params;
        const eqtions=await equations.findById(id);
        return response.status(201).json(eqtions);

    }catch(error){
        response.status(500).send({message :error.message});

    }
});


router.put('/:id', async(request,response)=>{
    try{
        if(!request.body.parametercount ||
            !request.body.parameteres||
            !request.body.equationType||
            !request.body.equation){
                return response.status(400).send({message:"please send all the filed"});

        }
        const {id}=request.params;
        const eqtions=await equations.findByIdAndUpdate(id,request.body);
        if(!eqtions){
            return response.status(404).json({message:"equation not find"});
        }
        else{
            return response.status(200).json({message:"equation update"});
        }
        return response.status(201).json(eqtions);

    }catch(error){
        response.status(500).send({message :error.message});

    }
});

router.delete('/:id', async(request,response)=>{
    try{
        const {id}=request.params;
        const eqtions=await equations.findByIdAndDelete(id);
        if(!eqtions){
            return response.status(404).json({message:"equation not find"});
        }
        else{
            return response.status(200).json({message:"equation  deleted"});
        }
    }catch(error){
        response.status(500).send({message :error.message});

    }
});

export default router;
 