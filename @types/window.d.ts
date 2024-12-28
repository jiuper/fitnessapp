export {};
declare global {
    interface window {
        _env_: {
            REACT_APP_API_URL: string;
            // Add other properties here if needed
        };
    }
}
