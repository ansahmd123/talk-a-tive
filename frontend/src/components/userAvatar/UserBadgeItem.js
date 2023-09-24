import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            colorScheme={admin && user._id === admin._id ? "green" : "purple"}
            cursor={admin && user._id === admin._id ? "pointer" : "default"}
            onClick={handleFunction}
        >
            {user.name}
            {/* {user._id !== admin._id ? (<>{user.name}</>) : (<>{user.name}<CloseIcon pl={1} /></>)} */}
            <CloseIcon pl={1} />
        </Badge>
    );
};

export default UserBadgeItem;
