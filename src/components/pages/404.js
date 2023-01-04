import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
        </div>
    )
}

export default Page404