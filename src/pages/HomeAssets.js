import {
  Add,
  CallMade,
  CallReceived,
  SwapHoriz,
  WhatsApp,
} from "@mui/icons-material";
import { Avatar, Badge, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { Fab, Grid, Stack, Typography } from "@mui/material";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { signOut } from "firebase/auth";
import { collection, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import AssetItem from "../components/AssetItem";
import HistoryItem from "../components/HistoryItem";
import CustomizedTabs from "../components/tabs";
import { auth, db } from "../config/firebase";
import { CurrencyFormat, getWhatsapp } from "../config/services";
import styles from "./HomeAssets.module.css";
import { joyTheme } from "../App";

const styleFab = {
  background: "#000",
  color: "#fff",
  display: "block",
  height: 50,
  width: 50,
  borderRadius: "50%",
  border: "none",
};

const HomeAssets = () => {
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state.useInfos);
  const allNotifications = useSelector((state) => state.notification);
  const [value, setValue] = useState("/");


  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
    console.log(newValue);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        navigate("/auth");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.homeAssets}>
      <div className={styles.header}>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <Dropdown>
              <MenuButton
                sx={{ border: "none", paddingInline: 0 }}
                className={styles.ellipseParent}
              >
                <Avatar size="sm" variant="solid" sx={{textTransform: "uppercase", background: "#000"}} />
                  
               
                <div className={styles.jhonpower94cParent}>
                  <div className={styles.jhonpower94c}>{userinfo.username}</div>
                  <img
                    className={styles.keyboardArrowDownIcon}
                    alt=""
                    src="/keyboard-arrow-down@2x.png"
                  />
                </div>
              </MenuButton>
              <Menu size="lg">
                <MenuItem onClick={() => navigate("profile")}>
                  My profile
                </MenuItem>
                <MenuItem onClick={logOut}>Sign out</MenuItem>
                <MenuItem onClick={() => navigate("settings")}>
                  Settings
                </MenuItem>
              </Menu>
            </Dropdown>
          </div>
          
          <button
            className={styles.vectorWrapper}
            onClick={() => navigate("notifications")}
          >
            <Badge
              badgeContent={allNotifications.length}
              color="warning"
              variant="solid"
            >
              <img className={styles.vectorIcon} alt="" src="/vector@2x.png" />
            </Badge>
          </button>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.div}>
          <CurrencyFormat
            amount={userinfo.totalBalance}
            prefix={"$"}
            seperator={true}
          />
        </div>
      </div>

      <div className={styles.circlebuttonGroups}>
        <Grid container spacing={1} justifyContent={"center"}>
          <Grid item xs={3} md={3}>
            <Stack
              spacing={1}
              direction="column"
              display="flex"
              alignItems="center"
            >
              <button style={styleFab} onClick={() => navigate("/allcoin")}>
                <CallMade />
              </button>
              <div className={styles.frame3}>
                <div className={styles.send1}>Send</div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            <Stack
              spacing={1}
              direction="column"
              display="flex"
              alignItems="center"
            >
              <button style={styleFab} onClick={() => navigate("/receive")}>
                <CallReceived />
              </button>
              <div className={styles.frame4}>
                <div className={styles.receive1}>Receive</div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            <Stack
              spacing={1}
              direction="column"
              display="flex"
              alignItems="center"
            >
              <button style={styleFab} onClick={() => navigate("/swap")}>
                <SwapHoriz />
              </button>
              <div className={styles.frame1}>
                <div className={styles.swap1}>Swap</div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            <Stack
              spacing={1}
              direction="column"
              display="flex"
              alignItems="center"
            >
              <button
                style={styleFab}
                onClick={() =>
                  window.open("https://global.transak.com/", "_blank")
                }
              >
                <Add />
              </button>
              <div className={styles.frame}>
                <div className={styles.buy1}>Buy</div>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </div>

      <CustomizedTabs value={value} handleChange={handleChange} />

      <Outlet />
    </div>
  );
};

export default HomeAssets;

// Assetstab
export const Assets = () => {
  const walletData = useSelector((state) => state.walletsData);

  return (
    <>
      <div className={styles.lightbuttonWrapper}>
        <button
          className={styles.lightbutton}
          onClick={() => window.open("https://www.kraken.com", "_blank")}
        >
          <div className={styles.getFreeTestnet}>
            Crypto instant purchase
          </div>
        </button>
      </div>
      <div className={styles.coinlist}>
        {walletData.map((coin, index) => (
          <AssetItem
            coin={coin}
            key={index}
            frameImageUrl="/frame-80"
            frameIconUrl={coin.image}
            propCursor="pointer"
            propBackgroundImage={`url(${coin.image})`}
          />
        ))}
      </div>
    </>
  );
};

// NFTs tab
export const Nfts = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.lightbuttonWrapper}>
        <button
          className={styles.lightbutton}
          onClick={() => navigate("/receive")}
        >
          <div className={styles.getFreeTestnet}>Import NFTs</div>
        </button>
      </div>
    </>
  );
};

// Activity tab
export const Activity = () => {
  let { userid } = useParams();

  const ref = query(
    collection(db, "users", userid, "transactions"),
    orderBy("timestamp", "desc")
  );
  const querY = useFirestoreQuery(["transactions"], ref);

  if (querY.isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const snapshot = querY.data;

  return snapshot.docs.map((docSnapshot, index) => {
    const data = docSnapshot.data();
    const { transaction_type, cointitle } = data;

    const isCredit = transaction_type === "Credit";

    const switchImage = (key) => {
      switch (key) {
        case "BTC":
          return "../images/coins/btc.png";
        case "ETH":
          return "../images/coins/eth.png";
        case "BNB":
          return "../images/coins/eth.png";
        case "TRX":
          return "../images/coins/tron.png";
        case "USDT":
          return "../images/coins/usdt.png";
        default:
          return "../images/coins/usdt.png";
      }
    };

    return (
      <HistoryItem
        key={index}
        data={data}
        itemCode={isCredit ? "/call-received@2x.png" : "/call-made@2x.png"}
        imageCode={switchImage(cointitle)}
        frameBorder={isCredit ? "1px solid blue" : "1px solid #8a919e"}
      />
    );
  });
};
