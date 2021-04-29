import './Subscriptions.css'
import useWindowDimensions from 'hooks/useWindowDimensions';

const SubscriptionsPage = () => {

    const { width } = useWindowDimensions();



    return (
        <section className="subscriptions-section" id="section-subscriptions">
            {
                width > 780 ?
                    <h1 className="subscriptions-title">Choose the plan that best suits you</h1> :
                    <h1 className="subscriptions-title">Choose your plan</h1>


            }
            <div className="subscriptions-wrapper">
                <article className="subscription-card">
                    <h2 className="card-sub-title">Free</h2>
                    <div className="card-sub-pricing">
                        <span className="price">0€</span>
                        <span className="month">Per Month</span>
                    </div>
                    <div className="card-info">
                        <span>Max. 5 Transfers/Day</span>
                        <span>Unlimited bandwidth</span>
                        <span>Unlimited max GB</span>
                    </div>

                    <button className="buy-sub-btn">Upgrade</button>
                </article>
                <article className="subscription-card">
                    <h2 className="card-sub-title">Normal</h2>
                    <div className="card-sub-pricing">
                        <span className="price">5€</span>
                        <span className="month">Per Month</span>
                    </div>
                    <div className="card-info">
                        <span>Max. 20 Transfers/Day</span>
                        <span>Unlimited bandwidth</span>
                        <span>Unlimited max GB</span>
                    </div>

                    <button className="buy-sub-btn">Upgrade</button>
                </article>
                <article className="subscription-card">
                    <h2 className="card-sub-title">Pro</h2>
                    <div className="card-sub-pricing">
                        <span className="price">15€</span>
                        <span className="month">Per Month</span>
                    </div>
                    <div className="card-info">
                        <span>Unlimited Transfers/Day</span>
                        <span>Unlimited bandwidth</span>
                        <span>Unlimited max GB</span>
                    </div>

                    <button className="buy-sub-btn">Upgrade</button>
                </article>

            </div>

        </section>
    )
}

export default SubscriptionsPage