import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScreenSize from "../helpers/ScreenSize";

const Detail = () => {
  const screenW: number = ScreenSize().width;
  const params = useParams();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(
      `https://www.geckoterminal.com/hedera-hashgraph/pools/${params.id}?embed=1&info=1&swaps=1`
    );
  }, [params.id]);

  return (
    <section className="details">
      {screenW < 1025 && <Navbar />}
      <div>
        {url !== "" && (
          <iframe
            height={window.innerHeight}
            width="100%"
            id="geckoterminal-embed"
            title="GeckoTerminal Embed"
            src={url}
            frameBorder="0"
            allow="clipboard-write"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  );
};

export default Detail;
