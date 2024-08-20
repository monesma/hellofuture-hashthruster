import { useRef } from "react";
import ScreenSize from "../helpers/ScreenSize";
import Lottie from "lottie-react";
import Arrow from "../assets/images/home/arrow.json";
import RocketWhite from "../assets/images/home/rockets/rocket_white.png";
import BackgroundInvest from "../assets/images/home/pexels-photo-7531987-7531987.webp";
import Envelop from "../assets/images/home/envelop.png";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faMedal,
  faMoneyBillTrendUp,
  faFire,
  faBriefcase,
  faEnvelope,
  faCheck,
  faBook,
  faShieldHalved,
  faEye,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const screenW = ScreenSize().width;
  const listItems3 = [
    "Rigorous Selection",
    "Maximum Security",
    "Visibility and Credibility",
    "Facilitated Transition to IEO",
  ];
  const listItems1 = [
    "Participate in Innovation",
    "Access to Quality Projects",
    "Growth Potential",
    "Strengthening the Hedera Ecosystem",
  ];
  const listItems4 = ["Go to dashboard", "Explore Projects", "Invest Securely"];
  const listItems2 = [
    "Prepare Your Project",
    "Submit Your Project",
    "Validation and Listing",
  ];
  const icon1 = [faLightbulb, faMedal, faMoneyBillTrendUp, faFire];
  const icon2 = [faBriefcase, faEnvelope, faCheck];
  const icon3 = [faBook, faShieldHalved, faEye, faArrowRightArrowLeft];
  const mobileVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  const desktopVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  return (
    <div className="home">
      <div className="presentation">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The power of hedera<span>with total trust</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Welcome to HashThruster, your dedicated gateway to the Hedera
          community for investing in reliable and robust token project ICOs.
        </motion.p>
        <motion.a
          href="#discover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Discover more
        </motion.a>
      </div>
      <section className="about" id="discover">
        <div>
          <h2>ABOUT US</h2>
          <p>
            At HashThruster, we offer you the unique opportunity to participate
            in carefully selected initial coin offerings (ICOs), guaranteeing
            maximum security and transparency.
          </p>
          <p>
            <strong>
              Our mission is to propel the most promising projects to success
            </strong>
            , by facilitating their transition to Initial Exchange Offerings
            (IEO) on our partner platform Coinstore. Thanks to our expertise and
            commitment to quality, we ensure that every project listed on
            HashThruster meets the highest standards in terms of reliability and
            growth potential.
          </p>
        </div>
        <Lottie
          id="graph"
          animationData={Arrow}
          loop={true}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
        />
      </section>
      <section className="join">
        <h2>Join us</h2>
        <p>
          Become a player in the development of the Hedera ecosystem by
          investing in tokens that have the power to transform the future.
        </p>
        <p>
          With HashThruster, boost your investments and participate in the
          growth of tomorrow’s decentralized technologies.
        </p>
        <p>
          <img src={Envelop} alt="" />
          contact@hashthruster.com
        </p>
        <a href="mailto:contact@hashthruster.com">Get in touch</a>
      </section>
      <section className="who">
        <div>
          <h2>WHO IS OUR ICO FOR?</h2>
          <p>
            At HashThruster, we welcome entrepreneurs, startups, and visionary
            developers looking to raise funds for their blockchain projects. If
            you have a revolutionary idea and want to turn it into reality, our
            platform is for you.
          </p>
        </div>
        <div className="card-container">
          {listItems1.map((list, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true });

            return (
              <motion.div
                key={index}
                className="card"
                ref={ref}
                variants={screenW <= 1024 ? mobileVariants : desktopVariants}
                animate={isInView ? "visible" : "hidden"}
              >
                <FontAwesomeIcon icon={icon1[index]} />
                <h3>{list}</h3>
              </motion.div>
            );
          })}
        </div>
      </section>
      <section className="submit">
        {screenW > 1024 ? (
          <h2>
            How to submit
            <br />
            your project?
          </h2>
        ) : (
          <h2>How to submit your project?</h2>
        )}
        <div>
          {listItems2.map((list, index) => (
            <div key={index} className="liste">
              <FontAwesomeIcon icon={icon2[index]} />
              <h3>{list}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="why">
        <div>
          {screenW > 1024 ? (
            <h2>
              WHY INVEST IN AN
              <br />
              ICO ON HASHTHRUSTER?
            </h2>
          ) : (
            <h2>WHY INVEST IN AN ICO ON HASHTHRUSTER?</h2>
          )}
          <p>
            Investing in ICOs through HashThruster provides a gateway to
            pioneering web3 projects, ensuring rigorous selection and maximum
            security.
          </p>
        </div>
        <div className="card-container">
          {listItems3.map((list, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true });

            return (
              <motion.div
                key={index}
                className="card"
                ref={ref}
                variants={screenW <= 1024 ? mobileVariants : desktopVariants}
                animate={isInView ? "visible" : "hidden"}
              >
                <FontAwesomeIcon icon={icon3[index]} />
                <h3>{list}</h3>
              </motion.div>
            );
          })}
        </div>
      </section>
      <section className="invest">
        <div className="title-container">
          <h2>How to invest?</h2>
          <p>The dashboard will soon open its doors</p>
        </div>
        <div className="card-container">
          {screenW <= 1024 && <img src={BackgroundInvest} />}
          {listItems4.map((list, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true });

            return (
              <motion.div
                key={index}
                className="card"
                ref={ref}
                variants={screenW <= 1024 ? mobileVariants : desktopVariants}
                animate={isInView ? "visible" : "hidden"}
              >
                <img src={RocketWhite} alt="" />
                <h3>{list}</h3>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
