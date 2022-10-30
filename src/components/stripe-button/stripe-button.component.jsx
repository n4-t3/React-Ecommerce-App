import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price,setCart}) =>{
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_qblFNYngBkEdjEZ16jxxoWSM'
    const onToken = (token) =>{
        localStorage.removeItem('cart')
        setCart(null)
        alert('Payment Successful!')
    }
    return(
        <StripeCheckout 
        label="Pay Now"
        name="Cloth Ltd."
        billingAddress
        shippingAddress
        zipCode
        description = {`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel  = "Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton