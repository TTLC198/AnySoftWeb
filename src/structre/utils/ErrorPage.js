import {useAsyncError, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useAsyncError();
    console.error(error);

    return (
        <div id="error-page">
            <h1 style={{color: "#fafafa"}} >Oops!</h1>
            <p style={{color: "#fafafa"}}>Sorry, an unexpected error has occurred.</p>
            <p style={{color: "#fafafa"}}>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}