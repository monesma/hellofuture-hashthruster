import { Link } from "react-router-dom";
import Step1 from "../assets/images/home/step1.png";
import Step2 from "../assets/images/home/step2.png";
import ScreenSize from "../helpers/ScreenSize";
import Navbar from "../components/Navbar";

const Informations = () => {
  const screenW = ScreenSize().width;
  return (
    <div>
      {screenW < 1025 && <Navbar />}

      <section className="infos">
        <h1>About investment</h1>
        <div>
        <p>
          At HashThruster, we offer you the unique opportunity to participate in
          carefully selected initial coin offerings (ICOs), guaranteeing maximum
          security and transparency.
        </p>
        <p>
          Our mission is to propel the most promising projects to success, by
          facilitating their transition to Initial Exchange Offerings (IEO) on
          our partner platform Coinstore. Thanks to our expertise and commitment
          to quality, we ensure that every project listed on HashThruster meets
          the highest standards in terms of reliability and growth potential.
        </p>
        <article>
          <h2>WHY INVEST IN OUR ICOS?</h2>
          <p>
            Investing in ICOs via HashThruster offers a gateway to innovative
            web3 projects, guaranteeing rigorous selection and maximum security.
            What are the advantages? Our projects are carefully selected for
            their potential and impact. So users can invest with confidence,
            thanks to our advanced security protocols. Projects can take
            advantage of the increased visibility and credibility offered by our
            platform, and benefit from a simplified transition to Initial
            Exchange Offers (IEOs).
          </p>
        </article>
        <article className="lifecycle">
          <h2>How it work?</h2>
          <p>
            Here we explain our system in simple terms, so that you can fully
            understand our work. From project selection and ICO launch to
            transmission to the IEO.
          </p>
          <div>
            {screenW < 1025 && <h3>Step 1: Project selection</h3>}
            <img src={Step1} alt="step 1" />
            <div>
              {screenW > 1024 && <h3>Step 1: Project selection</h3>}
              <p>
                When a project is submitted to our platform, we take care not to
                leave anything to chance and the project is analysed by our team
                and the Coinstore team. So we decide together on the feasibility
                of the project and we validate each project together, which
                ensures the success of the project, as well as giving the
                investor total confidence in the reliability of the project.
              </p>
            </div>
          </div>
          <div>
            {screenW < 1025 && <h3>Step 2: HashThruster launch ICO</h3>}
            <img src={Step2} alt="step 2" />
            <div>
              {screenW > 1024 && <h3>Step 2: HashThruster launch ICO</h3>}

              <p>
                When a project is listed on our site, it means that it has
                passed our validation system and that it is considered reliable
                by our platform as well as by the Coinstore platform. Unlike a
                traditional ICO, where the project owners manage the pre-sale,
                here everything is framed to ensure transparency and total
                confidence for users wishing to invest in a project that is
                reliable in the long term. So when an ICO is launched, a Wallet
                is created for the collection. This wallet is managed by
                HashThruster, which guarantees transparency and avoids any scams
                from malicious parties. At the end of the ICO, some of the
                tokens are distributed to investors and the project takes off
                towards an IEO at our partner Coinstore. The second part of the
                tokens will be distributed shortly afterwards to guarantee the
                financial stability of the project.
              </p>
            </div>
          </div>
        </article>
        <article>
          <h2>How long does an ICO last?</h2>
          <p>
            An ICO takes 3 months to raise the funds needed to ensure the
            success of the project when it is listed on the IEO. During these
            three months, HashThruster collects the investments and records each
            transaction and each sum so that it can intelligently manage the
            distribution of the tokens at the end of the ICO.
          </p>
          <p>
            The official dates are planned in advance and all the information
            will be available. In the event of any problems during the
            transaction or the distribution of tokens, our team will be on hand
            to resolve any issues that may arise. Our aim is to provide you with
            the best possible service.
          </p>
        </article>
        <article>
          <h2>What is the minimum price to invest?</h2>
          <p>
            The minimum price to invest in one of our projects is{" "}
            <strong>$30</strong>, and there is no price limit.
          </p>
          <p>
            At HashThruster, there's no such thing as too little or too much -
            everyone is free to invest as much or as little as they like.
            However, we believe that a minimum investment of $30 is necessary to
            guarantee a useful investment for both the project and the buyer.
          </p>
        </article>
        <Link to="/launchpad">Go to invest</Link>
        </div>
      </section>
    </div>
  );
};

export default Informations;
