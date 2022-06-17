// create a reference to the model
let InventoryModel = require('../models/inventory');

module.exports.inventoryList = function(req, res, next) {  
    InventoryModel.find((err, inventoryList) => {
        //console.log(inventoryList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('business_contacts/list', {

                title: 'Business Contacts List View', 
                InventoryList: inventoryList,
                userName: req.user ? req.user.username : '',
            })            
        }
    }).sort({"name":1});
}

module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    InventoryModel.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('business_contacts/add_edit', {
                title: 'Update View', 
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}


module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id

    let updatedItem = InventoryModel({
        _id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
    });

    InventoryModel.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/business_contacts/list');
        }
    });

}


module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    InventoryModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/business_contacts/list');
        }
    });

}


module.exports.displayAddPage = (req, res, next) => {

    let newItem = InventoryModel();

    res.render('business_contacts/add_edit', {
        title: 'Add a new contact',
        item: newItem,
        userName: req.user ? req.user.username : ''
    })          

}

module.exports.processAddPage = (req, res, next) => {

    let newItem = InventoryModel({
        _id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,

    });

    InventoryModel.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.redirect('/business_contacts/list');
        }
    });
    
}