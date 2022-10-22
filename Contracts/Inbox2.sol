pragma solidity ^ 0.4.17;
contract inbox{

    string public message;

    function inbox(string InitialMessage)public{
        message=InitialMessage;

    }
    function setMessage(string NewMessage)public{
        message=NewMessage;

    }
   
    

}