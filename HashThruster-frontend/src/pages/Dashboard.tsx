import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScreenSize from "../helpers/ScreenSize";
import Hello from "../assets/images/home/hedera-bg.webp";
import { motion } from "framer-motion";
const Dashboard = () => {
  const screenW = ScreenSize().width;
  return (
    <div className="dashboard">
      {screenW < 1025 && <Navbar />}
      <section className="welcome">
        <h1>Dashboard</h1>
        <p>
          Welcome to the world of HashThruster, your innovative solution for
          creating and launching tokens on the Hedera platform. In the age of
          blockchain and crypto-currencies, the efficient and secure launch of
          tokens is becoming essential for projects looking to raise funds and
          gain visibility on the market. This is where HashThruster comes in.
        </p>
        <p>
          Our platform allows you to create Initial Coin Offerings (ICOs) for
          tokens based on Hedera, one of the most advanced and secure
          distributed ledger technologies. But we don't stop there. Thanks to
          our strategic partnership and robust infrastructure, every ICO
          launched via HashThruster is immediately propelled to an Initial
          Exchange Offering (IEO), guaranteeing instant liquidity and maximum
          exposure.
        </p>
        <p>
          HashThruster not only simplifies the token creation process, but also
          ensures that your tokens reach the market faster and more efficiently
          than ever before. With enhanced security, built-in regulatory
          compliance and a growing community of investors, HashThruster is the
          ultimate tool to power your web3 projects.
        </p>
      </section>
      <section className="try">
        <article className="join">
          <h2>
            Join the adventure
            <br />
            of a successful project
          </h2>
          <p>
            Turn your vision into reality by depositing your ICO token with
            HashThruster and propel your project towards a recognised IEO
            platform.
          </p>
          <Link to="/submit">Submit your project</Link>
        </article>
        <article className="participate">
          <h2>
            A solid investment
            <br />
            in complete confidence
          </h2>
          <p>
            Invest with confidence by participating in an ICO on HashThruster
            and benefit from the unrivalled security and transparency of Hedera
            technology.
          </p>
          <Link to="/launchpad">Participate in an ico</Link>
        </article>
      </section>
      {screenW >= 1024 &&  <motion.p
          id="slogan"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Leading the world of DeFi
        </motion.p>}
      {screenW < 1024 && (
        <img src={Hello} id="hello" alt="image hello future" />
      )}
    </div>
  );
};

export default Dashboard;
