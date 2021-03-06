import express from 'express';
import Customer from '../.././models/user-model';
import CustomerRepository from '../.././database/repositories/customer.repository';

const router = express.Router();

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  
  const id = req.params.id;
  CustomerRepository.findCustomerById(id)
  .then(customer => {
    if(customer) {
      res.status(200).json(customer);
    }
    else { 
      console.log("user not found");
      res.status(200).json({customer: customer});
    }
  })
  .catch(err => { 
    console.log(err); 
    res.status(500).end();
  });

});

router.post('/update', (req, res, next) => {
  const user = req.body.user;

  CustomerRepository.updateCustomer(user)
  .then(userUpdated => {
    res.status(200).json(true);
  })
  .catch(err => {
    console.log('User was not updated', err);
    res.status(500).json(false);
  });


})

export default router;
