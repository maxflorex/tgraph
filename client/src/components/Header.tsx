type Props = {};

const Header = (props: Props) => {
    return (
        <nav className="navbar bg-light mb-4 my-4 p-0">
            <div className="container">
                <a href="/" className="navbar-brand">
                    <div className="d-flex">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/OBS.svg/1024px-OBS.svg.png"
                            alt=""
                        />
                        <h1>Project MGMT</h1>
                    </div>
                </a>
            </div>
        </nav>
    );
};

export default Header
