import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Skylar Kim's Application</span></h1>
            </header>
            <main className="public__main">
                <p>This application was built to help users who suffer from RA to track and manage their daily activities</p>
                <address className="public__addr">
                    Skylar Kim<br />
                    555 Foo Drive<br />
                    Foo City, CA 12345<br />
                    <a href="tel:+18054288317">(805) 428-8317</a>
                </address>
                <br />
                <p>Owner: Skylar Kim</p>
            </main>
            <footer>
                <Link to="/login">User Login</Link>
                <Link to="/users/new">Sign Up</Link>
            </footer>
        </section>

    )
    return content
}
export default Public