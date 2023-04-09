
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    
    // USER STRUCT 
    struct user {
        string name;
        friend[] friendList;
         
    }

    struct friend {

        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck{
        string name;
        address accountAddress;
    }


    AllUserStruck[] getAllUsers;




    mapping (address => user) userList ;
    mapping (bytes32=> message[]) allMessages;

    //CHECK USER EXISTS

    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }
        
        //Create account 

        function createAccount(string calldata name) external{
            require(checkUserExists(msg.sender) == false, "User already exists");
            require(bytes(name).length > 0, "Name cannot be empty");

            userList[msg.sender].name = name;

            getAllUsers.push(AllUserStruck(name,msg.sender));

        }

        //Get username

        function getUserName(address pubkey) external view returns(string memory){
            require(checkUserExists(pubkey) , "User does not exist");
            return userList[pubkey].name;
        }

        //Add friend

        function addFriend(address friend_key,string calldata name) external{
            require(checkUserExists(msg.sender) , "Create an account First");
            require(checkUserExists(friend_key) , "User is not registered1");

            require(msg.sender != friend_key , "You cannot add yourself as a friend");

            require(checkAlreadyFriends(msg.sender,friend_key) == false, "You are already friends");

            _addFriend(msg.sender,friend_key,name);
            _addFriend(friend_key,msg.sender,userList[msg.sender].name);


        }


        //Check if already friends

        function checkAlreadyFriends(address pubkey1,address pubkey2) internal view returns(bool){
            
            if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){

                address tmp = pubkey1;
                pubkey1 = pubkey2;
                pubkey2 = tmp;
            }

            for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {

                if(userList[pubkey1].friendList[i].pubkey == pubkey2){
                    return true;
                }
                
            }
            return false;
                

        }

        function _addFriend(address me,address friend_key,string memory name ) internal {
            friend memory newFriend = friend(friend_key,name);
            userList[me].friendList.push(newFriend);
}

        //GETMY FRIEND

        function getMyFriendList() external view returns(friend[] memory){
            return userList[msg.sender].friendList;
        }

        //get chat code
        function _getChatCode(address pubkey1,address pubkey2) internal pure returns(bytes32){
            if(pubkey1 < pubkey2){
                return keccak256(abi.encodePacked(pubkey1,pubkey2));
            }
            else{
                return keccak256(abi.encodePacked(pubkey2,pubkey1));
            }
        }

        //Send Message

        function sendMessage(address friend_key,string calldata _msg) external {
            require(checkUserExists(msg.sender) , "Create an account First");
            require(checkUserExists(friend_key) , "User is not registered");
            require(checkAlreadyFriends(msg.sender,friend_key) , "You are not friends");

            bytes32 chatcode = _getChatCode(msg.sender,friend_key);
            message memory newMsg = message(msg.sender,block.timestamp,_msg);
            allMessages[chatcode].push(newMsg);
        }


        //READ MESSAGE
        function readMessage(address friend_key) external view returns(message[] memory){
            

            bytes32 chatcode = _getChatCode(msg.sender,friend_key);
            return allMessages[chatcode];
        }


    function getAllUsersList() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }
    
    

}