function Hero() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const discountAmount = 15;

    return(
        <section className="hero">
            <h2 className="hero-title">Equip your workspace</h2>
            <p className="hero-subtitle">
                Premium gear designed specifically for modern developers.
            </p>
            <div className="hero-promo">
                {currentMonth} Special: Get {discountAmount}% off all mechanical keyboards!
            </div>
        </section>
    );
}

export default Hero;