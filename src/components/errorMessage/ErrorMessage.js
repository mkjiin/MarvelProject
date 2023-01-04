import img from './giphy.gif'

const ErrorMessage = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <img src={img} alt='error' />
        </div>
    )
}

export default ErrorMessage;