import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();

    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const toast = useToast();

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return (
        <>
            <Box
                display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                flexDir="column"
                // alignItems="center"
                p={3}
                bg="white"
                w={{ base: "100%", md: "31%" }}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Box
                    pb={3}
                    px={3}
                    fontSize={{ base: "28px", md: "30px" }}
                    fontFamily="Work sans"
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text fontSize={{ base: "22px", md: "30px" }}>My Chats</Text>
                    <GroupChatModal>
                        <Button
                            display="flex"
                            fontSize={{ base: "17px", md: "30px", lg: "17px" }}
                            rightIcon={<AddIcon />}
                        >
                            New Group Chat
                        </Button>
                    </GroupChatModal>
                </Box>
                <Box
                    display="flex"
                    flexDir="column"
                    p={3}
                    bg="#F8F8F8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {chats.length === 0 && (
                        <Box display="flex" alignItems="center" justifyContent="center" h="90%">
                            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                                No chats found...
                            </Text>
                        </Box>
                    )}

                    {chats ? (
                        <>
                            <Stack overflowY="scroll">
                                {chats.map((chat) => (
                                    <Box
                                        onClick={() => setSelectedChat(chat)}
                                        cursor="pointer"
                                        bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                        color={selectedChat === chat ? "white" : "black"}
                                        px={3}
                                        py={2}
                                        borderRadius="lg"
                                        key={chat._id}
                                    >
                                        <Text>
                                            {!chat.isGroupChat
                                                ? getSender(loggedUser, chat.users)
                                                : chat.chatName}
                                        </Text>
                                        {chat.latestMessage && (
                                            <Text fontSize="xs">
                                                <b>{chat.latestMessage.sender.name} : </b>
                                                {chat.latestMessage.content.length > 50
                                                    ? chat.latestMessage.content.substring(0, 51) + "..."
                                                    : chat.latestMessage.content}
                                            </Text>
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                        </>
                    ) : (
                        // <><ChatLoading /></>
                        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                                Search for user to start chatting...
                            </Text>
                        </Box>

                    )}
                </Box>
            </Box>
        </>
    );
};

export default MyChats;
