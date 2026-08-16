function Header() {
    return (
        <header className="header">
            <h1 className="header-logo">FS-Commerce</h1>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item">Shop</li>
                    <li className="nav-item">Categories</li>
                    <li className="nav-item" style={{ fontWeight: 'bold' }}>Cart (0)</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;