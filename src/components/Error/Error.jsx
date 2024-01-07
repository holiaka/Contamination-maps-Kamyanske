import { ErrorText, ErrorBox } from "./Error.styled";

export const Error = () => {
    return (
        <ErrorBox>
            <ErrorText>
                The request ended with an error!!!
            </ErrorText>
            <ErrorText>
                Type error: {}
            </ErrorText>
        </ErrorBox>
    )
}