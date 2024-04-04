type UserData = {
    id: string;
    email: string;
};

type UserStore = {
    isAuth: boolean;
    userData: UserData;
    // getUserData: () => Promise<void>;
    setIsAuth: (isAuth: boolean) => void;
    setUserData: (userData: UserData) => void;
};
