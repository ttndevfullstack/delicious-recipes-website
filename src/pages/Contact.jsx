import "../css/Contact.css";

function Contact() {
    return (
        <div className="contact">
            <div className="contact__content">
                <img
                    src="https://static.wixstatic.com/media/97ae43_a5897de13d3c42e7aac7ec497dab86ad~mv2_d_5015_3343_s_4_2.jpg/v1/crop/x_0,y_787,w_5015,h_1769/fill/w_1176,h_413,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/yakynina-anastasia-562728-unsplash.jpg"
                    alt="background.png"
                />
                <form className="contact__form" method="POST">
                    <div className="contact__form-top">
                        <input
                            type="text"
                            className="inputName"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            className="inputEmail"
                            placeholder="Email"
                        />
                    </div>
                    <div className="contact__form-bottom">
                        <input
                            type="text"
                            className="inputSubject"
                            placeholder="Subject"
                        />
                        <input
                            type="text"
                            className="inputMessage"
                            placeholder="Type your message here..."
                        />
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
