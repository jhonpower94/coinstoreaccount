import { useLocation, useNavigate } from "react-router-dom";
import HeaderBackButtonCoin from "../components/HeaderBackButtonCoin";
import styles from "./Coindetail.module.css";
import { CurrencyFormat } from "../config/services";
import { CryptoFormater } from "../config/services";
import { useState } from "react";
import { WatchButton } from "../components/StyledButtons";
import { Snackbar } from "@mui/joy";
import { Stack } from "@mui/material";
import { CallMade, CallReceived } from "@mui/icons-material";

const styleFab = {
  background: "#000",
  color: "#fff",
  display: "block",
  height: 50,
  width: 50,
  borderRadius: "50%",
  border: "none",
};


const Coindetail = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const {
    image,
    difference,
    coinname,
    symbol,
    balance,
    discription,
    marketcap,
    volume,
  } = state.coin;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  const watch = () => {
    setLoading(true);
    setTimeout(() => {
      setOpenSnackbar(true);
      setLoading(false);
    }, 4000);
  };

  return (
    <div className={styles.coindetail}>
      <HeaderBackButtonCoin coinImage={image} title={coinname} />
      <div className={styles.frame}>
        <img className={styles.imageIcon} alt="" src={image} />
        <WatchButton text={"Watch"} loading={loading} handleClick={watch} />
      </div>
      <div className={styles.frame2}>
        <div className={styles.div}>
          <CurrencyFormat amount={balance} prefix="$" seperator={true} />
        </div>
        <div className={styles.div1}>
          <CryptoFormater amount={balance} suffix={symbol} />

          <font
            style={{ marginLeft: 10 }}
            color={difference < 0 ? "red" : "green"}
          >
            {difference.toFixed(2)}%
          </font>
        </div>
      </div>
      <div className={styles.sendParent}>
        <Stack
          spacing={1}
          direction="column"
          display="flex"
          alignItems="center"
        >
          <button style={styleFab} onClick={() => navigate("/send")}>
            <CallMade />
          </button>
          <div className={styles.frame3}>
            <div className={styles.send1}>Send</div>
          </div>
        </Stack>
        <Stack
          spacing={1}
          direction="column"
          display="flex"
          alignItems="center"
        >
          <button
            style={styleFab}
            onClick={() =>
              navigate("/receivecoin", { state: { coin: state.coin } })
            }
          >
            <CallReceived />
          </button>
          <div className={styles.frame4}>
            <div className={styles.receive1}>Receive</div>
          </div>
        </Stack>
      </div>
      <div className={styles.frame5}>
        <div className={styles.aboutBitcoin}>About {coinname}</div>
        <div className={styles.theWorldsFirst}>{discription}</div>
        <div className={styles.viewMore}>View more</div>
      </div>
      <div className={styles.marketStatsWrapper}>
        <div className={styles.marketStats}>Market stats</div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.signalCellularAltParent}>
            <img
              className={styles.signalCellularAltIcon}
              alt=""
              src="/signal-cellular-alt@2x.png"
            />
            <div className={styles.marketCap}>Market cap</div>
          </div>
          <div className={styles.billionWrapper}>
            <div className={styles.billion}>
              <CurrencyFormat amount={marketcap} prefix="$" seperator={true} />
            </div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.signalCellularAltParent}>
            <img
              className={styles.signalCellularAltIcon}
              alt=""
              src="/signal-cellular-alt@2x.png"
            />
            <div className={styles.marketCap}>Volume</div>
          </div>
          <div className={styles.billionWrapper}>
            <div className={styles.billion}>
              <CurrencyFormat amount={volume} prefix="$" seperator={true} />
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        color="success"
        size="lg"
        variant="soft"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      >
        {`${symbol} Added to watchlist`}
      </Snackbar>
    </div>
  );
};

export default Coindetail;
