import "../css/Introduce.css";
import { BsFillHeartFill } from "react-icons/bs";

function Introduce({ type }) {
    return (
        <div className="introduce">
            {type === "About" && (
                <section className="introduce__about">
                    <div className="introduce__about-left">
                        <h1>Hi There!</h1>
                        <h2>
                            I'm a paragraph. Click here to add your own text and
                            edit me. It’s easy. Just click “Edit Text” or double
                            click me to add your own content and make changes to
                            the font. I’m a great place for you to tell a story
                            and let your users know a little more about you.
                        </h2>
                    </div>
                    <div className="introduce__about-right">
                        <div className="introduce__about-btn">
                            <h1>Hi!</h1>
                        </div>
                        <img src="https://static.wixstatic.com/media/97ae43_b9b36610a3fb47e5a1d2147f86f39d35~mv2_d_3744_5616_s_4_2.jpg/v1/crop/x_17,y_700,w_3727,h_4916/fill/w_274,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/GettyImages-709137631.jpg" />
                    </div>
                </section>
            )}

            {type === "Subscribe" && (
                <section className="introduce__subscribe">
                    <img
                        src="https://static.wixstatic.com/media/97ae43_bf713f4507a34c08a55d051aab151a56~mv2_d_4928_3264_s_4_2.jpg/v1/fill/w_586,h_388,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ales-krivec-731-unsplash.jpg"
                        alt="forest.png"
                    />
                    <div className="introduce__subscribe-content">
                        <BsFillHeartFill />
                        <div className="introduce__subscribe-title">
                            <h2>Join My Mailing List</h2>
                            <h2>& Never Miss an Update</h2>
                        </div>
                        <form type="submit" method="POST">
                            <input
                                type="email"
                                placeholder="Enter your email here..."
                            />
                            <button>Subscribe Now</button>
                        </form>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Introduce;
