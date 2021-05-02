import './ScrollDownHomeBtn.css'

const ScrollDownHomeBtn = () => {
    return (
        <a className="mouse_scroll" href="#section-subscriptions">
            <div className="mouse">
                <div className="wheel"></div>
            </div>
            <div>
                <span className="m_scroll_arrows unu"></span>
                <span className="m_scroll_arrows doi"></span>
                <span className="m_scroll_arrows trei"></span>
            </div>
        </a> 
    )
}

export default ScrollDownHomeBtn