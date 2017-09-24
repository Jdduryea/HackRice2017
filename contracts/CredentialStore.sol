pragma solidity^0.4.11;
contract CredentialStore {
    struct UniversityCredential {
        string degreeType;
        bool completed;
        uint yearOfGraduation;
        string fieldOfStudy;
        uint gpa;
    }

    struct Student {
        // maps university names to credentials
        mapping(string => UniversityCredential) universityMap;
        string name;
    }

    // public address mapped to university name (owner of name) 
    mapping(address => string) public accreditedUniversities;
    
    // public address mapped to student which owns domain
    mapping(address => Student) public studentMap;
    
    // access credentials with this procedure:
    // credential = contract.studentMap[studentAddr].universityMap[universityName]

    address owner;
    function CredentialStore() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    // OWNER INTERFACE
    function authorizeUniversity(
        address _universityAddr, 
        string _universityName) onlyOwner public 
    {
        accreditedUniversities[_universityAddr] = _universityName;
    }

    function identifyStudent(
        address _studentAddr, 
        string _studentName) onlyOwner public 
    {
        studentMap[_studentAddr].name = _studentName;
    }
    
    // UNIVERSITY INTERFACE
    function update(
        address _studentAddr, 
        string _degreeType, 
        bool _completed,
        uint _yearOfGraduation,
        string _fieldOfStudy,
        uint _gpa) external 
    {
        string universityName = accreditedUniversities[msg.sender];
        studentMap[_studentAddr].universityMap[universityName] = UniversityCredential({
            degreeType: _degreeType,
            completed: _completed,
            yearOfGraduation: _yearOfGraduation,
            fieldOfStudy: _fieldOfStudy,
            gpa: _gpa
        });
    }

    function getName(address _studentAddr) constant returns (string) {
        return studentMap[_studentAddr].name;
    }

    function getDegreeType(address _studentAddr, string _universityName) constant returns (string) {
        return studentMap[_studentAddr].universityMap[_universityName].degreeType;
    }

    function getCompleted(address _studentAddr, string _universityName) constant returns (bool) {
        return studentMap[_studentAddr].universityMap[_universityName].completed;
    }

    function getYearOfGraduation(address _studentAddr, string _universityName) constant returns (uint) {
        return studentMap[_studentAddr].universityMap[_universityName].yearOfGraduation;
    }

    function getFieldOfStudy(address _studentAddr, string _universityName) constant returns (string) {
        return studentMap[_studentAddr].universityMap[_universityName].fieldOfStudy;
    }

    function getGPA(address _studentAddr, string _universityName) constant returns (uint) {
        return studentMap[_studentAddr].universityMap[_universityName].gpa;
    }
}