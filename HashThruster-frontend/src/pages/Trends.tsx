import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Finger from "../assets/images/finger.png";
import { getMostDemandedTokens, getOneFungibleTokenById } from "../api/hedera";
import ScreenSize from "../helpers/ScreenSize";
import Navbar from "../components/Navbar";

const Trends = () => {
  const screenW: number = ScreenSize().width;
  const [allFungibleTokens, setAllFungibleTokens] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const topTokens = await getMostDemandedTokens();

        const tokenPromises = topTokens.map(async (token) => {
          const res = await getOneFungibleTokenById(token.id);
          return {
            id: res.token_id,
            idChart: token.idChart,
            name: res.name,
            symbol: res.symbol,
            volume24: Number(token.volume24).toFixed(5),
            poolName: token.poolName,
            price: Number(token.price).toFixed(10),
          };
        });

        let myTokens = await Promise.all(tokenPromises);

        myTokens = myTokens.sort((a, b) => parseFloat(b.volume24) - parseFloat(a.volume24));

        myTokens = myTokens.slice(0, 18);

        setAllFungibleTokens(myTokens);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const truncateName = (name: string, length: number) => {
    return name.length > length ? `${name.substr(0, length)}...` : name;
  };

  const getNameLength = () => {
    if (screenW < 768) return 20;
    if (screenW >= 768 && screenW < 1024) return 20;
    if (screenW >= 1024 && screenW < 1500) return 15;
    if (screenW >= 1500 && screenW < 1800) return 25;
    return 30;
  };

  return (
    <div className="trends">
      {screenW < 1025 && <Navbar />}
      <section>
        <div className="fungible">
          <h1>Fungible Token Trends</h1>
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : (
            <ul>
              {allFungibleTokens.map((token, index) => (
                <li key={index}>
                  <Link to={`/details/${token.idChart}`}>
                    <div>
                      name:{" "}
                      <span>{truncateName(token.name, getNameLength())}</span>
                      <br />
                      symbol: <span>{token.symbol}</span>
                      <br />
                      pool: <span>{token.poolName}</span>
                      <br />
                      volume 24h: <span>{token.volume24} $</span>
                      <br />
                      price: <span>{token.price} $</span>
                    </div>
                    <img src={Finger} alt="finger" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Trends;
