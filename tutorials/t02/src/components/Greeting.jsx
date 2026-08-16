function Greeting() {
    const name = "Students";
    const topic = "Full-Stack";

    return (
        <div className="welcome-banner">
            <h1>Hello {name}!</h1>
            <p>Welcome to {topic}.</p>
        </div>
    );
}

export default Greeting;