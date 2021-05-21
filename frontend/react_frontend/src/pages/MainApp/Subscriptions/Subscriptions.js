import './Subscriptions.css'
import useWindowDimensions from 'hooks/useWindowDimensions';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@material-ui/icons';
import { useState } from 'react';

const SubscriptionsPage = () => {

    const { width } = useWindowDimensions();
    const [currentCard, setCurrentCard] = useState(1)



    return (
        <section className="subscriptions-section" id="section-subscriptions">
            {
                width > 780 ?
                    <h1 className="subscriptions-title">Choose the plan that best suits you</h1> :
                    <h1 className="subscriptions-title">Choose your plan</h1>
            }
            <div className="subscriptions-wrapper">
                <article className={"subscription-card " + (width < 1451 ? (currentCard === 1 ? "" : "hide-card"): "")}>
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
                <article className={"subscription-card " + (width < 1451 ? (currentCard === 2 ? "" : "hide-card"): "")}>
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
                <article className={"subscription-card " + (width < 1451 ? (currentCard === 3 ? "" : "hide-card"): "")}>
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
            {
                width > 1450 ? null :
                    <div className="control-btns">
                        <div className="control-btn-arrow previous-card-btn" onClick={() => setCurrentCard(card => (card > 1 ? card - 1 : card))}>
                            <ArrowBackIosRounded />
                        </div>
                        <div className="control-btn-arrow next-card-btn" onClick={() => setCurrentCard(card => (card < 3 ? card + 1 : card))}>
                            <ArrowForwardIosRounded />
                        </div>
                    </div>

            }

        </section>
    )
}

export default SubscriptionsPage

const SubscriptionsCards = () => {

    return (
        <>
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
        </>
    )
}


const CustomSliderCards = () => {

    const [currentCard, setCurrentCard] = useState(1)


    return (
        <>
            <article className={"subscription-card " + (currentCard === 1 ? "" : "hide-card")}>
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
            <article className={"subscription-card " + (currentCard === 2 ? "" : "hide-card")}>
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
            <article className={"subscription-card " + (currentCard === 3 ? "" : "hide-card")}>
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
            <div className="control-btn-arrow previous-card-btn" onClick={() => setCurrentCard(card => (card > 1 ? card - 1 : card))}>
                <ArrowBackIosRounded />
            </div>
            <div className="control-btn-arrow next-card-btn" onClick={() => setCurrentCard(card => (card < 3 ? card + 1 : card))}>
                <ArrowForwardIosRounded />
            </div>
        </>

    )
}