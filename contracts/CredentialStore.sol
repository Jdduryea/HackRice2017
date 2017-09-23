pragma solidity^0.4.11;
contract CredentialStore {
    struct Student {
        mapping(string => bool) graduatedFrom;
        string name;
    }
    
    address owner;
    
    function CredentialStore() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    // public address mapped to student which owns domain
    mapping(address => Student) studentMap;
    
    // public address mapped to university name (owner of name) 
    mapping(address => string) universityOwnerMap;
    
    // OWNER INTERFACE
    function authorize(address universityAddr, string universityName) onlyOwner public returns (bool) {
        universityOwnerMap[universityAddr] = universityName;
        return true;
        // Test: 0xeda84d97e05480892d53a87c6eb3bce23362b3e7
        // name: Rice
    }
    
    // UNIVERSITY INTERFACE
    function graduate(address studentAddr) external {
        string universityName = universityOwnerMap[msg.sender];
        studentMap[studentAddr].graduatedFrom[universityName] = true;
    }
    
    // EMPLOYER INTERFACE
    function isGraduated(address studentAddr, string universityName) public constant returns (bool)  {
        return studentMap[studentAddr].graduatedFrom[universityName];
    }
}