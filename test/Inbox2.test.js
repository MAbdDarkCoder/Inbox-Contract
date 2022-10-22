const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 =require('web3');
const web3 = new Web3(ganache.provider());
const { interface , bytecode} = require ('../compile') ;

let accounts;
let Inbox2;

beforeEach( async () =>{
    // Get list of all accounts 
    accounts= await  web3.eth.getAccounts( );
     


    // use one of the accounts to deploy the contract
    
   Inbox2= await new web3.eth.Contract(JSON.parse(interface))
     .deploy({ 
        data :bytecode , arguments :['Hi there!']
    })
     .send({ from :accounts[0] , gas :'1000000'});
     
});

describe ('Inbox2' , () =>{
    it('deploys a contract ' , () =>{
      assert.ok(Inbox2.options.address)

    });
    it ('has a default message' , async () =>{

        const message = await Inbox2.methods.message().call();
        assert.equal(message ,'Hi there!');

    });  
    
    it('can change the message' , async ()=>{

        await  Inbox2.methods.setMessage('Bye').send({from : accounts [0]});
        const message = await Inbox2.methods.message().call();
        assert.equal(message , 'Bye');

    });

});














/* class Car {

    park() {
        return 'Stopped' ;
    }

    drive () {

        return 'Vroom';
    }
}

let car;
beforeEach(() => {
    const car = new Car();
});

describe(' Car ' , () =>{
    it('Can park ' , () =>{

   
        assert.equal(car.park() ,'Stopped');


    } );

    it("Can drive " , () =>{

        assert.equal(car.drive() , 'Vroom')
    });

}); */