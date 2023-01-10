import ErrorMessage from "../../errorMessage/ErrorMessage"
import { Helmet } from "react-helmet";


const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Error Page</title>
            </Helmet>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
        </div>
    )
}

export default Page404