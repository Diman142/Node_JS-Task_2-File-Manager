const DEFAULT_USER_NAME = "Anonymous";
const HIEGHEST_PATH_LENGTH = 3

export const prepareUserName = (userName) => {
    const spliceIndex = userName.split("").findIndex((el) => el === "=");
    if (spliceIndex === -1 || !userName) {
        return DEFAULT_USER_NAME;
    }
    return userName.slice(spliceIndex + 1);
};

export const checkMinPathLength = (path) => (
    path.length <= HIEGHEST_PATH_LENGTH ? true : false
)

export const parseCommand = (command) => (
    command.split(' ')
)

export const checkArguments = (parsedComand, quantity = 1) => (
    parsedComand.length - 1 === quantity
)
